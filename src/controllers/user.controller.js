import { createUser } from "../services/user.service.js";
import { sendEmail } from "../services/email.service.js";
import { sendSMS } from "../services/sms.service.js";

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const file = req.file;
  try {
    const user = await createUser(name, email, password, phone, file);
    await sendEmail(email, "Welcome!", "<h1>Welcome to Shopping App</h1>");
    if (phone) await sendSMS(phone, "Welcome to Shopping App!");
    res.status(201).json({ message: "User created", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser };
