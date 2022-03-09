import axios from "axios";
import { HEADER_FOOTER_ENDPOINT } from "../config/constants";

export const getHeaderFooter = async () => {
  const { data } = await axios.get(HEADER_FOOTER_ENDPOINT);
  return data || {};
};
