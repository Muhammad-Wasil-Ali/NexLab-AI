import connectMongoDB from "@/lib/mongodb";
import Activity from "@/models/Activity";

export async function createActivity(activity) {
  await connectMongoDB();
  return Activity.create(activity);
}

export async function listActivitiesByUser(userId, { limit } = {}) {
  await connectMongoDB();

  const query = Activity.find({ userId }).sort({ createdAt: -1 }).lean();
  if (limit) {
    query.limit(limit);
  }

  return query;
}
