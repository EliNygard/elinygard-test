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

const SitesChart = ({ list, loading, sitesLoaded }) => {
  return (
    <>
      <Card heading={<Heading>Chart of oil rigs on sites</Heading>}>
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
            <div style={{ width: "100%", height: 360 }}>
              {loading && !list && <LoadingOverlay />}
              {!loading && list.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={list}
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
  const { sites } = entities;

  return {
    loading: sites.loading,
    list: sites.list,
  };
};

const mapDispatchToProps = {
  sitesLoaded,
};

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(SitesChart);
export { ConnectedSites as SitesChart };
