const core = require("@actions/core");
const fs = require("fs");
const scanFiles = require("../utils/file-scanner");

module.exports = async function () {
  console.log("Scanning Tailwind conflicts...");

  const files = scanFiles(process.cwd());

  files.forEach(file => {
    const content = fs.readFileSync(file, "utf8");

    if (content.includes("p-4") && content.includes("p-6")) {
      core.warning(`Tailwind padding conflict detected in ${file}`);
    }
  });
};