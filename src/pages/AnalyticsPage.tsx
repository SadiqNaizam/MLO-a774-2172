import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DateRangePicker from '@/components/DateRangePicker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart, Pie, PieChart, Cell, Legend, Tooltip as RechartsTooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DateRange } from 'react-day-picker';

const monthlySalesData = [
  { month: 'Jan', sales: 4250, target: 4000 }, { month: 'Feb', sales: 3800, target: 3900 },
  { month: 'Mar', sales: 5100, target: 4500 }, { month: 'Apr', sales: 4700, target: 4600 },
  { month: 'May', sales: 5500, target: 5000 }, { month: 'Jun', sales: 6200, target: 5800 },
];
const salesChartConfig = { sales: { label: "Sales", color: "hsl(var(--chart-1))" }, target: { label: "Target", color: "hsl(var(--chart-2))" } };

const trafficSourceData = [
  { name: 'Organic Search', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Direct', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Referral', value: 200, color: 'hsl(var(--chart-3))' },
  { name: 'Social Media', value: 278, color: 'hsl(var(--chart-4))' },
];
const trafficChartConfig = Object.fromEntries(trafficSourceData.map(item => [item.name, { label: item.name, color: item.color }]));


const AnalyticsPage = () => {
  console.log('AnalyticsPage loaded');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() -1, new Date().getDate()), // Default to last month
    to: new Date(),
  });
  const [selectedMetric, setSelectedMetric] = useState('sales_overview');

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    console.log("Analytics date range changed:", range);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar isInitiallyCollapsed={false} />
      <div className="flex flex-col flex-1 ml-60">
        <Header userName="Admin" userAvatarUrl="https://ui.shadcn.com/avatars/01.png" />
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <DateRangePicker
                    initialDateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                    className="w-full sm:w-[280px]"
                  />
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales_overview">Sales Overview</SelectItem>
                      <SelectItem value="customer_behavior">Customer Behavior</SelectItem>
                      <SelectItem value="traffic_sources">Traffic Sources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Conditional rendering of charts based on selectedMetric or show multiple */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Sales vs Target</CardTitle>
                    <CardDescription>
                      {dateRange?.from && dateRange.to
                        ? `Data from ${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()}`
                        : 'Overall performance'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] pl-2">
                     <ChartContainer config={salesChartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={monthlySalesData} margin={{ top: 5, right: 20, bottom: 5, left: -15 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value/1000}k`} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                            <Bar dataKey="target" fill="var(--color-target)" radius={4} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Distribution of website traffic.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                     <ChartContainer config={trafficChartConfig} className="w-full h-full aspect-square">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <RechartsTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
                            <Pie data={trafficSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                              {trafficSourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </div>
              {/* Add more cards/charts as needed */}
               <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition Rate</CardTitle>
                    <CardDescription>New customers over the selected period.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] pl-2">
                     <ChartContainer config={{ newCustomers: { label: "New Customers", color: "hsl(var(--chart-3))" } }} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={monthlySalesData.map(d => ({...d, newCustomers: Math.floor(Math.random()*500)+50}))}  margin={{ top: 5, right: 20, bottom: 5, left: -15 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Line type="monotone" dataKey="newCustomers" stroke="var(--color-newCustomers)" strokeWidth={2} dot={true} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                  </CardContent>
                </Card>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;