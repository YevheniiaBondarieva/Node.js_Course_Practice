import { Request, Response } from "express";
import { MockProxy, mock } from "jest-mock-extended";

import { IMovieDocument } from "./../models";
import { MoviesService } from "./../services/movies.service";
import { MoviesController } from "./movies.controller";

describe("MoviesController", () => {
  let moviesController: MoviesController;
  let moviesService: MockProxy<MoviesService>;

  const mockRequest = { params: { id: "mockId" } } as unknown as Request;
  const mockRequestWithBody = {
    params: { id: "mockId" },
    body: {
      title: "New Mock Movie",
      description: "description",
      releaseDate: "2024-07-20",
      genre: ["comedy"],
    },
  } as unknown as Request;
  const mockResponse: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const movieDocument = {
    _id: "mockId",
    title: "New Mock Movie",
    description: "description",
    releaseDate: "2024-07-20",
    genre: ["comedy"],
  } as unknown as IMovieDocument;

  beforeEach(() => {
    moviesService = mock<MoviesService>();
    moviesController = new MoviesController(moviesService);
  });

  it("should get movie by ID", async () => {
    moviesService.findById.mockResolvedValue(movieDocument);

    const actualResult = await moviesController.getMovie(mockRequest);

    expect(actualResult).toBe(movieDocument);
  });

  it("should create a new movie", async () => {
    moviesService.createMovie.mockResolvedValue(movieDocument);

    const actualResult =
      await moviesController.createMovie(mockRequestWithBody);

    expect(actualResult).toBe(movieDocument);
  });

  it("should update an existing movie", async () => {
    moviesService.findByIdAndUpdate.mockResolvedValue(movieDocument);

    const actualResult =
      await moviesController.updateMovie(mockRequestWithBody);

    expect(actualResult).toBe(movieDocument);
  });

  it("should update an existing full movie", async () => {
    moviesService.findByIdAndUpdateFull.mockResolvedValue(movieDocument);

    const actualResult =
      await moviesController.updateFullMovie(mockRequestWithBody);

    expect(actualResult).toBe(movieDocument);
  });

  it("should delete a movie", async () => {
    moviesService.deleteMovie.mockResolvedValue(movieDocument);

    const actualResult = await moviesController.deleteMovie(
      mockRequest,
      mockResponse,
    );

    expect(actualResult).toBe(movieDocument);
  });

  it("should respond with message when movie is not found on delete", async () => {
    const mockRequestParams = {
      params: { id: "nonExistentId" },
    } as unknown as Request;
    moviesService.deleteMovie.mockResolvedValue(null);

    await moviesController.deleteMovie(mockRequestParams, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Cannot find any movie with ID nonExistentId",
    });
  });

  it("should responde with 404 status when movie is not found on delete", async () => {
    const mockRequestParams = {
      params: { id: "nonExistentId" },
    } as unknown as Request;
    moviesService.deleteMovie.mockResolvedValue(null);

    await moviesController.deleteMovie(mockRequestParams, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it("should search for movies based on query parameters", async () => {
    const mockRequestQuery = {
      query: {
        search: "mock",
        pageSize: "10",
        page: "1",
        releaseDateFrom: "2022-01-01",
        releaseDateTo: "2024-08-01",
      },
    } as unknown as Request;
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
          title: "New Mock Movie 2",
          description: "description",
          releaseDate: "2024-03-10",
          genre: [],
        },
      ] as unknown as IMovieDocument[],
    };
    moviesService.findBySearch.mockResolvedValue(expectedResult);

    const actualResult =
      await moviesController.getMoviesBySearch(mockRequestQuery);

    expect(actualResult).toEqual(expectedResult);
  });

  it("should get movies by genre", async () => {
    const mockRequestQuery = {
      params: { genreName: "Comedy" },
      query: {
        pageSize: "10",
        page: "1",
      },
    } as unknown as Request;
    const expectedResult = {
      data: [
        {
          _id: "mockId1",
          title: "Mock Movie 1",
          description: "description",
          releaseDate: "2024-07-20",
          genre: ["Comedy"],
        },
        {
          _id: "mockId2",
          title: "New Mock Movie 2",
          description: "description",
          releaseDate: "2024-03-10",
          genre: ["Comedy"],
        },
      ] as unknown as IMovieDocument[],
    };
    moviesService.getMoviesByGenre.mockResolvedValue(expectedResult);

    const actualResult =
      await moviesController.getMoviesByGenre(mockRequestQuery);

    expect(actualResult).toEqual(expectedResult);
  });
});
