import type { User } from "@/lib/types"

const BASE_USER = {
  id: "507f1f77bcf86cd799439011",
  firstName: "Jamie",
  lastName: "Doe",
  gender: "M",
  email: "jamie.doe@example.com",
} satisfies Omit<User, "subscriptions">

export const USER_WITH_ONE_SUBSCRIPTION: User = {
  ...BASE_USER,
  subscriptions: ["RIGHT_1"],
}

export const USER_WITHOUT_SUBSCRIPTION: User = {
  ...BASE_USER,
  subscriptions: [],
}

export const USER_WITH_MULTIPLE_SUBSCRIPTION: User = {
  ...BASE_USER,
  subscriptions: ["RIGHT_1", "RIGHT_2"],
}

//************* Get user by profile *************//

export type ProfileKey = "one" | "multiple" | "none"

export const PROFILES: Record<ProfileKey, { label: string; user: User }> = {
  one: { label: "1 abonnement", user: USER_WITH_ONE_SUBSCRIPTION },
  multiple: { label: "Plusieurs abonnements", user: USER_WITH_MULTIPLE_SUBSCRIPTION },
  none: { label: "Aucun abonnement", user: USER_WITHOUT_SUBSCRIPTION },
}

export function getUserByProfile(profile?: string): { key: ProfileKey; user: User } {
  const key: ProfileKey = profile === "multiple" || profile === "none" ? profile : "one"
  return { key, user: PROFILES[key].user }
}
