import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import streamPromises from "node:stream/promises";

export const compress = async (filePath, newFilePath) => {
  const directory = process.cwd();

  try {
    const zip = zlib.BrotliCompress();

    const rs = fs.createReadStream(path.join(directory, filePath));
    const ws = fs.createWriteStream(path.join(directory, newFilePath), {
      flags: "wx",
    });

    await streamPromises.pipeline(rs, zip, ws);
  } catch (error) {
    throw new Error(error);
  }
};

export const decompress = async (filePath, newFilePath) => {
  const directory = process.cwd();

  try {
    const zip = zlib.BrotliDecompress();

    const rs = fs.createReadStream(path.join(directory, filePath));
    const ws = fs.createWriteStream(path.join(directory, newFilePath), {
      flags: "wx",
    });

    await streamPromises.pipeline(rs, zip, ws);
  } catch (error) {
    throw new Error(error);
  }
};
