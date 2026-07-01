import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function findUserByEmail(email, options = {}) {
  await connectMongoDB();

  const query = User.findOne({ email: email.toLowerCase().trim() });

  if (options.includePassword) {
    query.select("+password");
  }

  return query;
}

export async function findUserById(userId, options = {}) {
  await connectMongoDB();

  const query = User.findById(userId);

  if (options.includePassword) {
    query.select("+password");
  }

  return query;
}

export async function createUser({ name, email, password }) {
  await connectMongoDB();

  return User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
  });
}

export async function updateUserPasswordByEmail(email, password) {
  await connectMongoDB();

  return User.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { $set: { password } },
    { new: true }
  );
}

export async function updateUserPasswordById(userId, password) {
  await connectMongoDB();

  return User.findByIdAndUpdate(
    userId,
    { $set: { password } },
    { new: true }
  );
}
