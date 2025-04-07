import jwt from 'jsonwebtoken';

export const jwtAuthMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log("Hello" ,token);

  if (!token) {
    return res.status(401).json({ error: 'Token Not Found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
};
