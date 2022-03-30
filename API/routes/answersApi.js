const express = require("express");
const dboperations = require("./answers");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - Answer
 *       properties:
 *         AnswerId:
 *           type: string
 *           description: The auto-generated id of the user
 *         ResponseId:
 *           type: string
 *           description: foreign key
 *         QuestionId:
 *           type: string
 *           description: foreign key
 *         Answer:
 *           type: string
 *           description: The answer from user
 *
 *       example:
 *         AnswerId: d5fE_asz
 *         ResponseId: d5fE_asz
 *         QuestionId: d4fE_ase
 *         Answer: yes
 */

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Answers  Api
 */

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [Answers]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 */

router.get("/", (req, res) => {
  dboperations.getAllAnswers().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Answers]
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
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: The user was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getAnswerById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /answers:
 *   post:
 *     summary: Create a new user
 *     tags: [Answers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let user = {
    AnswerId: nanoid(idLength),
    ResponseId: req.body.ResponseId,
    QuestionId: req.body.QuestionId,
    Answer: req.body.Answer,
  };

  try {
    dboperations.createAnswer(user).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /answers/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Answers]
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
 *            $ref: '#/components/schemas/Answer'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Answer'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let user = {
    AnswerId: nanoid(idLength),
    ResponseId: req.body.ResponseId,
    QuestionId: req.body.QuestionId,
    Answer: req.body.Answer,
  };
  try {
    dboperations.updateAnswer(user).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Answers]
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
    dboperations.deleteAnswer(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;