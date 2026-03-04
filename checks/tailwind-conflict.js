const fs = require("fs");
const path = require("path");

module.exports = async function () {
  console.log("Scanning Tailwind conflicts...");

  const files = getFiles(process.cwd());

  files.forEach(file => {
    const content = fs.readFileSync(file, "utf8");

    if (content.includes("p-4 p-6")) {
      console.log(`Possible Tailwind conflict in ${file}`);
    }
  });
};

function getFiles(dir) {
  let results = [];

  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (filePath.endsWith(".jsx") || filePath.endsWith(".tsx")) {
      results.push(filePath);
    }
  });

  return results;
}