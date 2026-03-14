import MPProfile from "../models/MPProfile.js";

export const getMPProfiles = async (req, res) => {
  try {
    const profiles = await MPProfile.findAll({ 
      include: ["user"],
      order: [["createdAt", "DESC"]] 
    });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMPProfileById = async (req, res) => {
  try {
    const profile = await MPProfile.findByPk(req.params.id, { include: ["user", "projects"] });
    if (!profile) return res.status(404).json({ message: "MP not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMPProfile = async (req, res) => {
  try {
    const profile = await MPProfile.findOne({ where: { user_id: req.user.id } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    await profile.update(req.body);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};