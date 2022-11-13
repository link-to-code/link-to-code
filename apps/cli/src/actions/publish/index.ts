import inquirer from "inquirer";

import { ExerciseSettingsFile } from "../../types/index";
import { fileExists, readFile, writeFile } from "../../utils/index";
import { getDefaultConfigFilePath } from "../init/index";
import getExerciseFiles from "./getExerciseFiles";
import publishExercise from "./publishExercise";
import { PublishOptions } from "./types";

export async function publish({
  apiUrl,
  filePath = getDefaultConfigFilePath(),
  dryRun = false,
}: PublishOptions) {
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

  const files = await getExerciseFiles(filePath);

  const { token } = await inquirer.prompt<{ token: string }>([
    {
      type: "password",
      name: "token",
      message: "Please enter the bearer token of firebase functions",
    },
  ]);

  if (dryRun) console.info("Publishing exercise", { apiUrl, files });
  const permaLink = await publishExercise({
    dryRun,
    apiUrl,
    codingExercise: { ...settings, files },
    token,
  });
  if (!dryRun && !permaLink) process.exit(1);
  console.info("Exercise link", { permaLink });

  if (dryRun) console.info("Updating link-to-code config file", { filePath, files, permaLink });
  const result = await writeFile(
    filePath,
    JSON.stringify({ ...settings, files, permaLink }, null, 2),
    dryRun
  );
  if (!result) {
    console.error("Unable to update link-to-code config file", {
      filePath,
      files: settings.files,
      permaLink,
    });
    process.exit(1);
  }
}
