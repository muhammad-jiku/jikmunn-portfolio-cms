# Husky + Lint-staged Setup

Git hooks configured for code quality enforcement.

## 🎯 What's Configured

### Pre-commit Hook

- **Runs:** `lint-staged` on staged files
- **Checks:**
  - `server/**/*.ts` → ESLint + Prettier
  - `client/**/*.{ts,tsx}` → ESLint + Prettier
  - `*.{json,md}` → Prettier formatting

### Pre-push Hook

- **Runs:** TypeScript type checking
- **Checks:** Both server and client for type errors
- **Command:** `npm run type-check`

## 📦 Installation Complete

```bash
# Dependencies installed:
✅ husky@9
✅ lint-staged@15
✅ concurrently@8
```

## 🚀 Usage

### Normal Git Workflow

```bash
# Stage files
git add .

# Commit (pre-commit hook runs automatically)
git commit -m "feat: add new feature"

# Push (pre-push hook runs automatically)
git push
```

### Test Hooks Manually

```bash
# Test lint-staged
npx lint-staged

# Test type checking
npm run type-check
```

### Bypass Hooks (Emergency Only)

```bash
# Skip pre-commit
git commit --no-verify -m "emergency fix"

# Skip pre-push
git push --no-verify
```

## 🛠️ Available Root Scripts

```bash
# Development
npm run dev              # Run both server and client concurrently
npm run dev:server       # Run only server
npm run dev:client       # Run only client

# Build
npm run build            # Build both server and client
npm run build:server     # Build only server
npm run build:client     # Build only client

# Testing
npm test                 # Run all tests
npm run test:server      # Run server tests
npm run test:client      # Run client tests

# Linting
npm run lint             # Lint both server and client
npm run lint:server      # Lint only server
npm run lint:client      # Lint only client

# Type Checking
npm run type-check       # Type check both server and client
npm run type-check:server
npm run type-check:client
```

## 📋 What Happens on Commit

1. **You run:** `git commit -m "message"`
2. **Pre-commit hook:**
   - Finds staged `.ts` and `.tsx` files
   - Runs ESLint with `--fix` flag
   - Runs Prettier formatting
   - Auto-fixes issues when possible
   - Blocks commit if unfixable errors exist
3. **Commit succeeds** if all checks pass

## 📋 What Happens on Push

1. **You run:** `git push`
2. **Pre-push hook:**
   - Runs `tsc --noEmit` in server directory
   - Runs `tsc --noEmit` in client directory
   - Blocks push if type errors found
3. **Push succeeds** if type checking passes

## 🎨 Prettier Configuration

Add `.prettierrc` at root level for consistent formatting:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🔧 Customizing Hooks

Edit hook files in `.husky/` directory:

```bash
# Edit pre-commit
nano .husky/pre-commit

# Edit pre-push
nano .husky/pre-push
```

## ✅ Benefits

- ✅ Catches errors before they reach the repo
- ✅ Enforces consistent code style
- ✅ Prevents TypeScript type errors
- ✅ Auto-fixes linting issues
- ✅ Saves CI/CD pipeline time
- ✅ Improves code review efficiency

## 🐛 Troubleshooting

### Hooks not running?

```bash
# Reinstall Husky
npm run prepare
```

### Permission issues (Linux/Mac)?

```bash
# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Skip hooks temporarily?

```bash
# Use --no-verify flag
git commit --no-verify -m "skip hooks"
```

---

**Setup by:** GitHub Copilot  
**Date:** November 30, 2025  
**Status:** ✅ Production Ready
