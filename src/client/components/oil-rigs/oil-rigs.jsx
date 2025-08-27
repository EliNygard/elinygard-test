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

const OilRigs = ({ list, loading, oilRigsLoaded }) => {
  const { order, sortedList, handleSortChange } = useSortByString(
    list,
    (site) => site.name
  );
  return (
    <Card heading={<Heading>List of oil rigs</Heading>}>
      <Row>
        <Column width={200}>
          <Button
            label="Load oil rigs"
            onClick={oilRigsLoaded}
            loading={loading}
            disabled={loading}
          />
          <Spacer />
          <SortOrderSelect onChange={handleSortChange} />
        </Column>
        <Column>
          <div className={styles.oilRigsList}>
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
  const { oilRigs } = entities;
  return {
    loading: oilRigs.loading,
    list: oilRigs.list,
  };
};

const mapDispatchToProps = {
  oilRigsLoaded,
};

const ConnectedOilRigs = connect(mapStateToProps, mapDispatchToProps)(OilRigs);
export { ConnectedOilRigs as OilRigs };
