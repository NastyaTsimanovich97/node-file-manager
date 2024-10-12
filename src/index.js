import readline from "node:readline";

import { getCurrentDirectory } from "./modules/getCurrentDirectory.js";
import { endProgram } from "./modules/endProgram.js";
import { onErrorCommand } from "./modules/onErrorCommand.js";
import { ls } from "./modules/fileSystem/ls.js";

const usernamePrefix = "--username=";

const main = async () => {
  // start of the program
  const username =
    process.argv
      .find((arg) => arg.startsWith(usernamePrefix))
      ?.replace(usernamePrefix, "") || "Username";

  process.stdout.write(`Welcome to the File Manager, ${username}! \n`);

  getCurrentDirectory();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  rl.on("line", async (line) => {
    const [operation, ...args] = line.split(" ");

    switch (operation) {
      case "up":
        process.chdir("../");
        break;
      case "cd":
        if (!args.length) {
          onErrorCommand();
          break;
        }

        try {
          process.chdir(args[0]);
        } catch (error) {
          onErrorCommand({ isExecutionError: true, error });
        }
        break;
      case "ls":
        await ls();
        break;

      default:
        onErrorCommand();
        break;
    }

    getCurrentDirectory();
  });

  // end of the program
  process.on("SIGINT", () => endProgram(username));
  process.on("beforeExit", () => endProgram(username));
};

await main();
