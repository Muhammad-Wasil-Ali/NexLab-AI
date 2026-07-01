import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function findUserById(userId) {
  await connectMongoDB();
  return User.findById(userId);
}

export async function updateUserName(userId, name) {
  await connectMongoDB();
  return User.findByIdAndUpdate(
    userId,
    { $set: { name: name.trim() } },
    { new: true }
  );
}
