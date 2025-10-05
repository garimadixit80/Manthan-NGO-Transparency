import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, LogOut } from 'lucide-react';
import { mockNGOs, mockDonations } from '@/lib/mockData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const ngo = mockNGOs[0];
  const ngoDonations = mockDonations.filter((d) => d.ngoId === ngo.id);

  const allocationData = [
    { name: 'Necessities', value: ngo.necessitiesPercent },
    { name: 'Miscellaneous', value: ngo.miscPercent },
  ];

  const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold text-primary">HopeTrack Admin</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">{ngo.name}</span>
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
              <CardTitle>Total Received</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">₹{ngo.totalReceived.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Necessities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">{ngo.necessitiesPercent}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{new Set(ngoDonations.map((d) => d.userId)).size}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ value: { label: 'Percentage' } }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
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
              <CardTitle>Expenditure by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ amount: { label: 'Amount', color: 'hsl(var(--chart-1))' } }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ngo.categories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ngoDonations.slice(0, 5).map((donation) => (
                <div
                  key={donation.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center p-3 sm:p-4 border rounded-lg gap-2"
                >
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Donation #{donation.id}</p>
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

export default AdminDashboard;
