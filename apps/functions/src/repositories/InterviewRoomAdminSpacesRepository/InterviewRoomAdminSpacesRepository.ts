import { InterviewRoomAdminSpaceModel, Model, toOmit, toRaw } from "@link-to-code/domain";

import db from "../../firebase/db";

const COLLECTION_NAME = "interview-room-admin-spaces";

/**
 * @param {Model<InterviewRoomAdminSpaceModel>} interviewRoomAdminSpaceModel
 * @return {Promise<string>} Returns the id of the added interview room admin space
 */
export async function createInterviewRoomAdminSpace(
  interviewRoomAdminSpaceModel: Model<InterviewRoomAdminSpaceModel>
): Promise<string> {
  const interviewRoomAdminSpaceData = toRaw(toOmit(interviewRoomAdminSpaceModel, ["id"]), true);

  const res = await db.collection(COLLECTION_NAME).add(interviewRoomAdminSpaceData);
  return res.id;
}
