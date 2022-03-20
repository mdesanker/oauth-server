import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const register = [
  // Validate and sanitize input
  check("username", "Username is required").trim().notEmpty().escape(),
  check("email", "Email is required").trim().notEmpty().escape().isEmail(),
  check("password", "Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),

  // Error handling
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

const login = [
  // Validate and sanitize input
  check("email", "Email is required").trim().notEmpty().escape().isEmail(),
  check("password", "Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),

  // Error handling
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

export default { register, login };
