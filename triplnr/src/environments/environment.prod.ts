export const environment = {
  production: true,
  //urls assigned to variables for mapping purposes
  authURL: "http://ec2-18-216-192-115.us-east-2.compute.amazonaws.com:8081/auth/",
  userURL: "http://ec2-18-216-192-115.us-east-2.compute.amazonaws.com:8081/users/",
  tripURL: "http://ec2-18-216-192-115.us-east-2.compute.amazonaws.com:8081/trip/",
  requestURL: "http://ec2-18-216-192-115.us-east-2.compute.amazonaws.com:8081/friends/",
  mapsKey: process.env.MAPS_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID
};
