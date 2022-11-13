import { CodingExercise } from "@link-to-code/types";
import axios from "axios";

import { formatApiUrl } from "../../utils";

export type PublishExerciseOptions = {
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
}: PublishExerciseOptions): Promise<string | null> {
  if (dryRun) return null;
  try {
    const { data } = await axios.post<{ permalink: string }>(
      `${formatApiUrl(apiUrl)}/api/coding-exercise-templates`,
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

    console.error("Publish exercise failed", { error: (e as Error).message });
    return null;
  }
}
