import { findUserByEmail } from "../services/user.service.js";
import { generateToken } from "../services/auth.service.js";
import { comparePassword } from "../utils/hashUtil.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id.toString());
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { loginUser };
