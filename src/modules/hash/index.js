import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const hash = async (filePath) => {
  const directory = process.cwd();

  try {
    const rs = fs.createReadStream(path.join(directory, filePath));

    for await (const chunk of rs) {
      const hash = crypto.createHash("sha256");
      hash.update(chunk);
  
      process.stdout.write(hash.digest("hex") + "\n");
    }
  } catch (error) {
    throw new Error(error);
  }
};
