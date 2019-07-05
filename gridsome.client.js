import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(faGithub, faTwitter, faLinkedin);

export default function(Vue) {
  Vue.component("font-awesome", FontAwesomeIcon);
}
