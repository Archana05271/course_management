// backend/middleware/notFoundMiddleware.js
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  res.json({
    success: false,
    message: `The requested URL '${req.originalUrl}' is out of bounds or unavailable.`
  });
};

export default notFound;