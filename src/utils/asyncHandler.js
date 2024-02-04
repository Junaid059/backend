//same method

// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve().catch((err) => {
//       next(err);
//     });
//   };
// };

const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    res.status(err.code || 400).json({
      success: false,
      message: err.message,
    });
  }
};
export { asyncHandler };
