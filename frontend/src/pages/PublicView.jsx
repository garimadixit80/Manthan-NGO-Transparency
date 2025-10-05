import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { mockNGOs } from '@/lib/mockData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const PublicView = () => {
  const ngo = mockNGOs[0];

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
            <h1 className="text-lg sm:text-xl font-bold text-primary">HopeTrack</h1>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="sm:size-default">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{ngo.name}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Public Transparency Dashboard</p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">₹{ngo.totalReceived.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">{ngo.necessitiesPercent}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overhead</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{ngo.miscPercent}%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ value: { label: 'Percentage' } }} className="h-[300px]">
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
              <CardTitle>Expenditure Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ amount: { label: 'Amount', color: 'hsl(var(--chart-1))' } }} className="h-[300px]">
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
            <CardTitle>Category Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ngo.categories.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 sm:p-4 border rounded-lg"
                >
                  <span className="font-medium text-sm sm:text-base">{category.name}</span>
                  <span className="font-bold text-primary text-sm sm:text-base">
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
