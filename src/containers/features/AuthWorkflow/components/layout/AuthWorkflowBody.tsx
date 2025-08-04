import { FactorId } from "firebase/auth";
import useAuth from "@/hooks/useAuth";
import useAuthWorkflow from "../../hooks/useAuthWorkflow";
import AuthWorkflowSuccess from "./AuthWorkflowSuccess";
import AuthWorkflowSignIn from "./AuthWorkflowSignIn";
import AuthWorkflowMultiFactorHints from "./AuthWorkflowMultiFactorHints";
import AuthWorkflowMultiFactorPhoneVerification from "./AuthWorkflowMultiFactorPhoneVerification";

const AuthWorkflowBody = () => {
  /** Values */

  const auth = useAuth();
  const { multiFactorResolver, multiFactorHint } = useAuthWorkflow();

  if (auth.user) return <AuthWorkflowSuccess user={auth.user} />;
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
