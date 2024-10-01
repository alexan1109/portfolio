const baseUrl = process.env.baseUrl ?? "http://localhost:3000";
const endpointsV1 = {
  projects: `${baseUrl}/v1/projects`,
};

export { baseUrl, endpointsV1 as endpoints };