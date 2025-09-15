import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Accordion,
  Select,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { sitesLoaded } from "store/entities/sites/sites";
import styles from "./sites.module.less";
import { useSortByString } from "src/client/hooks/use-sort-by-string";
import { SortOrderSelect } from "../shared/sort-order-select";
import LoadingOverlay from "../shared/loading-overlay";
import { oilRigsLoaded } from "src/client/store/entities/oil-rigs/oil-rigs";

const Sites = ({ listSites, loadingSites, sitesLoaded, listOilRigs }) => {
  const { search } = useLocation();
  const { sortedList, handleSortChange } = useSortByString(
    listSites,
    (site) => site.name
  );

  // get oil rigs for each site ✅
  // match oil rigs id's with the oil rigs for each site ✅
  // display the name of the oil rigs on each site

  console.log(listSites);
  console.log(listOilRigs);

  const rigsId = listOilRigs.map((rig) => rig.id);
  const rigName = listOilRigs.map((rig) => rig.name);
  console.log(rigName);

  const rigsAtSite = listSites.map((site) => site.oilRigs);
  console.log("rigs at site", rigsAtSite);
  rigsAtSite.forEach((rig) => {
    const match = rig.filter((id) => rigsId.includes(id));

    if (match) {
      console.log("MATCH:", "rig:", rig, "match:", match, "name:");
    } else {
      console.log("no match", "rig", rig);
    }
  });

  return (
    <Card heading={<Heading>List of oil sites</Heading>}>
      <Row>
        <Column width={200}>
          {/* <Button
            label="Load sites"
            onClick={sitesLoaded}
            loading={loadingSites}
            disabled={loadingSites}
          />
          <Spacer /> */}
          <SortOrderSelect onChange={handleSortChange} />
        </Column>
        <Column>
          <div className={styles.sitesList}>
            {loadingSites && !sortedList && <LoadingOverlay />}
            {!sortedList && !loading && (
              <em>Could not load sites. Please try again.</em>
            )}
            {sortedList.length ? (
              <ul>
                {sortedList.map((site) => (
                  <li key={site.id}>
                    <Card heading={`Name: ${site.name}`}>
                      <Link
                        to={{
                          pathname: `/site/${site.id}`,
                          search,
                        }}
                      >
                        <Button label="View Details about this site" small />
                      </Link>
                      <p>Country: {site.country}</p>
                      <p>Id number: {site.id}</p>
                      <Accordion
                        heading={<Heading>Oil rigs used on this site</Heading>}
                        managed
                      >
                        <ul>
                          {site.oilRigs.map((oilRig) => {
                            // console.log('oil rigs on site', oilRig);

                            return <li key={oilRig}>{oilRig}</li>;
                          })}
                        </ul>
                      </Accordion>
                    </Card>
                  </li>
                ))}
              </ul>
            ) : (
              <em>None loaded</em>
            )}
          </div>
        </Column>
      </Row>
    </Card>
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

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(Sites);
export { ConnectedSites as Sites };
