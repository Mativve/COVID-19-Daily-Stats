import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSyncAlt);
library.add(faEye);
library.add(faEyeSlash);

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.mount('#app');