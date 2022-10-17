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
   * The list of files for this test.
   */
  files: File[];

  /**
   * Specify whether the file is the entry point of the coding exercise.
   */
  entry: File["filename"];
}
