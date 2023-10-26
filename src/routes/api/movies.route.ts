import { Router } from "express";

import moviesController from "../../controllers/movies.controller";
import { errorHandlerController } from "../../middlewares/errorHandler.middleware";

const moviesRouter: Router = Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get list of movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search movies by title
 *         example: Barbie
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of movies per page
 *         example: 2
 *       - in: query
 *         name: releaseDateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Release date from (inclusive)
 *         example: 2023-01-24
 *       - in: query
 *         name: releaseDateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Release date to (inclusive)
 *         example: 2023-10-24
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       description: Movie data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *           example:
 *             title: Title example
 *             description: Description example
 *             releaseDate: 2024-07-20,
 *             genre: [ comedy, fantasy]
 *     responses:
 *       200:
 *         description: Created movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad Request
 */
moviesRouter
  .route("/")
  .get(
    errorHandlerController(
      moviesController.getMoviesBySearch.bind(moviesController),
    ),
  )
  .post(
    errorHandlerController(moviesController.createMovie.bind(moviesController)),
  );

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad Request
 *
 *   patch:
 *     summary: Update movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     requestBody:
 *       description: Movie data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *           example:
 *             title: Title example 2
 *             description: Description example 2
 *             releaseDate: 2024-07-01,
 *             genre: [ comedy]
 *     responses:
 *       200:
 *         description: Updated movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad Request
 *
 *   put:
 *     summary: Update movie completely
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     requestBody:
 *       description: Movie data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *           example:
 *             title: Title example 3
 *             releaseDate: 2024-07-20,
 *     responses:
 *       200:
 *         description: Updated movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad Request
 *
 *   delete:
 *     summary: Delete movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Deleted movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad Request
 */
moviesRouter
  .route("/:id")
  .get(errorHandlerController(moviesController.getMovie.bind(moviesController)))
  .patch(
    errorHandlerController(moviesController.updateMovie.bind(moviesController)),
  )
  .put(
    errorHandlerController(
      moviesController.updateFullMovie.bind(moviesController),
    ),
  )
  .delete(
    errorHandlerController(moviesController.deleteMovie.bind(moviesController)),
  );

/**
 * @swagger
 * /api/movies/genre/{genreName}:
 *   get:
 *     summary: Get list of movies by genre
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: genreName
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre name
 *         example: comedy
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of movies per page
 *         example: 2
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 */
moviesRouter
  .route("/genre/:genreName")
  .get(
    errorHandlerController(
      moviesController.getMoviesByGenre.bind(moviesController),
    ),
  );

export default moviesRouter;
