import { Request, Response } from "express";

import { IGenreDocument } from "../models";
import { GenresService } from "../services/genres.service";

export class GenresController {
  constructor(private genresService: GenresService) {}

  async getGenre(req: Request): Promise<IGenreDocument | null> {
    const { id } = req.params;
    const genre = await this.genresService.findById({ id });
    return genre;
  }

  async createGenre(req: Request): Promise<IGenreDocument> {
    const newGenre = await this.genresService.createGenre({
      data: req.body,
    });
    return newGenre;
  }

  async updateGenre(req: Request): Promise<IGenreDocument | null> {
    const { id } = req.params;
    const genre = await this.genresService.findByIdAndUpdate({
      id,
      data: req.body,
    });
    return genre;
  }

  async deleteGenre(
    req: Request,
    res: Response,
  ): Promise<IGenreDocument | null | undefined> {
    const { id } = req.params;
    const genre = await this.genresService.findById({ id });

    if (!genre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }

    const deletedGenre = await this.genresService.deleteGenre({ id });
    return deletedGenre;
  }

  async getGenresBySearch(
    req: Request,
  ): Promise<{ data: Array<IGenreDocument> }> {
    const params: {
      search?: string;
      pageSize: number;
      page: number;
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
    const searchResult = await this.genresService.findGenreBySearch(params);
    return searchResult;
  }
}

const genresController = new GenresController(new GenresService());
export default genresController;
