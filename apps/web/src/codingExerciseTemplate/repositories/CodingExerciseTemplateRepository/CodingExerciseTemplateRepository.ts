import { doc, getDoc } from "firebase/firestore/lite";
import { CodingExerciseTemplate } from "@link-to-code/types";

import { firestore } from "../../../firebase/firestore";

const COLLECTION_NAME = "coding-exercise-templates";

export async function getById(id: string): Promise<CodingExerciseTemplate | undefined> {
  const docData = await getDoc(doc(firestore, COLLECTION_NAME, id));
  return docData.data() as CodingExerciseTemplate;
}
