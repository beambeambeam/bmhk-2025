import { z } from "zod"

export const Roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  STAFF: "staff",
  USER: "user",
} as const

export type RoleKeys = (typeof Roles)[keyof typeof Roles]

export const RolesEnum = z.enum(Object.values(Roles) as [string, ...string[]])

export const StaffRolesEnum = z.enum([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.STAFF])

export const StaffRoles = [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.STAFF]

export const AdminRoles = [Roles.SUPER_ADMIN, Roles.ADMIN]
