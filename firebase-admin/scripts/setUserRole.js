// setUserRole.js
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(
    "./firebase-admin/config/serviceAccountKey.json"
  ),
});

const handleRetrieveInput = () => {
  const userId = process.argv[2];
  const role = process.argv[3];

  // Validate args
  if (!userId || !role) {
    console.error("Usage: node setUserRole.js <userId> <role>");
    process.exit(1);
  }
  if (!["standard", "admin", "super_admin"].includes(role)) {
    console.error(
      "Invalid role. Allowed roles are: standard, admin, super_admin"
    );
    process.exit(1);
  }

  return { userId, role };
};

/**
 * @param {string} userId
 */
const handleGetUser = async (userId) => {
  try {
    const user = await admin.auth().getUser(userId);
    console.log(`User found: ${user.uid} (${user.email})`);
    return user;
  } catch (error) {
    console.error(`Error fetching user with id: ${userId}`, error);
    process.exit(1);
  }
};

/**
 * Update the custom claims for a user.
 * @param {admin.auth.UserRecord} user
 * @param {string} role
 */
const handleUpdateUserCustomClaimsRole = async (user, role) => {
  try {
    await admin
      .auth()
      .setCustomUserClaims(user.uid, { ...user.customClaims, role });
    console.log(
      `Successfully updated custom claims role for ${user.uid}:`,
      role
    );
  } catch (error) {
    console.error(`Error updating custom claims for ${user.uid}:`, error);
    process.exit(1);
  }
};

const { userId, role } = handleRetrieveInput();
const user = await handleGetUser(userId);
await handleUpdateUserCustomClaimsRole(user, role);
