import inquirer from "inquirer";

import { writeFile } from "../../utils";
import getSettings from "../getSettings";
import { getDefaultConfigFilePath } from "../init";
import getExerciseFiles from "./getExerciseFiles";
import publishExercise from "./publishExercise";
import { PublishOptions } from "./types";

export async function publish({
  apiUrl,
  filePath = getDefaultConfigFilePath(),
  dryRun = false,
}: PublishOptions) {
  const settings = await getSettings(filePath);
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
