import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, LogOut } from "lucide-react";
import { mockDonations, mockLeaderboard } from "@/lib/mockData";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "user") {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  const userDonations = mockDonations.filter((d) => d.userId === user.id);
  const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);

  const categoryData = userDonations.reduce((acc, donation) => {
    const existing = acc.find((item) => item.name === donation.category);
    if (existing) {
      existing.value += donation.amount;
    } else {
      acc.push({ name: donation.category, value: donation.amount });
    }
    return acc;
  }, []);

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 text-black dark:text-white">
      {/* Header */}
      <header className="border-b dark:border-gray-700 bg-base-100 dark:bg-gray-800 shadow-md dark:shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary dark:text-yellow-400" />
            <h1 className="text-lg sm:text-xl font-bold text-primary dark:text-yellow-400">
              HopeTrack
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300 hidden sm:inline">
              Welcome, {user.name}
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-8">
          {[
            {
              title: "Total Donated",
              value: `₹${totalDonated.toLocaleString()}`,
              color: "text-primary",
            },
            {
              title: "Total Donations",
              value: `${userDonations.length}`,
              color: "text-secondary",
            },
            {
              title: "NGOs Supported",
              value: `${new Set(userDonations.map((d) => d.ngoId)).size}`,
              color: "text-accent",
            },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="hover:shadow-2xl transition-shadow rounded-xl p-4 bg-base-100 dark:bg-gray-800 border-none"
            >
              <CardHeader>
                <CardTitle className="text-base dark:text-gray-200">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-3xl font-bold ${stat.color} dark:text-white`}
                >
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pie Chart & Leaderboard */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="hover:shadow-2xl transition-shadow rounded-xl p-4 bg-base-100 dark:bg-gray-800 border-none">
            <CardHeader>
              <CardTitle>Donations by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ value: { label: "Amount" } }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-shadow rounded-xl p-4 bg-base-100 dark:bg-gray-800 border-none">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLeaderboard.slice(0, 5).map((leader) => (
                  <div
                    key={leader.rank}
                    className="flex items-center justify-between p-3 rounded-lg bg-base-200 dark:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 dark:bg-yellow-400/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary dark:text-yellow-400">
                          {leader.rank}
                        </span>
                      </div>
                      <span className="font-medium dark:text-gray-200">
                        {leader.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold dark:text-white">
                      ₹{leader.totalDonations.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card className="hover:shadow-2xl transition-shadow rounded-xl p-4 bg-base-100 dark:bg-gray-800 border-none">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-lg gap-2 bg-base-200 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-semibold text-sm sm:text-base dark:text-gray-200">
                      {donation.ngoName}
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

export default UserDashboard;
