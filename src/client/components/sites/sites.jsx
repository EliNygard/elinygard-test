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

const Sites = ({ list, loading, sitesLoaded }) => {
  const { search } = useLocation();
  const { sortedList, handleSortChange } = useSortByString(
    list,
    (site) => site.name
  );

  return (
    <Card heading={<Heading>List of oil sites</Heading>}>
      <Row>
        <Column width={200}>
          <Button
            label="Load sites"
            onClick={sitesLoaded}
            loading={loading}
            disabled={loading}
          />
          <Spacer />
          <SortOrderSelect onChange={handleSortChange} />
        </Column>
        <Column>
          <div className={styles.sitesList}>
            {loading && !sortedList && <LoadingOverlay />}
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
                          {site.oilRigs.map((oilRig) => (
                            <li key={oilRig}>{oilRig}</li>
                          ))}
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
  const { sites } = entities;

  return {
    loading: sites.loading,
    list: sites.list,
  };
};

const mapDispatchToProps = {
  sitesLoaded,
};

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(Sites);
export { ConnectedSites as Sites };
