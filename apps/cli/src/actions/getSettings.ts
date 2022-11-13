import { ExerciseSettingsFile } from "../types";
import { fileExists, readFile } from "../utils";

export default async function (filePath: string): Promise<ExerciseSettingsFile> {
  const exists = await fileExists(filePath);
  if (!exists) {
    console.error("Settings file not found. Please run init command before the publish.", { filePath });
    process.exit(1);
  }

  const configFileContent = await readFile(filePath);

  let settings: ExerciseSettingsFile;
  try {
    settings = JSON.parse(configFileContent);
  } catch (e) {
    console.error("Unable to parse settings file content.", { filePath }, e);
    process.exit(1);
  }

  return settings;
}
