import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Define the shape of the response data (replace with actual API response structure)
interface LoginResponse {
  token?: string;
  user?: any; // Replace `any` with the actual user type if available
  message?: string; // Example field for any additional info
}

// Define the parameters for the `login` function
interface LoginParams {
  step: string;
  noHp: string;
  pin?: string | null; // Pin can be a string or null
}

// Function with TypeScript annotations
export const login = async ({
  step,
  noHp,
  pin = null,
}: LoginParams): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, {
      step,
      no_hp: noHp, // Backend expects `no_hp`
      pin,
    });

    return response.data;
  } catch (error: any) {
    // Handle error with TypeScript-safe checks
    const errorMessage =
      error.response?.data?.message || 'Something went wrong, please try again';
    throw new Error(errorMessage);
  }
};

