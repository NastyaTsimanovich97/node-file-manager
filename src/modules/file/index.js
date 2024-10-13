import fs from "node:fs";
import path from "node:path";
import stream from "node:stream/promises";

export const cat = async (file) => {
  const directory = process.cwd();

  try {
    const rs = fs.createReadStream(path.join(directory, file));
    for await (const chunk of rs) {
      process.stdout.write(chunk);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const add = async (file) => {
  const directory = process.cwd();

  try {
    await fs.promises.writeFile(path.join(directory, file), "", { flag: "wx" });
  } catch (error) {
    throw new Error(error);
  }
};

export const rn = async (file, newName) => {
  const directory = process.cwd();

  try {
    await fs.promises.rename(
      path.join(directory, file),
      path.join(directory, newName)
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const cp = async (file, newFile) => {
  const directory = process.cwd();

  const filePath = path.join(directory, file);
  const newFilePath = path.join(directory, newFile);

  try {
    const rs = fs.createReadStream(filePath);
    const ws = fs.createWriteStream(newFilePath, { flags: "wx" });

    await stream.pipeline(rs, ws);

    // await fs.promises.copyFile(
    //   path.join(directory, file),
    //   path.join(directory, newPath),
    //   fs.promises.constants.COPYFILE_EXCL
    // );
  } catch (error) {
    error.code !== "EEXIST" && (await rm(newFile));
    throw new Error(error);
  }
};

export const mv = async (file, newFile) => {
  await cp(file, newFile);
  await rm(file);
};

export const rm = async (file) => {
  const directory = process.cwd();

  try {
    await fs.promises.rm(path.join(directory, file));
  } catch (error) {
    throw new Error(error);
  }
};
