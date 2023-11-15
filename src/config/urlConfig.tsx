const ENV = {
  dev: {
    apiUrl: "http://localhost:8080"
  },
  prod: {
    apiUrl: "noneYet"
  }
};

const getApiUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getApiUrl;
