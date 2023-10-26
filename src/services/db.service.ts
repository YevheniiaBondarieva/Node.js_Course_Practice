import { FilterQuery } from "mongoose";

import {
  Genre,
  IGenre,
  IGenreDocument,
  IMovie,
  IMovieDocument,
  Movie,
} from "./../models";

export class DBService {
  async createMovie(params: IMovie): Promise<IMovieDocument> {
    return Movie.create(params);
  }

  async createGenre(params: IGenre): Promise<IGenreDocument> {
    return Genre.create(params);
  }

  async findMovieById(id: string): Promise<IMovieDocument | null> {
    return Movie.findById(id);
  }

  async findGenreById(id: string): Promise<IGenreDocument | null> {
    return Genre.findById(id);
  }

  async findMovieByIdAndUpdate(
    id: string,
    params: IMovie,
  ): Promise<IMovieDocument | null> {
    return Movie.findByIdAndUpdate(id, params);
  }

  async findGenreByIdAndUpdate(
    id: string,
    params: IGenre,
  ): Promise<IGenreDocument | null> {
    return Genre.findByIdAndUpdate(id, params);
  }

  async findMovieByIdAndUpdateFull(
    id: string,
    params: IMovie,
  ): Promise<IMovieDocument | null> {
    return Movie.findOneAndReplace({ _id: id }, params, {
      returnDocument: "after",
    });
  }

  async deleteMovie(id: string): Promise<IMovieDocument | null> {
    return Movie.findByIdAndDelete(id);
  }

  async deleteGenre(id: string): Promise<IGenreDocument | null> {
    return Genre.findByIdAndDelete(id);
  }

  async findBySearchMovies(params: {
    page: number;
    pageSize: number;
    search?: string;
    releaseDateFrom?: string;
    releaseDateTo?: string;
  }): Promise<Array<IMovieDocument>> {
    const skipCount =
      params.page == 1 ? 0 : params.pageSize * (params.page - 1);
    const query: FilterQuery<IMovieDocument> = {};

    if (params.search != null) {
      query.title = { $regex: new RegExp(params.search), $options: "i" };
    }

    if (params.releaseDateFrom != null && params.releaseDateTo != null) {
      query.releaseDate = {
        $gte: new Date(params.releaseDateFrom),
        $lte: new Date(params.releaseDateTo),
      };
    } else if (params.releaseDateFrom != null) {
      query.releaseDate = {
        $gte: new Date(params.releaseDateFrom),
      };
    } else if (params.releaseDateTo != null) {
      query.releaseDate = {
        $lte: new Date(params.releaseDateTo),
      };
    }

    return Movie.find(query)
      .sort({ releaseDate: -1 })
      .skip(skipCount)
      .limit(params.pageSize)
      .exec();
  }

  async findByGenreSearchMovies(params: {
    page: number;
    pageSize: number;
    genreName?: string;
  }): Promise<Array<IMovieDocument>> {
    const skipCount =
      params.page == 1 ? 0 : params.pageSize * (params.page - 1);
    const query: FilterQuery<IMovieDocument> = {};
    if (params.genreName != null) {
      query.genre = { $in: [params.genreName] };
    }

    return Movie.find(query)
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(params.pageSize)
      .exec();
  }

  async findBySearchGenres(params: {
    page: number;
    pageSize: number;
    search?: string;
  }): Promise<Array<IGenreDocument>> {
    const skipCount =
      params.page == 1 ? 0 : params.pageSize * (params.page - 1);
    const query: FilterQuery<IGenreDocument> = {};
    if (params.search != null) {
      query.name = { $regex: new RegExp(params.search), $options: "i" };
    }

    return Genre.find(query)
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(params.pageSize)
      .exec();
  }
}
