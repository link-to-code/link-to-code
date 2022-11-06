import fs from "fs";

export default async (path: string, content: string, dryRun: boolean) => {
  if (dryRun) return true;

  return new Promise<boolean>((resolve) =>
    fs.writeFile(path, content, (err) => {
      if (err) console.error("Unable to write file content", { content, path }, err);

      resolve(!err);
    })
  );
};
