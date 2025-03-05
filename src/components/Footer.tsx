import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; Jose Izquierdo {year}</p>
      <a
        href="https://www.linkedin.com/in/jose-luis-izquierdo-hernandez-938064245/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://github.com/jocl0110" target="_blank">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="https://x.com/jocl0110" target="_blank">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </footer>
  );
}

export default Footer;
