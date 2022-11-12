import { CodingExercise } from "@link-to-code/types";
import axios from "axios";

const formatApiUrl = (apiUrl: string) => (!apiUrl.endsWith("/") ? apiUrl : apiUrl.slice(0, -1));

export type DeployExerciseOptions = {
  dryRun: boolean;
  apiUrl: string;
  codingExercise: CodingExercise;
  token: string;
};

export default async function ({
  dryRun,
  apiUrl,
  codingExercise,
  token,
}: DeployExerciseOptions): Promise<string | null> {
  if (dryRun) return null;
  try {
    const { data } = await axios.post<{ permalink: string }>(
      `${formatApiUrl(apiUrl)}/coding-exercise-templates`,
      { codingExercise },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data.permalink;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        console.error("Authentication error with given token", { apiUrl });
        return null;
      }
      if (e.response?.status === 400) {
        console.error("Exercise settings data are not valid", { apiUrl, error: e.response.data });
        return null;
      }
    }

    console.error("Deploy exercise failed", { error: (e as Error).message });
    return null;
  }
}
