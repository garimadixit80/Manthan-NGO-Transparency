import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { mockNGOs } from "@/lib/mockData";
import Chart from "react-apexcharts";
import ThemeSelector from "../components/ui/ThemeSelector";

const PublicView = () => {
  const ngo = mockNGOs[0];
  const [theme, setTheme] = useState("light");

  const chartColors =
    theme === "dark"
      ? ["#facc15", "#38bdf8", "#f472b6"]
      : ["#3b82f6", "#9333ea", "#f97316"];

  const allocationData = [
    { name: "Necessities", value: ngo.necessitiesPercent },
    { name: "Miscellaneous", value: ngo.miscPercent },
  ];

  const allocationChartOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false },
      background: "transparent",
    },
    labels: allocationData.map((d) => d.name),
    colors: chartColors,
    legend: {
      position: "bottom",
      labels: { colors: theme === "dark" ? "#fff" : "#000" },
    },
    dataLabels: { enabled: true, style: { colors: ["#fff"] } },
    theme: { mode: theme },
  };
  const allocationChartSeries = allocationData.map((d) => d.value);

  const expenditureChartOptions = {
    chart: { type: "bar", toolbar: { show: false }, background: "transparent" },
    plotOptions: { bar: { distributed: true, borderRadius: 6 } },
    colors: chartColors,
    xaxis: {
      categories: ngo.categories.map((c) => c.name),
      labels: {
        style: {
          colors: Array(ngo.categories.length).fill(
            theme === "dark" ? "#fff" : "#000"
          ),
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `₹${val.toLocaleString()}`,
        style: { colors: [theme === "dark" ? "#fff" : "#000"] },
      },
    },
    dataLabels: { enabled: true },
    theme: { mode: theme },
  };
  const expenditureChartSeries = [
    { name: "Amount", data: ngo.categories.map((c) => c.amount) },
  ];

  return (
    <div
      className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-base-200 text-black"} min-h-screen`}
    >
      {/* Header */}
      <header
        className={`${theme === "dark" ? "bg-gray-800 text-white shadow-lg" : "bg-base-100 shadow-md"} sticky top-0 z-50`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart
              className={`${theme === "dark" ? "text-yellow-400" : "text-primary"} h-5 w-5 sm:h-6 sm:w-6`}
            />
            <h1
              className={`${theme === "dark" ? "text-yellow-400" : "text-primary"} text-lg sm:text-xl font-bold`}
            >
              HopeTrack
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="sm:size-default">
                Back to Home
              </Button>
            </Link>
            <ThemeSelector currentTheme={theme} onChange={setTheme} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* NGO Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-1">{ngo.name}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Public Transparency Dashboard
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-8">
          {[
            {
              title: "Total Funds",
              value: `₹${ngo.totalReceived.toLocaleString()}`,
            },
            { title: "Program Spending", value: `${ngo.necessitiesPercent}%` },
            { title: "Overhead", value: `${ngo.miscPercent}%` },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className={`hover:shadow-xl transition-shadow rounded-xl p-4 ${theme === "dark" ? "bg-gray-800 border-none" : "bg-base-100 border"}`}
            >
              <CardHeader>
                <CardTitle>{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`${theme === "dark" ? "text-white" : "text-primary"} text-3xl font-bold`}
                >
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card
            className={`hover:shadow-xl transition-shadow rounded-xl p-4 ${theme === "dark" ? "bg-gray-800 border-none" : "bg-base-100 border"}`}
          >
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={allocationChartOptions}
                series={allocationChartSeries}
                type="donut"
                height={300}
              />
            </CardContent>
          </Card>
          <Card
            className={`hover:shadow-xl transition-shadow rounded-xl p-4 ${theme === "dark" ? "bg-gray-800 border-none" : "bg-base-100 border"}`}
          >
            <CardHeader>
              <CardTitle>Expenditure Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={expenditureChartOptions}
                series={expenditureChartSeries}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </div>

        {/* Category Details */}
        <Card
          className={`hover:shadow-xl transition-shadow rounded-xl p-4 ${theme === "dark" ? "bg-gray-800 border-none" : "bg-base-100 border"}`}
        >
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ngo.categories.map((category, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg border ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-base-200"} transition`}
                >
                  <span
                    className={`${theme === "dark" ? "text-white" : "text-base-content"}`}
                  >
                    {category.name}
                  </span>
                  <span
                    className={`${theme === "dark" ? "text-white" : "text-primary"} font-bold`}
                  >
                    ₹{category.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PublicView;
