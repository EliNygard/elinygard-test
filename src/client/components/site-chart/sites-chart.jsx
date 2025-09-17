import React from "react";
import {
  Button,
  Card,
  Column,
  Heading,
  Row,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { connect } from "react-redux";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import LoadingOverlay from "../shared/loading-overlay";
import { oilRigsLoaded } from "src/client/store/entities/oil-rigs/oil-rigs";

const SitesChart = ({ listSites, loadingSites, sitesLoaded, listOilRigs }) => {
  // add validation check: only display number of oil rigs that are a match with listOilRigs (Statfjord should have 4, not 5 rigs)
  // filter out id's that match id's from the listOilRigs.

  return (
    <>
      <Card heading={<Heading>Chart of oil rigs on sites</Heading>}>
        <Row>
          {/* <Column width={200}> */}
          {/* <Button
              label="Load sites"
              onClick={sitesLoaded}
              loading={loading}
              disabled={loading}
            /> */}
          {/* </Column> */}
          <Column>
            <div style={{ width: "100%", height: 360 }}>
              {loadingSites && !listSites && <LoadingOverlay />}
              {!loadingSites && listSites.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={listSites}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="oilRigs.length"
                      name="Number of oil rigs on site"
                      fill="var(--color-neutral-350)"
                      activeBar={
                        <Rectangle
                          fill="var(--color-primary-350)"
                          stroke="var(--color-primary-350)"
                        />
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <em>None loaded</em>
              )}
            </div>
          </Column>
        </Row>
      </Card>
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

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(SitesChart);
export { ConnectedSites as SitesChart };
