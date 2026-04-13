export const validate = (schema) => (req, res, next) => {
  try {
    req.validated = schema.parse(req.body);
    next();
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: err.issues?.map(e => e.message).join(", ") || "Validation error",
      });
    }

    next(err);
  }
};