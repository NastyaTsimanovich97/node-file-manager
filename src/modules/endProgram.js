export const endProgram = (username) => {
  process.stdout.write(
    `\nThank you for using File Manager, ${username}, goodbye!\n`
  );
  process.exit();
};
