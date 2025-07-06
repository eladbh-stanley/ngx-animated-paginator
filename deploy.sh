#!/usr/bin/env bash

# Deploy script for ngx-animated-paginator
# ---------------------------------------
# 1. Bumps the package.json version in this directory
# 2. Builds the Angular package via ng-packagr
# 3. Publishes the 'dist' output to npm
# 4. Commits & tags the version bump, then pushes to origin
#
# Usage:
#   ./deploy.sh <new-version>
# Example:
#   ./deploy.sh 1.1.0
# ---------------------------------------
set -euo pipefail

NEW_VERSION="${1:-}"
if [[ -z "$NEW_VERSION" ]]; then
  echo "❌  Usage: ./deploy.sh <new-version>"
  exit 1
fi

# Ensure we are inside the script's directory regardless of where it's invoked
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [[ $(git status --porcelain) ]]; then
  echo "❌  Working tree not clean. Commit or stash changes first."
  exit 1
fi

PACKAGE_NAME="$(jq -r .name package.json)"

# -----------------------------
# 1. Bump version
# -----------------------------

echo "🔧 Bumping version to v$NEW_VERSION ..."
jq --arg v "$NEW_VERSION" '.version = $v' package.json > package.tmp && mv package.tmp package.json

git add package.json
git commit -m "chore: release $PACKAGE_NAME v$NEW_VERSION"

# -----------------------------
# 2. Build with ng-packagr
# -----------------------------

echo "🏗️  Building library with ng-packagr ..."
npx ng-packagr -p ng-package.json

# -----------------------------
# 3. Publish to npm
# -----------------------------

echo "🚀 Publishing $PACKAGE_NAME@$NEW_VERSION to npm ..."
# ensure correct metadata (name & author) before publish
DIST_PKG="dist/package.json"
if [[ -f "$DIST_PKG" ]]; then
  jq --arg name "$PACKAGE_NAME" \
     --arg author "Elad Ben-Haim <elad.benhaim@solaraai.com>" \
     '.name = $name | .author = $author' "$DIST_PKG" > "$DIST_PKG.tmp" && mv "$DIST_PKG.tmp" "$DIST_PKG"
fi

pushd dist >/dev/null
npm publish --access public
popd >/dev/null

# -----------------------------
# 4. Push & tag
# -----------------------------

echo "🏷️  Tagging release ..."
git tag "v$NEW_VERSION" -m "release: $PACKAGE_NAME v$NEW_VERSION"

echo "⬆️  Pushing commits and tags ..."
git push origin HEAD --tags

echo "✅  Deployment complete!" 