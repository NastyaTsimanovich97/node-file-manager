import readline from "node:readline/promises";

import { getCurrentDirectory } from "./modules/getCurrentDirectory.js";
import { endProgram } from "./modules/endProgram.js";
import { onErrorCommand } from "./modules/onErrorCommand.js";
import { ls } from "./modules/fileSystem/ls.js";
import { cat, add, rn, cp, mv, rm } from "./modules/file/file.js";
import { hash } from "./modules/hash/hash.js";
import { compress, decompress } from "./modules/zlib/zlib.js";

const usernamePrefix = "--username=";
const operationsWithOneArgument = ["cd", "cat", "add", "rm", "hash"];
const operationsWithTwoArguments = ["rn", "cp", "mv", "compress", "decompress"];

// TODO:
// 1. update switch
// 2. think how cp and mv should work

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
    terminal: false,
  });

  rl.on("line", async (line) => {
    const [operation, ...args] = line.split(" ");

    if (operationsWithOneArgument.includes(operation) && !args[0]) {
      onErrorCommand();
      getCurrentDirectory();
      return;
    }

    if (operationsWithTwoArguments.includes(operation) && args.length < 2) {
      onErrorCommand();
      getCurrentDirectory();
      return;
    }

    try {
      switch (operation) {
        case "up":
          process.chdir("../");
          break;
        case "cd":
          process.chdir(args[0]);
          break;
        case "ls":
          await ls();
          break;
        case "cat":
          await cat(args[0]);
          break;
        case "add":
          await add(args[0]);
          break;
        case "rn":
          await rn(args[0], args[1]);
          break;
        case "cp":
          await cp(args[0], args[1]);
          break;
        case "mv":
          await mv(args[0], args[1]);
          break;
        case "rm":
          await rm(args[0]);
          break;
        case "hash":
          await hash(args[0]);
          break;
        case "compress":
          await compress(args[0], args[1]);
          break;
        case "decompress":
          await decompress(args[0], args[1]);
          break;
        default:
          onErrorCommand();
          break;
      }
    } catch (error) {
      onErrorCommand({ isExecutionError: true, error });
    } finally {
      getCurrentDirectory();
    }
  });

  // end of the program
  process.on("SIGINT", () => endProgram(username));
  process.on("beforeExit", () => endProgram(username));
};

await main();
