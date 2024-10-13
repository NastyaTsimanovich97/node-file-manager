import { stdout, cwd } from "node:process";

export const getCurrentDirectory = () => {
  const currentDirectory = cwd();

  stdout.write(`\nYou are currently in ${currentDirectory}\n\n`);

  return currentDirectory;
};
