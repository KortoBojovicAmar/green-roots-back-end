// Middleware to check if the user is an admin.
// If the user is an admin, the request is passed to the next middleware.
// If the user is not an admin, an error message is sent to the client.

export const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    req.isAdmin = true;
    next();
  } else {
    req.isAdmin = false;
    res.status(403).json({ message: 'You are not an admin' });
  }
}