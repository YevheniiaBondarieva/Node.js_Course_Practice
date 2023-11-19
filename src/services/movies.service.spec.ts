import { MockProxy, mock } from "jest-mock-extended";

import { IMovie, IMovieDocument } from "./../models";
import { DBService } from "./db.service";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let moviesService: MoviesService;
  let dbService: MockProxy<DBService>;

  beforeEach(() => {
    dbService = mock<DBService>();
    moviesService = new MoviesService(dbService);
  });

  it("should create a movie", async () => {
    const mockData = {
      title: "Mock Movie",
      description: "description",
      releaseDate: "2024-07-20",
      genre: ["comedy"],
    } as unknown as IMovie;
    const expectedResult = {
      _id: "test_id",
      ...mockData,
    } as unknown as IMovieDocument;
    dbService.createMovie.mockResolvedValue(expectedResult);

    const result = await moviesService.createMovie({ data: mockData });

    expect(result).toBe(expectedResult);
  });

  it("should find movie by id", async () => {
    const id = "mockId";
    const expectedResult = {
      _id: id,
      title: "Mock Movie",
      description: "description",
      releaseDate: "2024-07-20",
      genre: ["comedy"],
    } as unknown as IMovieDocument;
    dbService.findMovieById.mockResolvedValue(expectedResult);

    const result = await moviesService.findById({ id });

    expect(result).toBe(expectedResult);
  });

  it("should update movie", async () => {
    const id = "mockId";
    const mockData = {
      title: "Mock Movie",
      description: "description",
      releaseDate: "2024-07-20",
      genre: ["comedy"],
    } as unknown as IMovie;
    const expectedResult = {
      _id: id,
      ...mockData,
    } as unknown as IMovieDocument;
    dbService.findMovieByIdAndUpdate.mockResolvedValue(expectedResult);

    const result = await moviesService.findByIdAndUpdate({
      id,
      data: mockData,
    });

    expect(result).toBe(expectedResult);
  });

  it("should update movie with full data", async () => {
    const id = "mockId";
    const mockData = {
      title: "Mock Movie",
      description: "description",
      releaseDate: "2024-07-20",
      genre: ["comedy"],
    } as unknown as IMovie;
    const expectedResult = {
      _id: id,
      ...mockData,
    } as unknown as IMovieDocument;
    dbService.findMovieByIdAndUpdateFull.mockResolvedValue(expectedResult);

    const result = await moviesService.findByIdAndUpdateFull({
      id,
      data: mockData,
    });

    expect(result).toBe(expectedResult);
  });

  it("should delete a movie", async () => {
    const id = "mockId";
    const expectedResult = {
      _id: id,
      title: "Mock Movie",
      description: "description",
      releaseDate: "2024-07-20",
      genre: ["comedy"],
    } as unknown as IMovieDocument;
    dbService.deleteMovie.mockResolvedValue(expectedResult);

    const result = await moviesService.deleteMovie({ id });

    expect(result).toBe(expectedResult);
  });

  it("should search for movies ", async () => {
    const params = {
      search: "mock",
      pageSize: 10,
      page: 1,
    };
    const expectedResult = {
      data: [
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
      ] as unknown as IMovieDocument[],
    };
    dbService.findBySearchMovies.mockResolvedValue(expectedResult.data);

    const actualResult = await moviesService.findBySearch(params);

    expect(actualResult).toEqual(expectedResult);
  });

  it("should search for movies by genres", async () => {
    const params = {
      pageSize: 10,
      page: 1,
      genreName: "mockGenre",
    };
    const expectedResult = {
      data: [
        {
          _id: "mockId1",
          title: "Mock Movie 1",
          description: "description",
          releaseDate: "2024-07-20",
          genre: ["mockGenre"],
        },
        {
          _id: "mockId2",
          title: "Mock Movie 2",
          description: "description",
          releaseDate: "2024-03-20",
          genre: ["mockGenre"],
        },
      ] as unknown as IMovieDocument[],
    };
    dbService.findByGenreSearchMovies.mockResolvedValue(expectedResult.data);

    const actualResult = await moviesService.getMoviesByGenre(params);

    expect(actualResult).toEqual(expectedResult);
  });
});
