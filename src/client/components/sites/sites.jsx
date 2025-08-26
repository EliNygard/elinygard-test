import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Accordion,
  Select,
} from "@oliasoft-open-source/react-ui-library";
import { sitesLoaded } from "store/entities/sites/sites";
import styles from "./sites.module.less";

const Sites = ({ list, loading, sitesLoaded }) => {
  const [sortOrder, setSortOrder] = useState("none");

  const handleSortChange = (event, ...rest) => {
    console.log("event.target.value:", event.target.value);
    const value = event.target.value;
    if (value === "asc" || value === "desc" || value === "none") {
      setSortOrder(value);
    }
  };

  const sortedList = useMemo(() => {
    if (!Array.isArray(list)) return [];
    if (sortOrder === "none") return list;

    const copyList = [...list];

    copyList.sort((a, b) =>
      (a.name ?? "").localeCompare(b.name ?? "", "nb", { sensitivity: "base" })
    );
    if (sortOrder === "desc") copyList.reverse();
    console.log(copyList);

    return copyList;
  }, [list, sortOrder]);

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
          <Select
            native
            onChange={handleSortChange}
            options={[
              {
                label: "Sort by name",
                type: "Heading",
              },
              {
                label: "A-Z",
                value: "asc",
              },
              {
                label: "Z-A",
                value: "desc",
              },
            ]}
          />
        </Column>
        <Column>
          <div className={styles.sitesList}>
            {sortedList.length ? (
              <ul>
                {sortedList.map((site, i) => (
                  <li key={i}>
                    <Card heading={`Name: ${site.name}`}>
                      <Link to={`/site/${site.id}`}>
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
