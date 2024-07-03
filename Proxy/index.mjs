import { proxyBatman } from "./ProxyFirstMethod.mjs";
import { proxyFlash } from "./ProxyReflectMethod.mjs";

/** Using the traditional way of getting value from object */

proxyBatman.email = "darkknightrises@gotham.com"
const batmanEmail = proxyBatman.email
console.log(batmanEmail)

/** Using the Reflect Method to get the values from object */

proxyFlash.email = "fastestmanalive@centralcity.com"
const flashEmail = proxyFlash.email
console.log(flashEmail)