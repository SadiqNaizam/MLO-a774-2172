import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DataWidget from '@/components/DataWidget';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DollarSign, Users, CreditCard, Activity, ShoppingBag } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Feb', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Mar', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Apr', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'May', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Jun', sales: Math.floor(Math.random() * 5000) + 1000 },
];

const recentActivity = [
  { id: '1', user: 'Olivia Martin', activity: 'New order #ORD001', amount: '+$1,999.00', avatar: 'https://ui.shadcn.com/avatars/01.png' },
  { id: '2', user: 'Jackson Lee', activity: 'Product "Wireless Earbuds" low stock', amount: '', avatar: 'https://ui.shadcn.com/avatars/02.png' },
  { id: '3', user: 'Isabella Nguyen', activity: 'New customer registered', amount: '', avatar: 'https://ui.shadcn.com/avatars/03.png' },
  { id: '4', user: 'William Kim', activity: 'Order #ORD002 shipped', amount: '-$39.00', avatar: 'https://ui.shadcn.com/avatars/04.png' },
  { id: '5', user: 'Sofia Davis', activity: 'Support ticket #SUP005 closed', amount: '', avatar: 'https://ui.shadcn.com/avatars/05.png' },
];

const chartConfig = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
};

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar isInitiallyCollapsed={false} />
      <div className="flex flex-col flex-1 ml-60"> {/* ml-60 for expanded sidebar */}
        <Header userName="Admin" userAvatarUrl="https://ui.shadcn.com/avatars/01.png" />
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DataWidget
                  title="Total Revenue"
                  value="$45,231.89"
                  description="+20.1% from last month"
                  icon={DollarSign}
                  trend="up"
                  trendValue="+20.1%"
                />
                <DataWidget
                  title="New Customers"
                  value="+2350"
                  description="+180.1% from last month"
                  icon={Users}
                  trend="up"
                  trendValue="+180.1%"
                />
                <DataWidget
                  title="Active Orders"
                  value="120"
                  description="+19% from last month"
                  icon={ShoppingBag}
                  trend="down"
                  trendValue="+19%"
                />
                <DataWidget
                  title="Pending Issues"
                  value="12"
                  description="Open support tickets"
                  icon={Activity}
                  trend="neutral"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>Monthly sales performance.</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                          <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value/1000}k`} />
                          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                          <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={true} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and important notifications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Activity</TableHead>
                          <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentActivity.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <img src={activity.avatar} alt={activity.user} className="h-8 w-8 rounded-full mr-2" />
                                <span className="font-medium">{activity.user}</span>
                              </div>
                            </TableCell>
                            <TableCell>{activity.activity}</TableCell>
                            <TableCell className="text-right">{activity.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;