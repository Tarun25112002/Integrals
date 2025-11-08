export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });
    res.json({ message: "Role updated to educator successfully" });
  } catch (error) {
    res.json({ message: "Error updating role", error: error.message });
  }
};
