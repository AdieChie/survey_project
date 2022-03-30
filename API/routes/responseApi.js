const express = require("express");
const dboperations = require("./surveyresponses");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       required:
 *       properties:
 *         ResponseId:
 *           type: string
 *           description: The auto-generated id of the user
 *         SurveyId:
 *           type: string
 *           description: The user logged in
 *         UserId:
 *           type: string
 *           description: The email of the logged in user
 *
 *       example:
 *         ResponseId: d5fE_asz
 *         SurveyId: d5fE_asz
 *         UserId: d5fE_asz
 */

/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Responses  Api
 */

/**
 * @swagger
 * /responses:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [Responses]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Response'
 */

router.get("/", (req, res) => {
  dboperations.getAllResponses().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /responses/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         description: The user was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getResponseById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /responses:
 *   post:
 *     summary: Create a new user
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let user = {
    ResponseId: nanoid(idLength),
    SurveyId: req.body.SurveyId,
    UserId: req.body.UserId,
  };

  try {
    dboperations.createResponse(user).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /responses/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Responses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Response'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let user = {
    ResponseId: nanoid(idLength),
    SurveyId: req.body.SurveyId,
    UserId: req.body.UserId,
  };
  try {
    dboperations.updateResponse(user).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /responses/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteResponse(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;