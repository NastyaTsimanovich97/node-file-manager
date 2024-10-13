import fs from "node:fs/promises";

export const ls = async () => {
  const params = ["Name", "Type"];

  const path = process.cwd();
  const folderFiles = (await fs.readdir(path)).sort((a, b) => a - b);

  const [folders, files] = await folderFiles.reduce(async (acc, file) => {
    const prevResult = await acc;

    const isFile = (await fs.lstat(path + "/" + file)).isFile();

    if (isFile) {
      prevResult[1].push({ Name: file, Type: "file" });
    } else {
      prevResult[0].push({ Name: file, Type: "directory" });
    }

    return prevResult;
  }, Promise.resolve([[], []]));

  console.table([...folders, ...files], params);
};
