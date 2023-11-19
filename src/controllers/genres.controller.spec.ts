import { Request, Response } from "express";
import { MockProxy, mock } from "jest-mock-extended";

import { IGenreDocument } from "./../models";
import { GenresService } from "./../services/genres.service";
import { GenresController } from "./genres.controller";

describe("GenresController", () => {
  let genresController: GenresController;
  let genresService: MockProxy<GenresService>;

  beforeEach(() => {
    genresService = mock<GenresService>();
    genresController = new GenresController(genresService);
  });

  it("should get genre by ID", async () => {
    const mockRequest = { params: { id: "mockId" } } as unknown as Request;
    const expectedResult = {
      _id: "mockId",
      name: "Mock Genre",
    } as unknown as IGenreDocument;
    genresService.findById.mockResolvedValue(expectedResult);

    const actualResult = await genresController.getGenre(mockRequest);

    expect(actualResult).toBe(expectedResult);
  });

  it("should create a new genre", async () => {
    const mockRequest = { body: { name: "New Mock Genre" } } as Request;
    const expectedResult = {
      _id: "mockId",
      name: "New Mock Genre",
    } as unknown as IGenreDocument;
    genresService.createGenre.mockResolvedValue(expectedResult);

    const actualResult = await genresController.createGenre(mockRequest);

    expect(actualResult).toBe(expectedResult);
  });

  it("should update an existing genre", async () => {
    const mockRequest = {
      params: { id: "mockId" },
      body: { name: "Updated Mock Genre" },
    } as unknown as Request;
    const expectedResult = {
      _id: "mockId",
      name: "Updated Mock Genre",
    } as unknown as IGenreDocument;
    genresService.findByIdAndUpdate.mockResolvedValue(expectedResult);

    const actualResult = await genresController.updateGenre(mockRequest);

    expect(actualResult).toBe(expectedResult);
  });

  it("should delete a genre", async () => {
    const mockRequest = { params: { id: "mockId" } } as unknown as Request;
    const expectedResult = {
      _id: "mockId",
      name: "Mock Genre",
    } as unknown as IGenreDocument;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    genresService.deleteGenre.mockResolvedValue(expectedResult);

    const actualResult = await genresController.deleteGenre(
      mockRequest,
      mockResponse,
    );

    expect(actualResult).toBe(expectedResult);
  });

  it("should respond with message when genre is not found on delete", async () => {
    const mockRequest = {
      params: { id: "nonExistentId" },
    } as unknown as Request;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    genresService.deleteGenre.mockResolvedValue(null);

    await genresController.deleteGenre(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Cannot find any genre with ID nonExistentId",
    });
  });

  it("should responde with 404 status when genre is not found on delete", async () => {
    const mockRequest = {
      params: { id: "nonExistentId" },
    } as unknown as Request;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    genresService.deleteGenre.mockResolvedValue(null);

    await genresController.deleteGenre(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it("should search for genres based on query parameters", async () => {
    const mockRequest = {
      query: {
        search: "mock",
        pageSize: "10",
        page: "1",
      },
    } as unknown as Request;
    const expectedResult = {
      data: [
        {
          _id: "mockId1",
          name: "Mock Genre 1",
        },
        {
          _id: "mockId2",
          name: "Mock Genre 2",
        },
      ] as IGenreDocument[],
    };
    genresService.findGenreBySearch.mockResolvedValue(expectedResult);

    const actualResult = await genresController.getGenresBySearch(mockRequest);

    expect(actualResult).toEqual(expectedResult);
  });
});
