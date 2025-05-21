import { use } from "react";
import AuthWorkflowContext from "../context/AuthWorkflowContext";

const useAuthWorkflow = () => use(AuthWorkflowContext);

export default useAuthWorkflow;
