import "dotenv/config"; // Import dotenv config
import axios from "axios"; // Import Axios

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set base URL from environment variable
});

export default instance;
