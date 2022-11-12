import { Stats, readdir, stat } from "fs";
import path from "path";

export default async function (relativePath: string, basePath = ""): Promise<string[]> {
  const directory = path.join(basePath, relativePath);
  const files = await new Promise<string[]>((resolve, reject) =>
    readdir(directory, (err, files) => {
      if (err) return reject(err);

      resolve(files);
    })
  );

  const result: string[] = [];
  await Promise.all(
    files.map(async (file) => {
      const absoluteFilePath = path.join(directory, file);

      const fileStats = await new Promise<Stats>((resolve, reject) => {
        stat(absoluteFilePath, (error, stats) => {
          if (error) return reject(error);
          resolve(stats);
        });
      });

      if (fileStats.isDirectory()) return;
      result.push(absoluteFilePath);
    })
  );

  return result;
}
