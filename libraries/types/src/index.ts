// NOTE: MUST BE ALL IN ONE FILE TO USE TS-TO-ZOD

/**
 * This interface represents a file to be used in the coding
 * exercise (directly used in the editor).
 */
export interface File {
  /**
   * The file name (must be without spaces).
   */
  filename: string;

  /**
   * Specify whether the file content can be changed or not.
   * A readonly file will appear in the editor as not editable.
   */
  readonly: boolean;

  /**
   * The file language (used to give intellisense and syntax highlight in the editor).
   * Defaults to plain text
   */
  language?: string;

  /**
   * The content for this file, can be empty (accepts strings only).
   */
  content: string;
}

/**
 * The CodingExercise interface represents a coding exercise.
 *
 * Every coding exercise has the information of the exercise itsef,
 * its files, description and other information used in the interview room.
 */
export interface CodingExercise {
  /**
   * The name of the exercise (will be displayed in the UI as is).
   */
  name: string;

  /**
   * The descrioption of the exercise (will be displayed in the UI as is).
   */
  description?: string;

  /**
   * The list of files for this test.
   */
  files: File[];

  /**
   * Specify whether the file is the entry point of the coding exercise.
   */
  entry: File["filename"];
}

/**
 * The CodingExerciseTemplate interface represents a coding exercise to be used as atemplate.
 *
 * An interview room will fork a coding exervise template by cloning it's coding exercise data,
 * preserving the template as immutable in time, no matter how many interview rooms are created.
 */
export interface CodingExerciseTemplate {
  /**
   * The id of a created coding exercise template
   */
  id?: string;

  /**
   * The coding exercise
   */
  codingExercise: CodingExercise;
}

/**
 * The InterviewRoom interface represents the room used to conduct an interview.
 *
 * It's a fork of a coding exervise template with all its data to be used within the editor.
 * Anything within an interview room will be visible to all users in the room.
 */
export interface InterviewRoom {
  /**
   * The id of the interview room
   */
  id?: string;

  /**
   * The coding exercise
   */
  codingExercise: CodingExercise;
}

/**
 * The InterviewRoomAdminSpace interface represents a space where admins
 * can collect and see admin only data for an interview.
 */
export interface InterviewRoomAdminSpace {
  /**
   * The id of the interview room admin space
   */
  id?: string;

  /**
   * The id of a referenced interview room
   */
  interviewRoomId: string;
}
