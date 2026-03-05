const fs = require("fs");
const path = require("path");

const ignoredDirs = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  "checks",
  "utils",
  ".github"
];

function scanFiles(dir, depth = 0) {
  if (depth > 10) return [];

  let results = [];

  let list;

  try {
    list = fs.readdirSync(dir);
  } catch {
    return results;
  }

  list.forEach(file => {
    const filePath = path.join(dir, file);

    let stat;

    try {
      stat = fs.statSync(filePath);
    } catch {
      return;
    }

    if (stat.isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        results = results.concat(scanFiles(filePath, depth + 1));
      }
    } else if (
      filePath.endsWith(".js") ||
      filePath.endsWith(".jsx") ||
      filePath.endsWith(".ts") ||
      filePath.endsWith(".tsx")
    ) {
      results.push(filePath);
    }
  });

  return results;
}

module.exports = scanFiles;