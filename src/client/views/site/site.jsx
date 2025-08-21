import {
  Button,
  Card,
  Column,
  Flex,
  Grid,
  Heading,
  Loader,
  Page,
  Row,
} from "@oliasoft-open-source/react-ui-library";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sites } from "src/client/components/sites/sites";
import styles from "./site.module.less";
import React from "react";
import { ButtonBackToMainView } from "src/client/components/buttonBackToMainView";

// Improvements: 
// - Refactor site to separate component and keep page file clean

export const SitePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.entities.sites);

  const site = list?.find((s) => String(s.id) === String(id));

  if (loading && !site) {
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
  }

  if (!site) {
    return (
      <Page left={0}>
        <Flex justifyContent="center">
          <section className={styles.centerText}>
            <h1>Oil site not found</h1>
            <p>Unfortunately we could not find this oil site.</p>
            <ButtonBackToMainView />
          </section>
        </Flex>
      </Page>
    );
  }

  return (
    <Page left={0}>
      <ButtonBackToMainView />
      <Heading top>{site.name}</Heading>

      <Grid columns="1fr 1fr">
        <React.Fragment key=".0">
          <Card>
            <p>Country: {site.country}</p>
            <p>Id: {site.id}</p>
          </Card>
          <Card>
            <p>Oil Rigs at this site</p>
            {site.oilRigs && site.oilRigs.length > 0 ? (
              site.oilRigs.map((rig) => (
                <Row key={rig} spacing={0}>
                  <Column padding width="100%">
                    {rig}
                  </Column>
                </Row>
              ))
            ) : (
              <p>There are no oil rigs at this site.</p>
            )}
          </Card>
        </React.Fragment>
      </Grid>
    </Page>
  );
};
