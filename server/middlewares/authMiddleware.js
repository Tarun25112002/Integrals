import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    const auth = req.auth();
    const userId = auth?.userId;

    // Guard: user must be authenticated
    if (!userId) {
      return res.json({ success: false, message: "Not authenticated. Please sign in." });
    }

    // Try session claims first (fastest, no API call)
    let role =
      auth.sessionClaims?.metadata?.role ||
      auth.sessionClaims?.publicMetadata?.role;

    // Fallback: fetch from Clerk API if role not in session claims
    // (This happens when a custom JWT template isn't configured in Clerk Dashboard)
    if (!role) {
      try {
        const user = await clerkClient.users.getUser(userId);
        role = user.publicMetadata?.role;
      } catch (clerkError) {
        console.error("Failed to fetch user from Clerk:", clerkError.message);
        return res.json({ success: false, message: "Authentication service error" });
      }
    }

    if (role !== "educator") {
      return res.json({ success: false, message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

