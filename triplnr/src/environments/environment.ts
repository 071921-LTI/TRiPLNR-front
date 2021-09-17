
export const environment = {
    production: false,
    authURL: "http://localhost:8080/auth/",
    userURL: "http://localhost:8080/users/",
    tripURL: "http://localhost:8080/trip/",
    requestURL: "http://localhost:8080/friends/",
    weatherURL: "http://localhost:8080/weather/",
    mapsKey: process.env.MAPS_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID
};
