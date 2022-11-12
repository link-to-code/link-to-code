import path from "path";

import inquirer from "inquirer";

import { CONFIG_FILE_NAME } from "../../config/constants";
import { ExerciseSettingsFile } from "../../types";
import fileExists from "../../utils/fileExists";
import writeFile from "../../utils/writeFile";
import { InitOptions } from "./types";

const ENTRY_DEFAULT_CONTENT = "";

export const getDefaultConfigFilePath = () => path.join(process.cwd(), CONFIG_FILE_NAME);
export async function init({
  name,
  entry,
  description,
  filePath = getDefaultConfigFilePath(),
  dryRun = false,
}: InitOptions) {
  const content: ExerciseSettingsFile = { name, description, entry };

  const exists = await fileExists(entry);
  if (!exists) {
    const { createEntry } = await inquirer.prompt<{ createEntry: boolean }>([
      {
        type: "confirm",
        name: "createEntry",
        message: "Entry file not found, do you want to create it?",
      },
    ]);

    if (createEntry) {
      if (dryRun) console.info("Creating entry file", { entry, content: ENTRY_DEFAULT_CONTENT });
      await writeFile(entry, ENTRY_DEFAULT_CONTENT, dryRun);
    }
  }

  if (dryRun) console.info("Creating link-to-code config file", { filePath, content });
  const result = await writeFile(filePath, JSON.stringify(content, null, 2), dryRun);
  if (!result) {
    console.error("Unable to write file content", { content, path });
    process.exit(1);
  }
}
