-----> Building on the Heroku-24 stack
-----> Determining which buildpack to use for this app
-----> Node.js app detected
       
-----> Creating runtime environment
       
       NPM_CONFIG_LOGLEVEL=error
       NODE_VERBOSE=false
       NODE_ENV=production
       NODE_MODULES_CACHE=true
       
-----> Installing binaries
       engines.node (package.json):   unspecified
       engines.npm (package.json):    unspecified (use default)
       
       Resolving node version 24.x...
       Downloading and installing node 24.13.0...
       Validating checksum
       Using default npm version: 11.6.2
       
-----> Installing dependencies
       Installing node modules
       npm error code EUSAGE
       npm error
       npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
       npm error
       npm error Missing: prisma@7.2.0 from lock file
       npm error Invalid: lock file's @prisma/config@7.1.0 does not satisfy @prisma/config@7.2.0
       npm error Missing: @prisma/dev@0.17.0 from lock file
       npm error Missing: @prisma/engines@7.2.0 from lock file
       npm error Missing: @prisma/studio-core@0.9.0 from lock file
       npm error Missing: @types/react@19.2.8 from lock file
       npm error Missing: mysql2@3.15.3 from lock file
       npm error Missing: postgres@3.4.7 from lock file
       npm error Missing: @electric-sql/pglite@0.3.2 from lock file
       npm error Missing: @electric-sql/pglite-socket@0.0.6 from lock file
       npm error Missing: @electric-sql/pglite-tools@0.2.7 from lock file
       npm error Missing: @hono/node-server@1.19.6 from lock file
       npm error Missing: hono@4.10.6 from lock file
       npm error Missing: @mrleebo/prisma-ast@0.12.1 from lock file
       npm error Missing: @prisma/get-platform@6.8.2 from lock file
       npm error Missing: @prisma/query-plan-executor@6.18.0 from lock file
       npm error Missing: foreground-child@3.3.1 from lock file
       npm error Missing: get-port-please@3.1.2 from lock file
       npm error Missing: http-status-codes@2.3.0 from lock file
       npm error Missing: proper-lockfile@4.1.2 from lock file
       npm error Missing: remeda@2.21.3 from lock file
       npm error Missing: std-env@3.9.0 from lock file
       npm error Missing: valibot@1.2.0 from lock file
       npm error Missing: zeptomatch@2.0.2 from lock file
       npm error Missing: chevrotain@10.5.0 from lock file
       npm error Missing: lilconfig@2.1.0 from lock file
       npm error Missing: @prisma/debug@7.2.0 from lock file
       npm error Missing: @prisma/engines-version@7.2.0-4.0c8ef2ce45c83248ab3df073180d5eda9e8be7a3 from lock file
       npm error Missing: @prisma/fetch-engine@7.2.0 from lock file
       npm error Missing: @prisma/get-platform@7.2.0 from lock file
       npm error Missing: @prisma/debug@7.2.0 from lock file
       npm error Missing: @prisma/get-platform@7.2.0 from lock file
       npm error Missing: @prisma/debug@6.8.2 from lock file
       npm error Missing: csstype@3.2.3 from lock file
       npm error Missing: cross-spawn@7.0.6 from lock file
       npm error Missing: signal-exit@4.1.0 from lock file
       npm error Missing: path-key@3.1.1 from lock file
       npm error Missing: shebang-command@2.0.0 from lock file
       npm error Missing: which@2.0.2 from lock file
       npm error Missing: aws-ssl-profiles@1.1.2 from lock file
       npm error Missing: denque@2.1.0 from lock file
       npm error Missing: generate-function@2.3.1 from lock file
       npm error Missing: long@5.3.2 from lock file
       npm error Missing: lru.min@1.1.3 from lock file
       npm error Missing: named-placeholders@1.1.6 from lock file
       npm error Missing: seq-queue@0.0.5 from lock file
       npm error Missing: sqlstring@2.3.3 from lock file
       npm error Missing: is-property@1.0.2 from lock file
       npm error Missing: graceful-fs@4.2.11 from lock file
       npm error Missing: retry@0.12.0 from lock file
       npm error Missing: signal-exit@3.0.7 from lock file
       npm error Missing: type-fest@4.41.0 from lock file
       npm error Missing: shebang-regex@3.0.0 from lock file
       npm error Missing: isexe@2.0.0 from lock file
       npm error Missing: grammex@3.1.12 from lock file
       npm error Missing: @chevrotain/cst-dts-gen@10.5.0 from lock file
       npm error Missing: @chevrotain/gast@10.5.0 from lock file
       npm error Missing: @chevrotain/types@10.5.0 from lock file
       npm error Missing: @chevrotain/utils@10.5.0 from lock file
       npm error Missing: regexp-to-ast@0.5.0 from lock file
       npm error
       npm error Clean install a project
       npm error
       npm error Usage:
       npm error npm ci
       npm error
       npm error Options:
       npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
       npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
       npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
       npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
       npm error [--no-bin-links] [--no-fund] [--dry-run]
       npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
       npm error [--workspaces] [--include-workspace-root] [--install-links]
       npm error
       npm error aliases: clean-install, ic, install-clean, isntall-clean
       npm error
       npm error Run "npm help ci" for more info
       npm notice
       npm notice New minor version of npm available! 11.6.2 -> 11.7.0
       npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.7.0
       npm notice To update run: npm install -g npm@11.7.0
       npm notice
       npm error A complete log of this run can be found in: /tmp/npmcache.NlRmU/_logs/2026-01-19T10_38_15_954Z-debug-0.log
-----> Build failed
 !     npm lockfile is not in sync
       This error occurs when the contents of `package.json` contains a different
       set of dependencies that the contents of `package-lock.json`. This can happen
       when a package is added, modified, or removed but the lockfile was not updated.
       To fix this, run `npm install` locally in your app directory to regenerate the
       lockfile, commit the changes to `package-lock.json`, and redeploy.
      
       https://devcenter.heroku.com/articles/troubleshooting-node-deploys#make-sure-that-the-lockfile-is-up-to-date
 !     Push rejected, failed to compile Node.js app.
 !     Push failed
