import { Loader, Spinner } from "@oliasoft-open-source/react-ui-library";

const LoadingOverlay = () => {
  return (
    <Loader
      height="100%"
      testId="story-default-spinner"
      text="Loading..."
      theme="white"
      width="100%"
    >
      <Spinner dark />
    </Loader>
  );
};

export default LoadingOverlay;
