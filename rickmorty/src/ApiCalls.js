const baseUrl = process.env.REACT_APP_API_URL;




export function getApiCall(queryString, api = 'character/') {
  const endPoint = baseUrl + api;
  if (!queryString) {
    queryString = "";
  }
  return getCall(endPoint + queryString);
}

export function getCall(url) {
  return fetch(url, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
