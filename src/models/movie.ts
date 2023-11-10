import { Document, model, Schema } from "mongoose";
// MOVIE
/**
 * Interface to model the User Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param releaseDate: Date
 * @param genre: Array<string>
 *
 */

export interface IMovie {
  title: string;
  description: string;
  releaseDate: Date;
  genre: Array<string>;
}

export interface IMovieDocument extends Document, IMovie {}

const movieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  releaseDate: {
    type: Date,
    required: true,
    get: (v: Date) => v.toISOString(),
    set: (v: string) => new Date(v),
  },
  genre: {
    type: Array<string>,
    required: true,
    default: [],
  },
});

export const Movie = model<IMovieDocument>("MovieItem", movieSchema);
