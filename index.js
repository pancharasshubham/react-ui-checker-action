const core = require("@actions/core");

async function run() {
  try {
    console.log("React UI Checker starting...");

    const tailwindCheck = require("./checks/tailwind-conflict");

    await tailwindCheck();

    console.log("All checks completed");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();