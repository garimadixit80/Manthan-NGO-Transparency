import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, LogOut } from "lucide-react";
import { mockNGOs, mockDonations } from "@/lib/mockData";
import Chart from "react-apexcharts";
import ThemeSelector from "../components/ui/ThemeSelector";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  const ngo = mockNGOs[0];
  const ngoDonations = mockDonations.filter((d) => d.ngoId === ngo.id);

  const allocationData = [
    { name: "Necessities", value: ngo.necessitiesPercent },
    { name: "Miscellaneous", value: ngo.miscPercent },
  ];

  const categories = ngo.categories;

  const chartColors =
    theme === "dark"
      ? ["#facc15", "#38bdf8", "#f472b6"]
      : ["#3b82f6", "#9333ea", "#f97316"];

  // ApexCharts options
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
    plotOptions: {
      bar: { distributed: true, borderRadius: 6, horizontal: false },
    },
    colors: chartColors,
    xaxis: {
      categories: categories.map((c) => c.name),
      labels: {
        style: {
          colors: Array(categories.length).fill(
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
    { name: "Amount", data: categories.map((c) => c.amount) },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-background text-black"}`}
    >
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold text-primary">
              HopeTrack Admin
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
              {ngo.name}
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
            <ThemeSelector currentTheme={theme} onChange={setTheme} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
          <Card
            className={`bg-base-100 dark:bg-gray-800 border-none rounded-xl hover:shadow-xl transition`}
          >
            <CardHeader>
              <CardTitle>Total Received</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary dark:text-white">
                ₹{ngo.totalReceived.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card
            className={`bg-base-100 dark:bg-gray-800 border-none rounded-xl hover:shadow-xl transition`}
          >
            <CardHeader>
              <CardTitle>Necessities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary dark:text-white">
                {ngo.necessitiesPercent}%
              </p>
            </CardContent>
          </Card>

          <Card
            className={`bg-base-100 dark:bg-gray-800 border-none rounded-xl hover:shadow-xl transition`}
          >
            <CardHeader>
              <CardTitle>Total Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent dark:text-white">
                {new Set(ngoDonations.map((d) => d.userId)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 mb-6 sm:mb-8">
          <Card
            className={`bg-base-100 dark:bg-gray-800 border-none rounded-xl hover:shadow-xl transition`}
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
            className={`bg-base-100 dark:bg-gray-800 border-none rounded-xl hover:shadow-xl transition`}
          >
            <CardHeader>
              <CardTitle>Expenditure by Category</CardTitle>
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

        {/* Recent Donations */}
        <Card
          className={`bg-base-100 dark:bg-gray-800 border-none rounded-xl hover:shadow-xl transition`}
        >
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ngoDonations.slice(0, 5).map((donation) => (
                <div
                  key={donation.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-lg bg-base-200 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-semibold text-sm sm:text-base dark:text-white">
                      Donation #{donation.id}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300">
                      {donation.category}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-bold text-primary dark:text-white text-sm sm:text-base">
                      ₹{donation.amount.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300">
                      {donation.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
