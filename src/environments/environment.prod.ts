/**
 * Production environment, not be used locally
 *    No associate may change the context
 */
export const environment = {
  production: true,
  envName: `prod`,
  context: `http://localhost:4200`,
  apiUrl: 'http://http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/'
};
