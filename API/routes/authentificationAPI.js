const express = require("express");
const dboperations = require('./users');
var passwordHash = require('password-hash');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - Email
 *         - Password
 *       properties:
 *         Email:
 *           type: string
 *           description: The email of the logged in user
 *         FirstName:
 *           type: string
 *           description: The user logged in
 *         LastName:
 *           type: string
 *           description: The user logged in
 *         UserType:
 *           type: string
 *           description: The type of user logged in (admin or user)
 *         Password:
 *           type: string
 *           description: The user password
 *         
 *       example:

 *         Email: dummy@gmail.com
 *         Password: testing
 */

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: User Authentication Apis
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Login user
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       500:
 *         description: Some server error
 */

 router.post("/", (req, res,next) => {

    try {
      dboperations.login(req.body).then((result) => {
        res.status(200).json(result);
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  
  });

  module.exports = router;