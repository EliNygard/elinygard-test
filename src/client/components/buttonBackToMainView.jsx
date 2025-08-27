import { Button } from "@oliasoft-open-source/react-ui-library";
import { Link, useLocation } from "react-router-dom";

export const ButtonBackToMainView = () => {
  const location = useLocation();
  const to = location.search ? { pathname: "/", search: location.search } : "/";
  return (
    <Link to={to}>
      <Button label="Go back to the oil site list"></Button>
    </Link>
  );
};
