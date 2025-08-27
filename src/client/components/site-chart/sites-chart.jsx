import { Card, Heading, Spacer } from "@oliasoft-open-source/react-ui-library";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

const data = [
  {
    name: "Page A",
    Rigs: 3,
  },
  {
    name: "Page B",
    Rigs: 5,
  },
  {
    name: "Page C",
    Rigs: 7,
  },
  {
    name: "Page D",
    Rigs: 2,
  },
  {
    name: "Page E",
    Rigs: 1,
  },
  {
    name: "Page F",
    Rigs: 4,
  },
  {
    name: "Page G",
    Rigs: 6,
  },
];

const SitesChart = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.entities.sites);
  console.log(list);

  return (
    <>
      <Heading>Chart of oil rigs on sites</Heading>
      <Spacer />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Rigs"
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
    </>
  );
};

export default SitesChart;
