// commit_and_publish.mjs
import { execSync } from "child_process";

/**
 * Helper function to run shell commands and show their output.
 * @param {string} command The command to run (e.g., 'git').
 * @param {string[]} args An array of arguments.
 */
function runCommand(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  execSync(`${command} ${args.join(" ")}`, { stdio: "inherit" });
}

async function main() {
  try {
    // --- 1. Git Operations ---
    console.log("--- Staging all corrected files... ---");
    runCommand("git", ["add", "."]);

    const commitMessage =
      "fix(config): correct perfectionist rule and publish v4.0.1";
    console.log(`--- Committing with message: "${commitMessage}" ---`);
    runCommand("git", ["commit", "-m", `"${commitMessage}"`]);

    console.log("--- Pushing changes to remote repository... ---");
    runCommand("git", ["push"]);

    // --- 2. NPM Publish Operation ---
    console.log("--- Publishing version 4.0.1 to NPM... ---");
    runCommand("npm", ["publish", "--access", "public"]);

    console.log("\n✅ Success! Version 4.0.1 has been published to NPM.");
    console.log(
      "The dev-config package is now fixed. We are ready to return to the project-template."
    );
  } catch (error) {
    console.error(
      "❌ An error occurred during the commit and publish process:",
      error.message
    );
    process.exit(1);
  }
}

main();
