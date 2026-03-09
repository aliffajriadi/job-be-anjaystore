// Middleware for admin-only access using KEY from .env
const adminAuth = (req, res, next) => {
  const key = req.headers["x-admin-key"];

  if (!key || key !== process.env.ADMIN_KEY) {
    return res
      .status(403)
      .json({ message: "Akses ditolak: Admin key tidak valid" });
  }

  next();
};

export default adminAuth;
