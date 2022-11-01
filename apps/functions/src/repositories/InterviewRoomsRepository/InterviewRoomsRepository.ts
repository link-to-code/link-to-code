import { InterviewRoomModel, Model, toOmit, toRaw } from "@link-to-code/domain";

import db from "../../firebase/db";

const COLLECTION_NAME = "interview-rooms";

/**
 * @param {Model<InterviewRoomModel>} interviewRoomModel
 * @return {Promise<string>} Returns the id of the added interview room
 */
export async function createInterviewRoom(interviewRoomModel: Model<InterviewRoomModel>): Promise<string> {
  const interviewRoomData = toRaw(toOmit(interviewRoomModel, ["id"]), true);

  const res = await db.collection(COLLECTION_NAME).add(interviewRoomData);
  return res.id;
}
