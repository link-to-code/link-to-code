import { httpsCallable } from "firebase/functions";
import { InterviewRoomLinks } from "@link-to-code/types";

import { functions } from "../../../firebase";

export async function createInterviewRoom(codingExerciseTemplateId: string): Promise<InterviewRoomLinks> {
  const createInterviewRoom = httpsCallable<{ codingExerciseTemplateId: string }, InterviewRoomLinks>(
    functions,
    "createInterviewRoom"
  );

  const response = await createInterviewRoom({ codingExerciseTemplateId });
  return response.data;
}
