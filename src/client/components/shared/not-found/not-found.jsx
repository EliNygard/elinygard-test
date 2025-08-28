import { Flex } from "@oliasoft-open-source/react-ui-library";
import { BackToSitesButton } from "../back-to-sites-button";
import styles from "./not-found.module.less";

const NotFound = ({ page, text }) => {
  return (
    <Flex justifyContent="center">
      <section className={styles.centerText}>
        <h1>{page} not found</h1>
        <p>Unfortunately we could not find {text}.</p>
        <BackToSitesButton />
      </section>
    </Flex>
  );
};

export default NotFound;
