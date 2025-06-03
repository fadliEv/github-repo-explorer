import axios, { AxiosError } from 'axios';

export function parseAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again later.';
    }

    // Response received from server
    if (axiosError.response) {
      const { status } = axiosError.response;

      if (status >= 400 && status < 500) return handleClientError(status);
      if (status >= 500) return handleServerError(status);

      return `Unexpected response error (${status}).`;
    }
    
    if (axiosError.request) {
      return 'Network error: No response received from the server. Please check your internet connection.';
    }

    // Other Axios error
    return `Request error: ${axiosError.message}`;
  }

  // Non-Axios error (programming error, etc)
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
}

function handleClientError(status: number): string {
  switch (status) {
    case 401:
      return 'Unauthorized access. Please check your credentials.';
    case 403:
      return "Forbidden. You don't have permission to access this resource.";
    case 404:
      return 'Resource not found.';
    default:
      return `Client error (${status}). Please check your request.`;
  }
}

function handleServerError(status: number): string {
  return `Server error (${status}). Please try again later.`;
}
