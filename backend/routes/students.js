const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

// GET all students
router.get("/", getStudents);

// POST a new student
router.post(
  "/",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("course").isString().notEmpty().withMessage("Course is required")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    addStudent(req, res);
  }
);

// PUT to update a student
router.put("/:id", updateStudent);

// DELETE a student
router.delete("/:id", deleteStudent);

module.exports = router;