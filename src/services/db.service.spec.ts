import {
  Genre,
  IGenre,
  IGenreDocument,
  IMovie,
  IMovieDocument,
  Movie,
} from "./../models";
import { DBService } from "./db.service";

jest.mock("./../models/movie");
jest.mock("./../models/genre");

describe("DBService", () => {
  let dbService: DBService;

  const mockDataMovie = {
    title: "Mock Movie",
    description: "description",
    releaseDate: "2024-07-20",
    genre: ["comedy"],
  } as unknown as IMovie;
  const mockDataGenre = {
    name: "Mock Genre",
  } as unknown as IGenre;

  beforeEach(() => {
    dbService = new DBService();
  });

  describe("should create", () => {
    it("a movie", async () => {
      const expectedResult = {
        _id: "test_id",
        ...mockDataMovie,
      } as unknown as IMovieDocument;
      (Movie.create as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.createMovie(mockDataMovie);

      expect(Movie.create).toHaveBeenCalledWith(mockDataMovie);
    });

    it("a genre", async () => {
      const expectedResult = {
        _id: "test_id",
        ...mockDataGenre,
      } as unknown as IGenreDocument;
      (Genre.create as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.createGenre(mockDataGenre);

      expect(Genre.create).toHaveBeenCalledWith(mockDataGenre);
    });
  });

  describe("should search", () => {
    it("a movie by id", async () => {
      const id = "mockId";
      const expectedResult = {
        _id: id,
        ...mockDataMovie,
      } as unknown as IMovieDocument;
      (Movie.findById as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.findMovieById(id);

      expect(Movie.findById).toHaveBeenCalledWith(id);
    });

    it("a genre by id", async () => {
      const id = "mockId";
      const expectedResult = {
        _id: id,
        ...mockDataGenre,
      } as unknown as IGenreDocument;
      (Genre.findById as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.findGenreById(id);

      expect(Genre.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("should update", () => {
    it("a movie", async () => {
      const id = "mockId";
      const expectedResult = {
        ...mockDataMovie,
        _id: id,
      } as unknown as IMovieDocument;
      (Movie.findByIdAndUpdate as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.findMovieByIdAndUpdate(id, mockDataMovie);

      expect(Movie.findByIdAndUpdate).toHaveBeenCalledWith(id, mockDataMovie);
    });

    it("a genre", async () => {
      const id = "mockId";
      const expectedResult = {
        ...mockDataGenre,
        _id: id,
      } as unknown as IGenreDocument;
      (Genre.findByIdAndUpdate as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.findGenreByIdAndUpdate(id, mockDataGenre);

      expect(Genre.findByIdAndUpdate).toHaveBeenCalledWith(id, mockDataGenre);
    });
  });

  it("should update a movie with full data", async () => {
    const id = "mockId";
    const expectedResult = { ...mockDataMovie, _id: id } as IMovieDocument;
    const options = { returnDocument: "after" };
    (Movie.findOneAndReplace as jest.Mock).mockResolvedValue(expectedResult);

    await dbService.findMovieByIdAndUpdateFull(id, mockDataMovie);

    expect(Movie.findOneAndReplace).toHaveBeenCalledWith(
      { _id: id },
      mockDataMovie,
      options,
    );
  });

  describe("should delete", () => {
    it("a movie", async () => {
      const id = "mockId";
      const expectedResult = {
        _id: id,
        ...mockDataMovie,
      } as unknown as IMovieDocument;
      (Movie.findByIdAndDelete as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.deleteMovie(id);

      expect(Movie.findByIdAndDelete).toHaveBeenCalledWith(id);
    });

    it("a genre", async () => {
      const id = "mockId";
      const expectedResult = {
        _id: id,
        ...mockDataGenre,
      } as IGenreDocument;
      (Genre.findByIdAndDelete as jest.Mock).mockResolvedValue(expectedResult);

      await dbService.deleteGenre(id);

      expect(Genre.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });

  describe("should search", () => {
    it("for movies with releaseDateFrom and releaseDateTo", async () => {
      const params = {
        page: 1,
        pageSize: 10,
        search: "mock",
        releaseDateFrom: "2022-01-01",
        releaseDateTo: "2024-08-01",
      };
      const expectedResult = [
        {
          _id: "mockId1",
          title: "Mock Movie 1",
          description: "description",
          releaseDate: "2024-07-20",
          genre: ["comedy"],
        },
        {
          _id: "mockId2",
          title: "Mock Movie 2",
          description: "description",
          releaseDate: "2024-03-20",
          genre: ["comedy"],
        },
      ] as unknown as IMovieDocument[];
      const expectedSearchObject = {
        releaseDate: {
          $gte: new Date("2022-01-01T00:00:00.000Z"),
          $lte: new Date("2024-08-01T00:00:00.000Z"),
        },
        title: {
          $options: "i",
          $regex: /mock/,
        },
      };
      (Movie.find as jest.Mock).mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(expectedResult),
      });

      await dbService.findBySearchMovies(params);

      expect(Movie.find).toHaveBeenCalledWith(expectedSearchObject);
    });

    it("for movies with releaseDateFrom", async () => {
      const params = {
        page: 2,
        pageSize: 10,
        releaseDateFrom: "2022-01-01",
      };
      const expectedResult = [
        {
          _id: "mockId1",
          title: "Mock Movie 1",
          description: "description",
          releaseDate: "2024-07-20",
          genre: ["comedy"],
        },
        {
          _id: "mockId2",
          title: "Mock Movie 2",
          description: "description",
          releaseDate: "2024-03-20",
          genre: ["comedy"],
        },
      ] as unknown as IMovieDocument[];
      const expectedSearchObject = {
        releaseDate: { $gte: new Date(params.releaseDateFrom) },
      };
      (Movie.find as jest.Mock).mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(expectedResult),
      });

      await dbService.findBySearchMovies(params);

      expect(Movie.find).toHaveBeenCalledWith(expectedSearchObject);
    });

    it("for movies with releaseDateTo", async () => {
      const params = {
        page: 1,
        pageSize: 10,
        releaseDateTo: "2024-08-01",
      };
      const expectedResult = [
        {
          _id: "mockId1",
          title: "Mock Movie 1",
          description: "description",
          releaseDate: "2024-07-20",
          genre: ["comedy"],
        },
        {
          _id: "mockId2",
          title: "Mock Movie 2",
          description: "description",
          releaseDate: "2024-03-20",
          genre: ["comedy"],
        },
      ] as unknown as IMovieDocument[];
      const expectedSearchObject = {
        releaseDate: { $lte: new Date(params.releaseDateTo) },
      };
      (Movie.find as jest.Mock).mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(expectedResult),
      });

      await dbService.findBySearchMovies(params);

      expect(Movie.find).toHaveBeenCalledWith(expectedSearchObject);
    });

    it("by genre for movies", async () => {
      const params = {
        page: 2,
        pageSize: 10,
        genreName: "comedy",
      };
      const expectedResult = [
        {
          _id: "mockId1",
          title: "Mock Movie 1",
          description: "description",
          releaseDate: "2024-07-20",
          genre: ["comedy"],
        },
        {
          _id: "mockId2",
          title: "Mock Movie 2",
          description: "description",
          releaseDate: "2024-03-20",
          genre: ["comedy"],
        },
      ] as unknown as IMovieDocument[];
      const expectedSearchObject = { genre: { $in: [params.genreName] } };
      (Movie.find as jest.Mock).mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(expectedResult),
      });

      await dbService.findByGenreSearchMovies(params);

      expect(Movie.find).toHaveBeenCalledWith(expectedSearchObject);
    });

    it("for genres", async () => {
      const params = {
        page: 1,
        pageSize: 10,
        search: "mock",
      };

      const expectedResult = [
        {
          _id: "mockId1",
          name: "Mock Genre 1",
        },
        {
          _id: "mockId2",
          name: "Mock Genre 2",
        },
      ] as IGenreDocument[];
      const expectedSearchObject = { name: { $regex: /mock/, $options: "i" } };
      (Genre.find as jest.Mock).mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(expectedResult),
      });

      await dbService.findBySearchGenres(params);

      expect(Genre.find).toHaveBeenCalledWith(expectedSearchObject);
    });
  });

  describe("Skip count tests", () => {
    it("should calculate skip count for page 1", async () => {
      const params = {
        page: 1,
        pageSize: 10,
      };
      const mockFindObj = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      };
      (Movie.find as jest.Mock).mockReturnValueOnce(mockFindObj);

      await dbService.findByGenreSearchMovies(params);

      expect(mockFindObj.skip).toHaveBeenCalledWith(0);
    });

    it("should calculate skip count for page greater than 1", async () => {
      const params = {
        page: 3,
        pageSize: 10,
      };
      const mockFindObj = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      };
      (Genre.find as jest.Mock).mockReturnValueOnce(mockFindObj);

      await dbService.findBySearchGenres(params);

      expect(mockFindObj.skip).toHaveBeenCalledWith(20);
    });
  });
});
