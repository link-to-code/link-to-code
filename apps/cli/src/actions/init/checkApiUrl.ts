import axios from "axios";

import { formatApiUrl } from "../../utils";

export default async function (apiUrl: string, dryRun = false): Promise<boolean> {
  if (dryRun) return true;

  try {
    await axios.get<string>(`${formatApiUrl(apiUrl)}/api/ping`);
    return true;
  } catch (e) {
    console.warn("Unable to ping api url", e);
    return false;
  }
}
