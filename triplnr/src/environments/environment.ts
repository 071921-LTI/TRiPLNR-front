
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //urls assigned to variables for mapping purposes
  authURL: "http://localhost:8080/auth/",
  userURL: "http://localhost:8080/users/",
  tripURL: "http://localhost:8080/trip/",
  requestURL: "http://localhost:8080/friends/",
  
  //api key for Google Maps api
  mapsKey: "AIzaSyBdMa5mObr7e3k11wJ3AxhCRenQ9EnOeKw"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
