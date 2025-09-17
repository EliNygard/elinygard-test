import React, { useEffect, useMemo } from "react";
import {
  Card,
  Column,
  Grid,
  Heading,
  Row,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import styles from "./site-details.module.less";
import { BackToSitesButton } from "src/client/components/shared/back-to-sites-button";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import LoadingOverlay from "../shared/loading-overlay";
import NotFound from "../shared/not-found/not-found";
import { oilRigsLoaded } from "src/client/store/entities/oil-rigs/oil-rigs";

const SiteDetails = ({
  listSites,
  loadingSites,
  sitesLoaded,
  listOilRigs,
  loadingOilRigs,
}) => {
  const { id } = useParams();

  const site = listSites.find((s) => s.id === id);

  if (loadingSites || loadingOilRigs) {
    return <LoadingOverlay />;
  }

  if (!loadingSites && !site) {
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
            <Heading>Oil Rigs at this site</Heading>
            <Spacer />
            <ul className={styles.oilRigsList}>
              {site.oilRigs && site.oilRigs.length > 0 ? (
                site.oilRigs.map((rigId) => {
                  const rig = listOilRigs.find((rig) => rig.id === rigId);
                  if (!rig) return;
                  return (
                    <li key={rig.id}>
                      <Card heading={`Name: ${rig.name}`}>
                        <p>Manufacturer: {rig.manufacturer}</p>
                        <p>Id: {rig.id} </p>
                      </Card>
                    </li>
                  );
                })
              ) : (
                <p>There are no oil rigs at this site.</p>
              )}
            </ul>
          </Card>
        </React.Fragment>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ entities }) => {
  const { sites, oilRigs } = entities;

  return {
    loadingSites: sites.loading,
    listSites: sites.list,
    loadingOilRigs: oilRigs.loading,
    listOilRigs: oilRigs.list,
  };
};

const mapDispatchToProps = {
  sitesLoaded,
  oilRigsLoaded,
};

const ConnectedSiteDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteDetails);

export { ConnectedSiteDetails as SiteDetails };
