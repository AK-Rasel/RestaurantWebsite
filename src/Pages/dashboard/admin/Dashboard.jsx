import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";
import { IoIosCart } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAdmin from "../../../hooks/useAdmin";

export const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: allData = {}, isLoading: isAllDataLoading } = useQuery({
    queryKey: ["allData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [], isLoading: isChartDataLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chart-status");
      return res.data;
    },
  });

  const piChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isAllDataLoading || isChartDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold uppercase">
        Hi, {user?.displayName}
      </h2>
      {isAdmin ? (
        <div>
          {/* stat */}
          <div className="grid text-center lg:text-start md:justify-center items-center  xl:w-[1000px] mx-auto">
            <div className="mt-10 mb-5 lg:w-[840px] stats stats-vertical lg:stats-horizontal shadow-lg">
              <div className="stat">
                <div className="stat-title">Revenue</div>
                <div className="stat-value flex gap-3 items-center">
                  <CiDollar className="stat-figure" />
                  {allData.sumRevenue}
                </div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>

              <div className="stat">
                <div className="stat-title">All Users</div>
                <div className="stat-value flex gap-3 items-center">
                  <FaUsers className="stat-figure" />
                  {allData.user}
                </div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">All Orders</div>
                <div className="stat-value flex gap-3 items-center">
                  <IoIosCart className="stat-figure" />
                  {allData.order}
                </div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
              </div>
              <div className="stat">
                <div className="stat-title">New Registers</div>
                <div className="stat-value flex gap-3 items-center">
                  <div className="stat-figure">
                    <MdMenuBook />
                  </div>
                  {allData.menuItems}
                </div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="mt-16 flex lg:flex-row md:flex-col justify-center items-center">
            {/* Area chart */}
            <div
              className="w-1/2 mx-auto"
              style={{ width: "100%", height: 300 }}
            >
              <ResponsiveContainer>
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="quantity"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Pie Chart */}
            <div
              className="w-1/2 mx-auto"
              style={{ width: "100%", height: 400 }}
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={piChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {piChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        "user"
      )}
    </div>
  );
};
