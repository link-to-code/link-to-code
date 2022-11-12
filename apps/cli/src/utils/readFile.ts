import fs from "fs";

export default async (path: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
      if (error) return reject(error);

      resolve(data);
    });
  });
