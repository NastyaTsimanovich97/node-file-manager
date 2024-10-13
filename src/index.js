import readline from "node:readline/promises";

import { getCurrentDirectory } from "./modules/getCurrentDirectory.js";
import { endProgram } from "./modules/endProgram.js";
import { onErrorCommand } from "./modules/onErrorCommand.js";
import { ls } from "./modules/fileSystem/index.js";
import { cat, add, rn, cp, mv, rm } from "./modules/file/index.js";
import { hash } from "./modules/hash/index.js";
import { compress, decompress } from "./modules/zlib/index.js";
import { osCommand as os } from "./modules/os/index.js";

const usernamePrefix = "--username=";
const operationsWithOneArgument = ["cd", "cat", "add", "rm", "hash", "os"];
const operationsWithTwoArguments = ["rn", "cp", "mv", "compress", "decompress"];

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

    const dict = {
      up: () => process.chdir("../"),
      cd: () => process.chdir(args[0]),
      ls: async () => await ls(),
      cat: async () => await cat(args[0]),
      add: async () => await add(args[0]),
      rn: async () => await rn(args[0], args[1]),
      cp: async () => await cp(args[0], args[1]),
      mv: async () => await mv(args[0], args[1]),
      rm: async () => await rm(args[0]),
      hash: async () => await hash(args[0]),
      compress: async () => await compress(args[0], args[1]),
      decompress: async () => await decompress(args[0], args[1]),
      os: () => os(args[0]),
      ".exit": () => {
        endProgram(username);
        process.exit();
      },
    };

    try {
      dict[operation] ? await dict[operation]() : onErrorCommand();
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
