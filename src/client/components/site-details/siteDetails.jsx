import React, { useEffect } from "react";
import {
  Card,
  Column,
  Grid,
  Heading,
  Row,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./siteDetails.module.less";
import { BackToSitesButton } from "src/client/components/shared/back-to-sites-button";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import LoadingOverlay from "../shared/loading-overlay";
import NotFound from "../shared/not-found/not-found";

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
    return <LoadingOverlay />;
  }

  if (!loading && !site) {
    return <NotFound page="Site" text="this site" />;
  }

  return (
    <>
      <BackToSitesButton />
      <Spacer />
      <Heading top>Oil Site: {site.name}</Heading>
      <Grid columns="1fr 1fr" gap>
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
    </>
  );
};

export default SiteDetails;
