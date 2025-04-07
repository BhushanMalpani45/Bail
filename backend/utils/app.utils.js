/** Function to format the API response */
export const responseFormatter = (statusCode, status, data, message) => {
  const res = { status_code: statusCode, status, data, message };
  return res;
};
export const comparePassword = (password, Password) => {
  if (password == Password) {
    return true;
  }
  return false;
};
