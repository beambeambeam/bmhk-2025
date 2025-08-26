import { boolean, integer, pgTable, text, timestamp, uuid, uniqueIndex, pgEnum } from "drizzle-orm/pg-core"

export const teams = pgTable("teams", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  imageId: text("team_image_id").notNull(),
  name: text("team_name").notNull(),
  school: text("school_name").notNull(),
  memberCount: integer("member_count").notNull().default(0),
  quote: text("quote").notNull(),
  award: text("award").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const advisor = pgTable(
  "advisor",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    prefix: text("prefix").notNull(),
    thaiFirstname: text("thai_firstname").notNull(),
    thaiMiddlename: text("thai_middlename"),
    thaiLastname: text("thai_lastname").notNull(),
    firstName: text("english_firstname").notNull(),
    middleName: text("english_middlename"),
    lastname: text("english_lastname").notNull(),
    foodAllergy: text("food_allergy").notNull(),
    foodType: text("food_type").notNull(),
    drugAllergy: text("drug_allergy").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone_number").notNull(),
    lineId: text("line_id"),
    nationalDocId: uuid("national_doc_id").references(() => file.id, { onDelete: "set null" }),
    teacherDocId: uuid("teacher_doc_id").references(() => file.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => ({
    // Ensure one advisor per team
    teamIdUnique: uniqueIndex("advisor_team_id_unique").on(table.teamId),
  })
)

export const member = pgTable(
  "member",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    index: integer("index").notNull().default(1),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    prefix: text("prefix").notNull(),
    thaiFirstname: text("thai_firstname").notNull(),
    thaiMiddlename: text("thai_middlename"),
    thaiLastname: text("thai_lastname").notNull(),
    firstName: text("english_firstname").notNull(),
    middleName: text("english_middlename"),
    lastname: text("english_lastname").notNull(),
    foodAllergy: text("food_allergy").notNull(),
    foodType: text("food_type").notNull(),
    drugAllergy: text("drug_allergy").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone_number").notNull(),
    lineId: text("line_id"),
    parent: text("parent").notNull(),
    parentPhoneNumber: text("parent_phone_number").notNull(),
    nationalDocId: uuid("national_doc_id").references(() => file.id, { onDelete: "set null" }),
    p7DocId: uuid("p7_doc_id").references(() => file.id, { onDelete: "set null" }),
    facePicId: uuid("face_picture_id").references(() => file.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => ({
    teamIndexUnique: uniqueIndex("member_team_index_unique").on(table.teamId, table.index),
  })
)

export const file = pgTable("file", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  uploadBy: text("uploaded_by").references(() => user.id, { onDelete: "cascade" }),
  resourceType: text("resource_type").notNull(),
  uploadAt: timestamp("upload_at").defaultNow().notNull(),
  name: text("name").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
})

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()),
})

export const registerStatusEnum = pgEnum("register_status_enum", ["NOT_DONE", "DONE", "NOT_HAVE"])

export const registerStatus = pgTable(
  "register_status",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    team: registerStatusEnum("team").notNull().default("NOT_DONE"),
    adviser: registerStatusEnum("adviser").notNull().default("NOT_DONE"),
    member1: registerStatusEnum("member1").notNull().default("NOT_DONE"),
    member2: registerStatusEnum("member2").notNull().default("NOT_DONE"),
    member3: registerStatusEnum("member3").notNull().default("NOT_HAVE"),
    submitRegister: timestamp("submit_register"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => ({
    // Ensure one register status per team
    teamIdUnique: uniqueIndex("register_status_team_id_unique").on(table.teamId),
  })
)
