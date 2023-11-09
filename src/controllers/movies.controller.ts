import { Request, Response } from "express";

import { IMovieDocument } from "../models";
import { MoviesService } from "../services/movies.service";

export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  async getMovie(req: Request): Promise<IMovieDocument | null> {
    const { id } = req.params;
    const movie = await this.moviesService.findById({ id });
    return movie;
  }

  async createMovie(req: Request): Promise<IMovieDocument> {
    const newMovie = await this.moviesService.createMovie({
      data: req.body,
    });
    return newMovie;
  }

  async updateMovie(req: Request): Promise<IMovieDocument | null> {
    const { id } = req.params;
    const movie = await this.moviesService.findByIdAndUpdate({
      id,
      data: req.body,
    });
    return movie;
  }

  async updateFullMovie(req: Request): Promise<IMovieDocument | null> {
    const { id } = req.params;
    const movie = await this.moviesService.findByIdAndUpdateFull({
      id,
      data: req.body,
    });
    return movie;
  }

  async deleteMovie(
    req: Request,
    res: Response,
  ): Promise<IMovieDocument | null | undefined> {
    const { id } = req.params;
    const deletedMovie = await this.moviesService.deleteMovie({ id });
    if (!deletedMovie) {
      res.status(404).json({ message: `Cannot find any movie with ID ${id}` });
      return;
    }
    return deletedMovie;
  }

  async getMoviesBySearch(
    req: Request,
  ): Promise<{ data: Array<IMovieDocument> }> {
    const params: {
      search?: string;
      pageSize: number;
      page: number;
      releaseDateFrom?: string;
      releaseDateTo?: string;
    } = { page: 1, pageSize: 10 };
    if (req.query.search != null) {
      params.search = req.query.search as string;
    }
    if (req.query.pageSize) {
      params.pageSize = parseInt(req.query.pageSize as string, 10);
    }
    if (req.query.page != null && !Array.isArray(req.query.page)) {
      params.page = parseInt(req.query.page as string, 10);
    }
    if (req.query.releaseDateFrom != null) {
      params.releaseDateFrom = req.query.releaseDateFrom as string;
    }
    if (req.query.releaseDateTo != null) {
      params.releaseDateTo = req.query.releaseDateTo as string;
    }
    const searchResult = await this.moviesService.findBySearch(params);
    return searchResult;
  }

  async getMoviesByGenre(
    req: Request,
  ): Promise<{ data: Array<IMovieDocument> }> {
    const genreName = req.params.genreName;
    const params: { pageSize: number; page: number; genreName: string } = {
      page: 1,
      pageSize: 10,
      genreName: genreName,
    };
    if (req.query.pageSize) {
      params.pageSize = parseInt(req.query.pageSize as string, 10);
    }
    if (req.query.page != null && !Array.isArray(req.query.page)) {
      params.page = parseInt(req.query.page as string, 10);
    }
    const searchResult = await this.moviesService.getMoviesByGenre(params);
    return searchResult;
  }
}

const moviesController = new MoviesController(new MoviesService());
export default moviesController;
