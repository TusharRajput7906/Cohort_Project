import {body} from "express-validator";

export const createProductValidator = [
    body("productName")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({min:3})
    .withMessage("Product name must be at least 3 characters"),

    body("price")
     .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

    body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters")
];

export const updateProductValidator=[
    body("productName")
.optional()
.isLength({ min: 3 })
.withMessage("Product name must be at least 3 characters"),

body("price")
.optional()
.isNumeric()
.withMessage("Price must be a number"),

body("description")
.optional()
.isLength({ min: 10 })
.withMessage("Description must be at least 10 characters")
]

