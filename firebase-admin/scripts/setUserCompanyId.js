// setUserCompanyId.js
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(
    "./firebase-admin/config/serviceAccountKey.json"
  ),
});

const handleRetrieveInput = () => {
  const userId = process.argv[2];
  const companyId = process.argv[3];
  const overrideCompanyId = Boolean(process.argv[4]);

  // Validate args
  if (!userId || !companyId) {
    console.error(
      "Usage: node setUserCompanyId.js <userId> <companyId> [<overrideCompanyId>]"
    );
    process.exit(1);
  }

  return { userId, companyId, overrideCompanyId };
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
 * @param {string} companyId
 */
const handleGetCompany = async (companyId) => {
  const company = await admin
    .firestore()
    .collection("companies")
    .doc(companyId)
    .get();

  if (!company.exists)
    throw new Error(
      "The company this user belongs to does not exist. An admin must reconfigure this user."
    );

  return company;
};

/**
 * Update the custom claims for a user.
 * @param {admin.auth.UserRecord} user
 * @param {string} companyId
 */
const handleUpdateUserCustomClaimsCompanyId = async (user, companyId) => {
  try {
    await admin
      .auth()
      .setCustomUserClaims(user.uid, { ...user.customClaims, companyId });
    console.log(
      `Successfully updated custom claims companyId for ${user.uid}:`,
      companyId
    );
  } catch (error) {
    console.error(`Error updating custom claims for ${user.uid}:`, error);
    process.exit(1);
  }
};

const { userId, companyId, overrideCompanyId } = handleRetrieveInput();
const user = await handleGetUser(userId);
if (!overrideCompanyId) await handleGetCompany(companyId);

await handleUpdateUserCustomClaimsCompanyId(user, companyId);
