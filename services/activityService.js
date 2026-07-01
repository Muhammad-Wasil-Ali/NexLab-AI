import {
  createActivity,
  listActivitiesByUser,
} from "@/repositories/activityRepository";

function serializeActivity(activity) {
  return {
    id: activity._id.toString(),
    userId: activity.userId.toString(),
    type: activity.type,
    title: activity.title,
    description: activity.description,
    entityId: activity.entityId ? activity.entityId.toString() : null,
    entityType: activity.entityType || null,
    createdAt: activity.createdAt,
  };
}

export async function recordActivity(activity) {
  try {
    return await createActivity(activity);
  } catch (error) {
    console.error("Unable to record activity:", error);
    return null;
  }
}

export async function getUserActivities(userId, options = {}) {
  const activities = await listActivitiesByUser(userId, options);

  return {
    success: true,
    status: 200,
    activities: activities.map(serializeActivity),
  };
}
