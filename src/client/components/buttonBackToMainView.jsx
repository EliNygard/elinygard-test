import { Button } from "@oliasoft-open-source/react-ui-library";
import { Link } from "react-router-dom";

export const ButtonBackToMainView = () => {
  return (
    <Link to="/">
      <Button label="Go back to the oil site list"></Button>
    </Link>
  );
};
