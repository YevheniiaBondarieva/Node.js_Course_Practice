import { Router } from "express";

import genresController from "../../controllers/genres.controller";
import { errorHandlerController } from "../../middlewares/errorHandler.middleware";

const genresRouter: Router = Router();

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get list of movie genres
 *     tags: [Genres]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search genres by name
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
 *         description: Number of genres per page
 *         example: 2
 *     responses:
 *       200:
 *         description: List of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Genre'
 *
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       description: Genre data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *           example:
 *             name: crime story
 *     responses:
 *       200:
 *         description: Created genre
 *         content:
 *           application/json:
 *               schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad Request
 */

genresRouter
  .route("/")
  .get(
    errorHandlerController(
      genresController.getGenresBySearch.bind(genresController),
    ),
  )
  .post(
    errorHandlerController(genresController.createGenre.bind(genresController)),
  );

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: Genre data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad Request
 *
 *   patch:
 *     summary: Update genre
 *     requestBody:
 *       description: Genre data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *           example:
 *             name: comedy
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: Updated genre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad Request
 *
 *   put:
 *     summary: Update genre completely
 *     requestBody:
 *       description: Genre data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *           example:
 *             name: fantasy
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: Updated genre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad Request
 *
 *   delete:
 *     summary: Delete genre
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: Deleted genre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad Request
 *
 */
genresRouter
  .route("/:id")
  .get(errorHandlerController(genresController.getGenre.bind(genresController)))
  .patch(
    errorHandlerController(genresController.updateGenre.bind(genresController)),
  )
  .put(
    errorHandlerController(genresController.updateGenre.bind(genresController)),
  )
  .delete(
    errorHandlerController(genresController.deleteGenre.bind(genresController)),
  );

export default genresRouter;
