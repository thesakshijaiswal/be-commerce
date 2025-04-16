import jwt from "jsonwebtoken";
const tokenGenerator = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
  });
};
export default tokenGenerator;
