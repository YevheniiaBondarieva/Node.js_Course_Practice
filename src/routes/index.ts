import { Application } from "express";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import { notFoundHandler } from "../middlewares/errorHandler.middleware";

class AppRouter {
  constructor(private app: Application) {}
  init() {
       /**
     * @swagger
     * /health-check:
     *   get:
     *     summary: Health Check endpoint
     *     description: Returns a JSON response indicating the server is running.
     *     responses:
     *       200:
     *         description: Server is running
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Server is running
     *                 app:
     *                   type: string
     *                   example: Health
     *       404:
     *         description: Resource not found
     *       500:
     *         description: Internal Server Error
     */
    this.app.get('/health-check', (req, res) => {
      res.status(200).json({message: 'Server is running', app: 'Health'})
    });
    this.app.use('/health-check', [notFoundHandler, errorHandler] ),

    /**
     * @swagger
     * /health:
     *   get:
     *     summary: Health endpoint
     *     description: Returns a JSON response.
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: This is Health page
     *       404:
     *         description: Resource not found
     *       500:
     *         description: Internal Server Error
     */
    this.app.get('/health', (req, res) => {
      res.status(200).json({message: 'This is Home page'});
    });
    this.app.use('/health', [notFoundHandler, errorHandler] );

}}

export default AppRouter;