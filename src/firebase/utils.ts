const getErrorMessage = (error: Error): string => {
  if (error.name !== "FirebaseError") return error.message;
  else if (error.message.includes("auth/invalid-credential"))
    return "Invalid credentials";
  else if (error.message.includes("auth/missing-password"))
    return "Password missing";

  return error.message;
};

export const firebaseUtils = { getErrorMessage };
