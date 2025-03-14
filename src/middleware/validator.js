
import { body, validationResult } from 'express-validator';

const validateJob = [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
    body('location').isLength({ min: 3 }).withMessage('Location must be at least 3 characters long'),
    body('company').isLength({ min: 3 }).withMessage('Company must be at least 3 characters long'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('logo').optional().isString().withMessage('Logo must be a string URL'),
    body('type').isLength({ min: 3 }).withMessage('Type must be at least 3 characters long'),
    body('experienceLevel').isLength({ min: 3 }).withMessage('Experience Level must be at least 3 characters long'),
    body('currency').isLength({ min: 3 }).withMessage('Currency must be at least 3 characters long'),
    body('isbookmarked').isBoolean().withMessage('isbookmarked must be a boolean'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

 const registerValidation = () => [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is Required")
      .isLength({ min: 3, max: 50 }),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is Required")
      .isLength({
        min: 8,
        max: 20,
      }),
  ];
  
   const loginValidation = () => [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is Required")
      .isLength({
        min: 8,
        max: 20,
      }),
  ];    
  export  { validateJob, registerValidation, loginValidation };
