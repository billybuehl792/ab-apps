import { FactorId } from "firebase/auth";

import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import AuthWorkflowSignIn from "./AuthWorkflowSignIn";
import AuthWorkflowMultiFactorHints from "./AuthWorkflowMultiFactorHints";
import AuthWorkflowMultiFactorPhoneVerification from "./AuthWorkflowMultiFactorPhoneVerification";

const AuthWorkflowBody = () => {
  /** Values */

  const { multiFactorResolver, multiFactorHint } = useAuthWorkflow();

  if (multiFactorResolver) {
    if (multiFactorHint) {
      if (multiFactorHint.factorId === FactorId.PHONE)
        return <AuthWorkflowMultiFactorPhoneVerification />;
      else return null;
    }
    return <AuthWorkflowMultiFactorHints />;
  }
  return <AuthWorkflowSignIn />;
};

export default AuthWorkflowBody;
