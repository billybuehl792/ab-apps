import { useEffect, useState } from "react";
import { type ApplicationVerifier, RecaptchaVerifier } from "@firebase/auth";
import { auth } from "@/config/firebase";

const useRecaptchaVerifier = (containerId: string) => {
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<ApplicationVerifier>();

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });

    setRecaptchaVerifier(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    };
  }, [containerId]);

  return recaptchaVerifier;
};

export default useRecaptchaVerifier;
