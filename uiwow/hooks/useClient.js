import { useContext } from "react";
import { ClientContext } from "../context";

export const useClient = () => useContext(ClientContext);
