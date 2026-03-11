export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    // Use session claims from JWT instead of external API call
    const role =
      req.auth.sessionClaims?.metadata?.role ||
      req.auth.sessionClaims?.publicMetadata?.role;
    if (role !== "educator") {
      return res.json({ success: false, message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
