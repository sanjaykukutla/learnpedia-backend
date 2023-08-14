const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  isSignedIn,
  isAuthenticated,
  isEducator,
} = require("../controllers/authController");
const {
  courseUpload,
  getUserCourses,
} = require("../controllers/courseController");
const { getUserById } = require("../controllers/userController");

router.param("userId", getUserById);
// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      course:
//  *       type: object
//  *         required:
//  *            - category
//  *            - desc
//  *            - price
//  *            - title
//  *          properties-
//  *
//  *
//  */

router.post(
  "/courseupload/:userId",
  [
    check("title", "title should be atleast 3 char").isLength({ min: 3 }),
    check("price", "price should be a number").isNumeric(),
  ],
  isSignedIn,
  isAuthenticated,
  isEducator,
  courseUpload
);

/**
 * @swagger
 *  components:
 *    schemas:
 *     courses:
 *         type: object
 *         required:
 *            - category
 *            - desc
 *            - price
 *            - title
 *         properties:
 *              id:
 *               type: integer
 *               description : auto generated number by system
 *              category:
 *                type: string
 *                description : This is a describes about the type of course
 *              desc:
 *                type: string
 *                description : This is a brief about the course details
 *              price:
 *                type: string
 *                description : This is cost of the course
 *              title:
 *                type: string
 *                description : This is title of the course.
 *
 *
 */

/**
 * @swagger
 *  /courses/:userId:
 *    get:
 *     summary: returns all the courses of a parrticular student
 *     tags : [courses]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description : user id
 *     responses:
 *        200:
 *         description: returns list of courses
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/courses'
 *        404:
 *          description : courses not found and invalid user id
 */
router.get(
  "/courses/:userId",
  isSignedIn,
  isAuthenticated,
  isEducator,
  getUserCourses
);

module.exports = router;
