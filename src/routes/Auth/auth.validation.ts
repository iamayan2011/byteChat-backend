import Joi from "joi";

const emailValidation = Joi.string()
  .email({ minDomainSegments: 2 })
  .required()
  .messages({
    "string.email": "Please provide a valid email address",
  });

const fullNameValidation = Joi.string()
  .pattern(/^[a-zA-Z\s]+$/)
  .min(2)
  .max(50)
  .required()
  .messages({
    "string.pattern.base": "Name can only contain letters and spaces",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 50 characters",
  });

const passwordValidation = Joi.string()
  .min(8)
  .max(30)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .required()
  .messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password cannot exceed 30 characters",
  });

export const signupValidation = Joi.object({
  fullName: fullNameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const loginValidation = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});
