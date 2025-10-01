import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, LogOut } from 'lucide-react';
import { mockDonations, mockLeaderboard } from '@/lib/mockData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/auth');
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
  }, [] as { name: string; value: number }[]);

  const COLORS = [
    'hsl(var(--chart-1))', 
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-3))', 
    'hsl(var(--chart-4))', 
    'hsl(var(--chart-5))'
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold text-primary">HopeTrack</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">Welcome, {user.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Donated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">₹{totalDonated.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">{userDonations.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NGOs Supported</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">
                {new Set(userDonations.map((d) => d.ngoId)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Donations by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: 'Amount',
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLeaderboard.slice(0, 5).map((leader) => (
                  <div
                    key={leader.rank}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{leader.rank}</span>
                      </div>
                      <span className="font-medium">{leader.name}</span>
                    </div>
                    <span className="text-sm font-semibold">
                      ₹{leader.totalDonations.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center p-3 sm:p-4 border rounded-lg gap-2"
                >
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{donation.ngoName}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{donation.category}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-bold text-primary text-sm sm:text-base">₹{donation.amount.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{donation.date}</p>
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
