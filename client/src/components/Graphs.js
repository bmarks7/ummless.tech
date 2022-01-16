import React, { Component } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "../Styles/Graphs.scss";

const data = [];
for (let num = 0; num <= 30; num++) {
  data.push({
    speech: num,
    value: 1 + Math.random(),
  });
}

const data2 = [];
for (let num = 0; num <= 30; num++) {
  data2.push({
    speech: num,
    value2: 1 + Math.random(),
  });
}

const data3 = [];
for (let num = 0; num <= 30; num++) {
  data3.push({
    speech: num,
    value3: 1 + Math.random(),
  });
}

const data4 = [];
for (let num = 0; num <= 30; num++) {
  data4.push({
    speech: num,
    value4: 1 + Math.random(),
  });
}

export default class Graph extends Component {
  render() {
    return (
      <div className="Graphs">
        <p className="Graphs__header">Filler Words / min</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="value" stroke="#FFFFFF" />
            <CartesianGrid stroke="#FFFFFF" />
            <XAxis dataKey="speech" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
          </LineChart>
        </ResponsiveContainer>

        <p className="Graphs__header">Speaking Speed</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={400} height={400} data={data2}>
            <Line type="monotone" dataKey="value2" stroke="#FFFFFF" />
            <CartesianGrid stroke="#FFFFFF" />
            <XAxis dataKey="speech" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
          </LineChart>
        </ResponsiveContainer>

        <p className="Graphs__header">Average Sentiment</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={400} height={400} data={data3}>
            <Line type="monotone" dataKey="value3" stroke="#FFFFFF" />
            <CartesianGrid stroke="#FFFFFF" />
            <XAxis dataKey="speech" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
          </LineChart>
        </ResponsiveContainer>

        <p className="Graphs__header">Score</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={400} height={400} data={data4}>
            <Line type="monotone" dataKey="value4" stroke="#FFFFFF" />
            <CartesianGrid stroke="#FFFFFF" />
            <XAxis dataKey="speech" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
