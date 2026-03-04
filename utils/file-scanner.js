const fs = require("fs");
const path = require("path");

const ignoredDirs = ["node_modules", ".git", "dist", "build"];

function scanFiles(dir) {
  let results = [];

  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        results = results.concat(scanFiles(filePath));
      }
    } else if (filePath.endsWith(".jsx") || filePath.endsWith(".tsx")) {
      results.push(filePath);
    }
  });

  return results;
}

module.exports = scanFiles;