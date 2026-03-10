import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: ["citizenProfile", "mpProfile"] });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: ["citizenProfile", "mpProfile"] });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};