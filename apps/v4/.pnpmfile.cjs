module.exports = {
  hooks: {
    readPackage(pkg) {
      // Allow esbuild and other packages to run their build scripts
      if (pkg.name === 'esbuild') {
        delete pkg.scripts?.preinstall;
        delete pkg.scripts?.install;
        delete pkg.scripts?.postinstall;
      }
      return pkg;
    }
  }
}