# Error Tracking & Monitoring Setup

This guide explains how to set up error tracking and monitoring for the Portfolio CMS frontend.

## Option 1: Sentry (Recommended)

Sentry provides real-time error tracking, performance monitoring, and release health tracking.

### 1.1 Sign Up for Sentry

1. Go to [sentry.io](https://sentry.io/)
2. Create a free account (or sign in)
3. Create a new project
4. Select **Next.js** as the platform
5. Copy your DSN (Data Source Name)

### 1.2 Install Sentry

```bash
cd client
npx @sentry/wizard@latest -i nextjs
```

This wizard will:

- Install `@sentry/nextjs`
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.ts`

### 1.3 Configure Environment Variables

Add to `.env.local`:

```env
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_AUTH_TOKEN=your_auth_token_here
SENTRY_ORG=your-org-name
SENTRY_PROJECT=portfolio-cms-frontend
```

Add to AWS Amplify Console:

```
NEXT_PUBLIC_SENTRY_DSN = https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_AUTH_TOKEN = your_auth_token_here
SENTRY_ORG = your-org-name
SENTRY_PROJECT = portfolio-cms-frontend
```

### 1.4 Customize Sentry Configuration

Edit `sentry.client.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Performance Monitoring
  tracesSampleRate: 1.0, // 100% in development, reduce in production

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of errors

  // Integrations
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/yourapp\.amplifyapp\.com/],
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Filter sensitive data
  beforeSend(event, hint) {
    // Don't send errors in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    // Filter out specific errors
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof Error && error.message.includes('ChunkLoadError')) {
        return null; // Ignore chunk loading errors
      }
    }

    return event;
  },
});
```

### 1.5 Test Sentry Integration

Create a test page:

```typescript
// src/app/sentry-test/page.tsx
'use client';

import * as Sentry from '@sentry/nextjs';

export default function SentryTestPage() {
  const testError = () => {
    throw new Error('Sentry test error - ignore this!');
  };

  const testMessage = () => {
    Sentry.captureMessage('Sentry test message', 'info');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sentry Test</h1>
      <button
        onClick={testError}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Test Error
      </button>
      <button
        onClick={testMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test Message
      </button>
    </div>
  );
}
```

Visit `/sentry-test` and click the buttons. Check Sentry dashboard for captured events.

### 1.6 Custom Error Boundaries

Create a custom error boundary:

```typescript
// src/components/ErrorBoundary.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">
          We've been notified and are working on a fix.
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

## Option 2: AWS CloudWatch

AWS CloudWatch provides basic logging and monitoring integrated with Amplify.

### 2.1 Enable CloudWatch in Amplify

1. Go to AWS Amplify Console
2. Select your app
3. Go to **Monitoring** tab
4. Click **Enable CloudWatch logs**

### 2.2 Configure CloudWatch Client

Install AWS SDK:

```bash
npm install @aws-sdk/client-cloudwatch-logs
```

Create CloudWatch logger:

```typescript
// src/lib/cloudwatch.ts
import { CloudWatchLogsClient, PutLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs';

const client = new CloudWatchLogsClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export async function logToCloudWatch(
  logGroupName: string,
  logStreamName: string,
  message: string
) {
  try {
    const command = new PutLogEventsCommand({
      logGroupName,
      logStreamName,
      logEvents: [
        {
          message: JSON.stringify({
            timestamp: new Date().toISOString(),
            message,
            environment: process.env.NODE_ENV,
          }),
          timestamp: Date.now(),
        },
      ],
    });

    await client.send(command);
  } catch (error) {
    console.error('Failed to log to CloudWatch:', error);
  }
}
```

### 2.3 Create Error Logger

```typescript
// src/lib/errorLogger.ts
import { logToCloudWatch } from './cloudwatch';

export function logError(error: Error, context?: Record<string, any>) {
  const errorData = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'server',
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorData);
  }

  // Log to CloudWatch in production
  if (process.env.NODE_ENV === 'production') {
    logToCloudWatch('/aws/amplify/portfolio-cms', 'frontend-errors', JSON.stringify(errorData));
  }
}
```

## Option 3: Custom Error Tracking

For a lightweight solution without external dependencies:

### 3.1 Create Error Tracking Service

```typescript
// src/lib/errorTracking.ts
interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  context?: Record<string, any>;
}

export class ErrorTracker {
  private static endpoint = '/api/errors';

  static async captureError(error: Error, context?: Record<string, any>) {
    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      context,
    };

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
    } catch (e) {
      console.error('Failed to report error:', e);
    }
  }

  static async captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          level,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error('Failed to report message:', e);
    }
  }
}
```

### 3.2 Create API Endpoint

```typescript
// src/app/api/errors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { logToCloudWatch } from '@/lib/cloudwatch';

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json();

    // Log to CloudWatch or your preferred service
    await logToCloudWatch(
      '/aws/amplify/portfolio-cms',
      'frontend-errors',
      JSON.stringify(errorData)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging error:', error);
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}
```

## Performance Monitoring

### Track Page Load Performance

```typescript
// src/lib/performance.ts
export function trackPageLoad() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    const metrics = {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      domComplete: navigation.domComplete - navigation.fetchStart,
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,
    };

    // Send to your monitoring service
    console.log('Page Load Metrics:', metrics);
  });
}
```

## Alerting

### Configure Sentry Alerts

1. Go to Sentry Dashboard
2. **Alerts** → **Create Alert**
3. Configure alert conditions:
   - Error frequency > 10 per hour
   - New issue created
   - Release health degradation
4. Set notification channels:
   - Email
   - Slack
   - PagerDuty

### Configure CloudWatch Alarms

1. Go to AWS CloudWatch Console
2. **Alarms** → **Create alarm**
3. Select metric (e.g., 4xx/5xx errors)
4. Set threshold (e.g., > 10 errors in 5 minutes)
5. Configure SNS topic for notifications

## Best Practices

1. ✅ **Always log errors in production**
2. ✅ **Filter sensitive data before logging**
3. ✅ **Set up alerts for critical errors**
4. ✅ **Monitor performance metrics**
5. ✅ **Review error reports weekly**
6. ✅ **Track error resolution time**
7. ✅ **Document common errors and fixes**
8. ✅ **Use error boundaries for graceful degradation**
9. ✅ **Test error tracking in staging first**
10. ✅ **Rotate API keys regularly**

## Troubleshooting

### Sentry not capturing errors

1. Check DSN is correct
2. Verify environment variables are set
3. Ensure Sentry is initialized before app code runs
4. Check browser console for Sentry errors

### CloudWatch logs not appearing

1. Verify IAM permissions
2. Check log group and stream names
3. Ensure AWS SDK is configured correctly
4. Verify region matches your setup

## Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [AWS CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
