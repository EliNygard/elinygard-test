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
import { useDispatch, useSelector } from "react-redux";
import styles from "./site-details.module.less";
import { BackToSitesButton } from "src/client/components/shared/back-to-sites-button";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import LoadingOverlay from "../shared/loading-overlay";
import NotFound from "../shared/not-found/not-found";
import { oilRigsLoaded } from "src/client/store/entities/oil-rigs/oil-rigs";

const SiteDetails = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list: sites, loading: sitesLoading } = useSelector(
    (s) => s.entities.sites
  );
  const { list: oilRigs, loading: oilRigsLoading } = useSelector(
    (s) => s.entities.oilRigs
  );

  useEffect(() => {
    if (!sites || sites.length === 0) {
      dispatch(sitesLoaded());
    }
    if (!oilRigs || oilRigs.length === 0) {
      dispatch(oilRigsLoaded());
    }
  }, [sites?.length, oilRigs?.length, dispatch]);

  const site = sites?.find((s) => String(s.id) === String(id));

  const oilRigsOnSite = useMemo(() => {
    if (!site || !oilRigs?.length) return [];
    const byId = new Map(oilRigs.map((r) => [String(r.id), r]));
    const byName = new Map(
      oilRigs.map((r) => [String((r.name || "").toLowerCase()), r])
    );

    return (site.oilRigs || []).map((token) => {
      const key = String(token);
      return (
        byId.get(key) ||
        byName.get(key.toLocaleLowerCase()) || {
          id: key,
          name: "Unknown",
          manufacturer: "Unknown",
        }
      );
    });
  }, [site, oilRigs]);

  if (sitesLoading || oilRigsLoading) {
    return <LoadingOverlay />;
  }

  if (!sitesLoading && !site) {
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
              {oilRigsOnSite && oilRigsOnSite.length > 0 ? (
                oilRigsOnSite.map((rig) => (
                  <li key={rig.id}>
                    <Card heading={`Name: ${rig.name}`}>
                      <p>Manufacturer: {rig.manufacturer}</p>
                      <p>Id: {rig.id}</p>
                    </Card>
                  </li>
                ))
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

export default SiteDetails;
