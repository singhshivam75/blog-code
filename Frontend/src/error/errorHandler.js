export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || "Something went wrong!";
  } else if (error.request) {
    return "Network error. Please try again.";
  } else {
    return error.message || "Unexpected error occurred";
  }
};