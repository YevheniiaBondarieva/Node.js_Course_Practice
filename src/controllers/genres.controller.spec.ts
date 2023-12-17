import { Request, Response } from "express";
import { MockProxy, mock } from "jest-mock-extended";

import { IGenreDocument } from "./../models";
import { GenresService } from "./../services/genres.service";
import { GenresController } from "./genres.controller";

describe("GenresController", () => {
  let genresController: GenresController;
  let genresService: MockProxy<GenresService>;

  const mockRequest = { params: { id: "mockId" } } as unknown as Request;
  const mockRequestWithBody = {
    body: { name: "New Mock Genre" },
    params: { id: "mockId" },
  } as unknown as Request;
  const mockResponse: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const expectedResult = {
    _id: "mockId",
    name: "New Mock Genre",
  } as unknown as IGenreDocument;

  beforeEach(() => {
    genresService = mock<GenresService>();
    genresController = new GenresController(genresService);
  });

  it("should get genre by ID", async () => {
    genresService.findById.mockResolvedValue(expectedResult);

    const actualResult = await genresController.getGenre(mockRequest);

    expect(actualResult).toBe(expectedResult);
  });

  it("should create a new genre", async () => {
    genresService.createGenre.mockResolvedValue(expectedResult);

    const actualResult =
      await genresController.createGenre(mockRequestWithBody);

    expect(actualResult).toBe(expectedResult);
  });

  it("should update an existing genre", async () => {
    genresService.findByIdAndUpdate.mockResolvedValue(expectedResult);

    const actualResult =
      await genresController.updateGenre(mockRequestWithBody);

    expect(actualResult).toBe(expectedResult);
  });

  it("should delete a genre", async () => {
    genresService.deleteGenre.mockResolvedValue(expectedResult);

    const actualResult = await genresController.deleteGenre(
      mockRequest,
      mockResponse,
    );

    expect(actualResult).toBe(expectedResult);
  });

  it("should respond with message when genre is not found on delete", async () => {
    const mockRequestParams = {
      params: { id: "nonExistentId" },
    } as unknown as Request;
    genresService.deleteGenre.mockResolvedValue(null);

    await genresController.deleteGenre(mockRequestParams, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Cannot find any genre with ID nonExistentId",
    });
  });

  it("should responde with 404 status when genre is not found on delete", async () => {
    const mockRequestParams = {
      params: { id: "nonExistentId" },
    } as unknown as Request;
    genresService.deleteGenre.mockResolvedValue(null);

    await genresController.deleteGenre(mockRequestParams, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it("should search for genres based on query parameters", async () => {
    const mockRequestQuery = {
      query: {
        search: "mock",
        pageSize: "10",
        page: "1",
      },
    } as unknown as Request;
    const expectedResultData = {
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
    genresService.findGenreBySearch.mockResolvedValue(expectedResultData);

    const actualResult =
      await genresController.getGenresBySearch(mockRequestQuery);

    expect(actualResult).toEqual(expectedResultData);
  });
});
