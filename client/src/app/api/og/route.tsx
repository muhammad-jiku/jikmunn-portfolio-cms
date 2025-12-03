/**
 * Open Graph Image Generation
 * Dynamically generates OG images for social media sharing
 * Uses Next.js Image Response API (@vercel/og)
 */

import { SITE_CONFIG } from '@/lib/seo';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image dimensions
const WIDTH = 1200;
const HEIGHT = 630;

interface OGImageProps {
  title: string;
  description?: string;
  type?: 'default' | 'project' | 'blog';
  category?: string;
}

/**
 * Generate Open Graph image
 * Route: /api/og?title=...&description=...&type=...
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get parameters from query string
    const title = searchParams.get('title') || SITE_CONFIG.name;
    const description = searchParams.get('description') || SITE_CONFIG.description;
    const type = (searchParams.get('type') as OGImageProps['type']) || 'default';
    const category = searchParams.get('category') || '';

    // Define colors based on type
    const colors = {
      default: { bg: '#0f172a', accent: '#3b82f6', text: '#f1f5f9' },
      project: { bg: '#0f172a', accent: '#8b5cf6', text: '#f1f5f9' },
      blog: { bg: '#0f172a', accent: '#10b981', text: '#f1f5f9' },
    };

    const theme = colors[type];

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: theme.bg,
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Header with logo/brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: theme.accent,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {SITE_CONFIG.author.charAt(0)}
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: '600',
              color: theme.text,
            }}
          >
            {SITE_CONFIG.name}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* Category badge (if present) */}
          {category && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  backgroundColor: theme.accent,
                  color: 'white',
                  padding: '8px 24px',
                  borderRadius: '8px',
                  fontSize: '20px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {category}
              </div>
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: '800',
              lineHeight: 1.2,
              color: theme.text,
              maxWidth: '1000px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: '28px',
                lineHeight: 1.5,
                color: '#94a3b8',
                maxWidth: '900px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Footer with accent line */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '200px',
              height: '6px',
              backgroundColor: theme.accent,
              borderRadius: '3px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              color: '#64748b',
            }}
          >
            {SITE_CONFIG.url.replace('https://', '')}
          </div>
        </div>
      </div>,
      {
        width: WIDTH,
        height: HEIGHT,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
