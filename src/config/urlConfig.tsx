const ENV = {
  dev: {
    apiUrl: process.env.REACT_APP_KOA_BACKEND_URL || "http://localhost:8080",
  },
  prod: {
    apiUrl: process.env.REACT_APP_KOA_BACKEND_URL,
  },
};

const getApiUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return ENV.dev.apiUrl;
  }
  return ENV.prod.apiUrl;
};

export default getApiUrl;
