import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Select,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { oilRigsLoaded } from "store/entities/oil-rigs/oil-rigs";
import styles from "./oil-rigs.module.less";
import { useSortByString } from "src/client/hooks/use-sort-by-string";
import { SortOrderSelect } from "../shared/sort-order-select";
import LoadingOverlay from "../shared/loading-overlay";
import { sitesLoaded } from "src/client/store/entities/sites/sites";

const OilRigs = ({ listOilRigs, loading, oilRigsLoaded, listSites }) => {
  const { order, sortedList, handleSortChange } = useSortByString(
    listOilRigs,
    (site) => site.name
  );
  console.log(listOilRigs);
  console.log(listSites);

  return (
    <Card heading={<Heading>List of oil rigs</Heading>}>
      <Row>
        <Column width={200}>
          {/* <Button
            label="Load oil rigs"
            onClick={oilRigsLoaded}
            loading={loading}
            disabled={loading}
          />
          <Spacer /> */}
          <SortOrderSelect onChange={handleSortChange} />
        </Column>
        <Column>
          <div className={styles.oilRigsList}>
            {loading && !sortedList && <LoadingOverlay />}
            {!sortedList && !loading && (
              <em>Could not load oil rigs. Please try again.</em>
            )}
            {sortedList.length ? (
              <ul>
                {sortedList.map((oilRig, i) => (
                  <li key={i}>
                    <Card
                      heading={`Name: ${oilRig.name}
                      `}
                    >
                      <p>Manufacturer: {oilRig.manufacturer}</p>
                      <p>Id number: {oilRig.id}</p>
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
  const { oilRigs, sites } = entities;
  return {
    loading: oilRigs.loading,
    listOilRigs: oilRigs.list,
    listSites: sites.list,
  };
};

const mapDispatchToProps = {
  oilRigsLoaded, sitesLoaded
};

const ConnectedOilRigs = connect(mapStateToProps, mapDispatchToProps)(OilRigs);
export { ConnectedOilRigs as OilRigs };
