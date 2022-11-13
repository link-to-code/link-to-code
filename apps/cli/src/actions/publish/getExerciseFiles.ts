import path from "path";

import { CodingExercise } from "@link-to-code/types";

import { readFile, scanDir } from "../../utils";

const readonlyFiles = new Set(["README.md"]);
export default async function (filePath: string): Promise<CodingExercise["files"]> {
  const settingsFileName = path.basename(filePath);
  const result: CodingExercise["files"] = [];

  const files = await scanDir(process.cwd());
  await Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file);
      if (filename === settingsFileName) return;

      result.push({
        filename,
        readonly: readonlyFiles.has(filename),
        language: path.extname(file).replace(".", ""),
        content: await readFile(file),
      });
    })
  );

  return result;
}
