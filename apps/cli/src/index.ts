import { Command } from "commander";

import { name, version } from "../package.json";
import * as actions from "./actions";

const program = new Command();

program.name(name).description("CLI to manage exercises.").version(version);

program
  .command("init")
  .description("Initialize the configuration in the folder required to publish exercise template.")
  .requiredOption("-n, --name <string>", "The name of the exercise")
  .requiredOption("-e, --entry <string>", "The entry file of the exercise")
  .requiredOption(
    "-u, --api-url <string>",
    "The API url of the firebase functions, only the base url is needed, E.g. https://link-to-code-yourorganization.firebaseapp.com"
  )
  .option("-d, --description <string>", "The description of the exercise")
  .option("-f, --file-path <string>", "The file path where to locate the settings")
  .option("--dry-run", "Simulate init")
  .action(actions.init);

program
  .command("publish")
  .description("Publish exercise template.")
  .option("-f, --file-path <string>", "The file path where to find the settings")
  .option("--dry-run", "Simulate publish exercise template")
  .action(actions.publish);

program.parse();
