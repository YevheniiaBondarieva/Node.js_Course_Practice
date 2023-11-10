import { IGenre, IGenreDocument } from "../models";

import { DBService } from "./db.service";
const dbService = new DBService();

export class GenresService {
  async createGenre(params: { data: IGenre }): Promise<IGenreDocument> {
    const genre = await dbService.createGenre(params.data);
    return genre;
  }

  async findById(params: { id: string }): Promise<IGenreDocument | null> {
    const genre = await dbService.findGenreById(params.id);
    return genre;
  }

  async findByIdAndUpdate(params: {
    id: string;
    data: IGenre;
  }): Promise<IGenreDocument | null> {
    const genre = await dbService.findGenreByIdAndUpdate(
      params.id,
      params.data,
    );
    return genre;
  }

  async deleteGenre(params: { id: string }): Promise<IGenreDocument | null> {
    const genre = await dbService.deleteGenre(params.id);
    return genre;
  }

  async findGenreBySearch(params: {
    search?: string;
    pageSize: number;
    page: number;
  }): Promise<{ data: Array<IGenreDocument> }> {
    const result = await dbService.findBySearchGenres(params);
    return { data: result };
  }
}
