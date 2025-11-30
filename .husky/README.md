# Husky Configuration

This directory contains Git hooks managed by Husky.

## Available Hooks

### pre-commit

- Runs `lint-staged` on staged files
- Automatically formats and lints code before commit
- Checks both `server/**/*.ts` and `client/**/*.{ts,tsx}`

### pre-push

- Runs TypeScript type checking on both server and client
- Prevents pushing code with type errors
- Command: `npm run type-check`

## Manual Hook Execution

```bash
# Test pre-commit hook
npx lint-staged

# Test pre-push hook
npm run type-check
```

## Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook
git push --no-verify
```

⚠️ Only use `--no-verify` in emergencies. Let the hooks catch issues early!
