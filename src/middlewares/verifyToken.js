import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      message: "access denied",
    });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: "invalid token",
    });
  }
};

export const generateToken = (userinfo) => {
  try {
    const payload = {
      email: userinfo.email,
      id: userinfo.id,
      name:userinfo.name
    }
    const token = jwt.sign({payload:payload}, process.env.JWT_SECRET);
    return token
  } catch (error) {
    return error
  }
    
}

