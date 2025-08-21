import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Accordion,
} from "@oliasoft-open-source/react-ui-library";
import { sitesLoaded } from "store/entities/sites/sites";
import styles from "./sites.module.less";
import { oilRigsLoaded } from "src/client/store/entities/oil-rigs/oil-rigs";

const Sites = ({ list, loading, sitesLoaded }) => {
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
        </Column>
        <Column>
          <div className={styles.sitesList}>
            {list.length ? (
              <ul>
                {list.map((site, i) => (
                  <li key={i}>
                    <h3>{site.name}</h3>
                    <div>Location: {site.country}</div>

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
