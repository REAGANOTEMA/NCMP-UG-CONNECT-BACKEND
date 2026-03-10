import MPProfile from "../models/MPProfile.js";

export const getMPProfiles = async (req, res) => {
  try {
    const profiles = await MPProfile.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMPProfileById = async (req, res) => {
  try {
    const profile = await MPProfile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: "MP not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};