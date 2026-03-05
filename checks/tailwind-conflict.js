const core = require("@actions/core");
const fs = require("fs");
const path = require("path");
const scanFiles = require("../utils/file-scanner");

const paddingClasses = [
  "p-0","p-1","p-2","p-3","p-4","p-5","p-6",
  "p-8","p-10","p-12"
];

module.exports = async function () {
  console.log("Scanning Tailwind conflicts...");

  const files = scanFiles(process.cwd());

  files.forEach(file => {
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {

      const match = line.match(/className\s*=\s*["'`]([^"'`]+)["'`]/);

      if (!match) return;

      const classes = match[1].trim().split(/\s+/);

      const relativePath = path.relative(process.cwd(), file);

      // Padding conflict
      const paddingFound = classes.filter(c => paddingClasses.includes(c));

      if (paddingFound.length > 1) {
        core.warning(
          `Tailwind padding conflict: ${paddingFound.join(", ")}`,
          { file: relativePath, 
            startLine: index + 1 
          }
        );
      }

      // Layout conflict
      if (classes.includes("flex") && classes.includes("grid")) {
        core.warning(
          "Tailwind layout conflict: flex and grid used together",
          { file : relativePath, 
            startLine: index + 1 
          }
        );
      }

    });
  });
};