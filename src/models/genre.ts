import { Document, model, Schema } from "mongoose";
// Genre
/**
 * Interface to model the User Schema for TypeScript.
 * @param name:string
 */

export interface IGenre {
  name: string;
}
export interface IGenreDocument extends Document, IGenre {}
const genreSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Genre = model<IGenreDocument>("Genre", genreSchema);
