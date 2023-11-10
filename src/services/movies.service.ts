import { IMovie, IMovieDocument } from "../models";

import { DBService } from "./db.service";
const dbService = new DBService();

export class MoviesService {
  async createMovie(params: { data: IMovie }): Promise<IMovieDocument> {
    const movie = await dbService.createMovie(params.data);
    return movie;
  }

  async findById(params: { id: string }): Promise<IMovieDocument | null> {
    const movie = await dbService.findMovieById(params.id);
    return movie;
  }

  async findByIdAndUpdate(params: {
    id: string;
    data: IMovie;
  }): Promise<IMovieDocument | null> {
    const movie = await dbService.findMovieByIdAndUpdate(params.id, {
      ...params.data,
    });
    return movie;
  }

  async findByIdAndUpdateFull(params: {
    id: string;
    data: IMovie;
  }): Promise<IMovieDocument | null> {
    const movie = await dbService.findMovieByIdAndUpdateFull(
      params.id,
      params.data,
    );
    return movie;
  }

  async deleteMovie(params: { id: string }): Promise<IMovieDocument | null> {
    const movie = await dbService.deleteMovie(params.id);
    return movie;
  }

  async findBySearch(params: {
    search?: string;
    pageSize: number;
    page: number;
    releaseDateFrom?: string;
    releaseDateTo?: string;
  }): Promise<{ data: Array<IMovieDocument> }> {
    const result = await dbService.findBySearchMovies(params);
    return { data: result };
  }

  async getMoviesByGenre(params: {
    pageSize: number;
    page: number;
    genreName?: string;
  }): Promise<{ data: Array<IMovieDocument> }> {
    const result = await dbService.findByGenreSearchMovies(params);
    return { data: result };
  }
}
