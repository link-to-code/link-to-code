import fs from "fs";

export default async (path: string): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    fs.access(path, fs.constants.F_OK, (error) => resolve(!error));
  });
