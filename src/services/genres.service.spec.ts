import { MockProxy, mock } from "jest-mock-extended";

import { IGenreDocument, IGenre } from "./../models";
import { DBService } from "./db.service";
import { GenresService } from "./genres.service";

describe("GenresService", () => {
  let genresService: GenresService;
  let dbService: MockProxy<DBService>;

  beforeEach(() => {
    dbService = mock<DBService>();
    genresService = new GenresService(dbService);
  });

  it("should create a genre", async () => {
    const mockData = {
      name: "Mock Genre",
    } as unknown as IGenre;
    const expectedResult = {
      _id: "test_id",
      ...mockData,
    } as unknown as IGenreDocument;
    dbService.createGenre.mockResolvedValue(expectedResult);

    const result = await genresService.createGenre({ data: mockData });

    expect(result).toBe(expectedResult);
  });

  it("should find genre by id", async () => {
    const id = "mockId";
    const expectedResult = {
      _id: id,
      name: "Mock Genre",
    } as unknown as IGenreDocument;
    dbService.findGenreById.mockResolvedValue(expectedResult);

    const result = await genresService.findById({ id });

    expect(result).toBe(expectedResult);
  });

  it("should update genre", async () => {
    const id = "mockId";
    const mockData = {
      name: "Updated Mock Genre",
    } as unknown as IGenre;
    const expectedResult = {
      _id: id,
      ...mockData,
    } as unknown as IGenreDocument;
    dbService.findGenreByIdAndUpdate.mockResolvedValue(expectedResult);

    const result = await genresService.findByIdAndUpdate({
      id,
      data: mockData,
    });

    expect(result).toBe(expectedResult);
  });

  it("should delete a genre", async () => {
    const id = "mockId";
    const expectedResult = {
      _id: id,
      name: "Mock Genre",
    } as unknown as IGenreDocument;
    dbService.deleteGenre.mockResolvedValue(expectedResult);

    const result = await genresService.deleteGenre({ id });

    expect(result).toBe(expectedResult);
  });

  it("should find genres by search", async () => {
    const params = {
      search: "mock",
      pageSize: 10,
      page: 1,
    };
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
      ] as unknown as IGenreDocument[],
    };
    dbService.findBySearchGenres.mockResolvedValue(expectedResult.data);

    const actualResult = await genresService.findGenreBySearch(params);

    expect(actualResult).toEqual(expectedResult);
  });
});
