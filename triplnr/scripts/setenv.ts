const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    authURL: "http://localhost:8080/auth/",
    userURL: "http://localhost:8080/users/",
    tripURL: "http://localhost:8080/trip/",
    requestURL: "http://localhost:8080/friends/",
    mapsKey: "AIzaSyBdMa5mObr7e3k11wJ3AxhCRenQ9EnOeKw",
    AUTH_DOMAIN: "${process.env.AUTH_DOMAIN}",
    AUTH_CLIENT_ID: "${process.env.AUTH_CLIENT_ID}"
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});