export const onErrorCommand = (data) => {
  const isExecutionError = data?.isExecutionError;
  const message = isExecutionError ? "Operation failed" : "Invalid input";

  process.stdout.write(message + "\n");
};
