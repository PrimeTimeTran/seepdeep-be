const zUser = z.object({
  submissions: z.array(zId.describe("ObjectId:Submission")),
});

type StreakType = z.infer<typeof streakSchema>;

type UserType = z.infer<typeof zUser> &
  mongoose.Document & {
    markModified: (path: string) => void;
  };

const userSchemaDefinition = zodToMongooseSchema(zUser);
const userSchema = new mongoose.Schema(userSchemaDefinition);

Auditor.addHooks(userSchema);
const User = mongoose.model<UserType>("User", userSchema);
export default User;
export { userSchema, User };
export type { UserType, StreakType };
