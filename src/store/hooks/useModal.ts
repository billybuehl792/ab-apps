import { use } from "react";
import ModalContext from "../context/ModalContext";

const useModal = () => use(ModalContext);

export default useModal;
