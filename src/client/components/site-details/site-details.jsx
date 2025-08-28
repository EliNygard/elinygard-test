import {
  Card,
  Column,
  Flex,
  Grid,
  Heading,
  Loader,
  Row,
  Spacer,
  Spinner,
} from "@oliasoft-open-source/react-ui-library";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./site-details.module.less";
import React, { useEffect } from "react";
import { BackToSitesButton } from "src/client/components/shared/back-to-sites-button";
import { sitesLoaded } from "src/client/store/entities/sites/sites";

const SiteDetails = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.entities.sites);

  useEffect(() => {
    if (!list || list.length === 0) {
      dispatch(sitesLoaded());
    }
  }, [list?.length, dispatch]);

  const site = list?.find((s) => String(s.id) === String(id));

  if (loading) {
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

  if (!loading && !site) {
    return (
      <Flex justifyContent="center">
        <section className={styles.centerText}>
          <h1>Oil site not found</h1>
          <p>Unfortunately we could not find this oil site.</p>
          <BackToSitesButton />
        </section>
      </Flex>
    );
  }

  return (
    <>
      <BackToSitesButton />
      <Spacer />
      <Card heading={<Heading top>Oil Site: {site.name}</Heading>}>
        <Grid columns="1fr 1fr" gap="1rem">
          <React.Fragment key=".0">
            <Card>
              <p>Country: {site.country}</p>
              <p>Id: {site.id}</p>
            </Card>
            <Card>
              <Heading>Oil Rigs at this site</Heading>
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
      </Card>
    </>
  );
};

export default SiteDetails;
