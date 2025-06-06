// element dark
import "element-plus/theme-chalk/dark/css-vars.css"

import "@/assets/css/theme.css"
import router from "./router"
import i18n from "./language/index"

import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"

// const pinia = createPinia();
const app = createApp(App)

// sentry 前端监控
// import * as Sentry from "@sentry/vue";
// Sentry.init({
//   app,
//   dsn: "https://49735d9d4e7109b83769ee8fae8de81c@o4509353422553088.ingest.us.sentry.io/4509353460695040",
//   // Setting this option to true will send default PII data to Sentry.
//   // For example, automatic IP address collection on events
//   sendDefaultPii: true
// });
// console.log(abx)
// if(import.meta.env.MODE==='production'){
// }

app.use(router).use(i18n).mount("#app")
