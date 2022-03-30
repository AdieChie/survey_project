const express = require("express");
const dboperations = require("./surveys");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Survey:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         SurveyId:
 *           type: string
 *           description: The auto-generated id of the Survey
 *         Name:
 *           type: string
 *           description: The survey title
 *         UserId:
 *           type: string
 *           description: The survey title 
 *         UserName:
 *           type: string
 *           description: Th user name
 *
 *       example:
 *         SurveyId: d5fE_asz
 *         Name: my first Survey
 *         UserId: f4gt_aqw
 *         UserName: adie
 */

/**
 * @swagger
 * tags:
 *   name: Surveys
 *   description: Survey Tracker Api
 */

/**
 * @swagger
 * /surveys:
 *   get:
 *     summary: Returns the list of all the Activities
 *     tags: [Surveys]
 *     responses:
 *       200:
 *         description: The list of the activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Survey'
 */

router.get("/", (req, res) => {
  dboperations.getAllSurveys().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /surveys/{id}:
 *   get:
 *     summary: get the survey based on id
 *     tags: [Surveys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The survey id
 *     responses:
 *       200:
 *         description: The survey description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Survey'
 *       404:
 *         description: The task was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getSurveyById(req.params.id).then((result) => {
   
    res.status(200).json(result[0]);
  
  });
});

/**
 * @swagger
 * /surveys:
 *   post:
 *     summary: Create a new task
 *     tags: [Surveys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Survey'
 *     responses:
 *       200:
 *         description: The survey was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Survey'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let survey = {
    SurveyId: nanoid(idLength),
    Name: req.body.Name,
    UserId: req.body.UserId,
    UserName: req.body.UserName,
  };

  try {
    dboperations.createSurvey(survey).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /surveys/{id}:
 *  put:
 *    summary: Update the task by the id
 *    tags: [Surveys]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The survey id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let survey = {
    SurveyId: req.params.id,
    Name: req.body.Name,
    UserId: req.body.UserId,
    UserName: req.body.UserName,
  };
  try {
    dboperations.updateSurvey(survey).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /surveys/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Surveys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteSurvey(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
///dep[loy]
