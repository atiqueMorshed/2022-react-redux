import { FullUserProfileType } from "./auth/auth.types";

export type EmailType = string;

export type ShortUserType = Pick<FullUserProfileType, "id" | "email" | "name">;
