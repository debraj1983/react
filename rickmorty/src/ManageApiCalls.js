import { getApiCall, getCall } from "./ApiCalls";

const getCharectors = params => {
  return getApiCall(params);
};

export const getData = url => {
  return getCall(url);
};

export default getCharectors;
