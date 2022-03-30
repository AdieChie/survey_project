const express = require("express");
const dboperations = require("./questions");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - QuestionText
 *       properties:
 *         QuestionId:
 *           type: string
 *           description: The auto-generated id of the user
 *         SurveyId:
 *           type: string
 *           description: The user logged in
 *         QuestionText:
 *           type: string
 *           description: The email of the logged in user
 *         QuestionType:
 *           type: Int
 *           description: The email of the logged in user
 *
 *       example:
 *         QuestionId: d5fE_asz
 *         SurveyId: d5fE_asz
 *         QuestionText: Are you happy
 *         QuestionType: 1
 */

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions  Api
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */

router.get("/", (req, res) => {
  dboperations.getAllQuestions().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Questions]
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
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The user was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getQuestionById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new user
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let question = {
    QuestionId: nanoid(idLength),
    SurveyId: req.body.SurveyId,
    QuestionText: req.body.QuestionText,
    QuestionType: req.body.QuestionType,
  };

  try {
    dboperations.createQuestion(question).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /questions/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Questions]
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
 *            $ref: '#/components/schemas/Question'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let question = {
    QuestionId: nanoid(idLength),
    SurveyId: req.body.SurveyId,
    QuestionText: req.body.QuestionText,
    QuestionType: req.body.QuestionType,
  };
  try {
    dboperations.updateQuestion(question).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Questions]
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
    dboperations.deleteQuestion(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;