import { Command } from "commander";

import { name, version } from "../package.json";
import * as actions from "./actions";

const program = new Command();

program.name(name).description("CLI to manage exercises.").version(version);

program
  .command("init")
  .description("Initialize the configuration in the folder required to deploy exercise template.")
  .requiredOption("-n, --name <string>", "The name of the exercise")
  .requiredOption("-e, --entry <string>", "The entry file of the exercise")
  .option("-d, --description <string>", "The description of the exercise")
  .option("-f, --file-path <string>", "The file path where to locate the settings")
  .option("--dry-run", "Simulate init")
  .action(actions.init);

program
  .command("deploy")
  .description("Deploy exercise template.")
  .requiredOption("-u, --api-url <string>", "The API url of the firebase functions")
  .option("-f, --file-path <string>", "The file path where to find the settings")
  .option("--dry-run", "Simulate init")
  .action(actions.deploy);

program.parse();
