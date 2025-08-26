import { Heading, Page, Spacer } from "@oliasoft-open-source/react-ui-library";
import { OilRigs } from "src/client/components/oil-rigs/oil-rigs";

export const RigsPage = ({}) => {
  return (
    <Page left={0}>
      <Heading top>Oil Rigs</Heading>
      <Spacer />
      <OilRigs />
    </Page>
  )
}