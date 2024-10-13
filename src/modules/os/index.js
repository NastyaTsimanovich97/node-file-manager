import os from "node:os";

import { onErrorCommand } from "../onErrorCommand.js";

export const osCommand = (arg) => {
  const command = arg.replace("--", "");

  switch (command) {
    case "EOL":
      const eol = os.EOL;
      process.stdout.write(JSON.stringify(eol) + "\n");
      break;
    case "cpus":
      const cpus = os.cpus();
      process.stdout.write(`Amount of CPUS: ${cpus.length}` + "\n");
      cpus.forEach((cpu) => {
        process.stdout.write(`Model: ${cpu.model}` + "\n");
        process.stdout.write(`Clock rate (in GHz): ${cpu.speed / 1000}` + "\n");
      });
      break;
    case "homedir":
      const homedir = os.homedir();
      process.stdout.write(homedir + "\n");
      break;
    case "username":
      const info = os.userInfo();
      process.stdout.write(info.username + "\n");
      break;
    case "architecture":
      const arch = os.arch();
      process.stdout.write(arch + "\n");
      break;
    default:
      onErrorCommand();
      break;
  }
};
