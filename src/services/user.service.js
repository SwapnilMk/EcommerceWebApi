import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashUtil.js";
import { s3 } from "../config/aws.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const createUser = async (name, email, password, phone, file) => {
  const hashedPassword = await hashPassword(password);
  let avatarUrl = "";
  if (file) {
    const resizedImage = await sharp(file.buffer).resize(200, 200).toBuffer();
    const params = {
      Bucket: "your-s3-bucket-name",
      Key: `avatars/${Date.now()}_${file.originalname}`,
      Body: resizedImage,
      ContentType: file.mimetype,
    };
    await s3.send(new PutObjectCommand(params));
    avatarUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  }
  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    avatar: avatarUrl,
  });
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export { createUser, findUserByEmail };
