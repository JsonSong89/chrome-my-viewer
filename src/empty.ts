import {axios, Vue, $, moment} from "./source/base"

console.log("this is empty");

Vue.config.devtools = false;

let what = axios.create();


console.log(what);

export {what}
