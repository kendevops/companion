import React from "react";
import {
  BarChart,
  Bar,
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
import { Eye, TrendingUp, DollarSign, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data types
interface ServiceStat {
  id: string;
  title: string;
  views: number;
  bookings: number;
  revenue: number;
  completionRate: number;
}

interface CategoryStat {
  name: string;
  value: number;
}

interface MonthlyData {
  month: string;
  bookings: number;
  revenue: number;
}

interface ServiceAnalyticsProps {
  serviceStats: ServiceStat[];
}

const ServiceAnalytics: React.FC<ServiceAnalyticsProps> = ({
  serviceStats,
}) => {
  // Total stats
  const totalViews = serviceStats.reduce(
    (sum, service) => sum + service.views,
    0
  );
  const totalBookings = serviceStats.reduce(
    (sum, service) => sum + service.bookings,
    0
  );
  const totalRevenue = serviceStats.reduce(
    (sum, service) => sum + service.revenue,
    0
  );
  const averageCompletionRate = Math.round(
    serviceStats.reduce((sum, service) => sum + service.completionRate, 0) /
      serviceStats.length
  );

  // Prepare category distribution data
  const categoryData: CategoryStat[] = [
    { name: "Dining & Food", value: 35 },
    { name: "Travel & Experiences", value: 25 },
    { name: "Fashion & Style", value: 20 },
    { name: "Other", value: 20 },
  ];

  // Prepare monthly data
  const monthlyData: MonthlyData[] = [
    { month: "Jan", bookings: 12, revenue: 1800 },
    { month: "Feb", bookings: 18, revenue: 2700 },
    { month: "Mar", bookings: 15, revenue: 2250 },
    { month: "Apr", bookings: 20, revenue: 3000 },
    { month: "May", bookings: 22, revenue: 3300 },
    { month: "Jun", bookings: 25, revenue: 3750 },
  ];

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Views
                </p>
                <h3 className="text-2xl font-bold mt-1">{totalViews}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Bookings
                </p>
                <h3 className="text-2xl font-bold mt-1">{totalBookings}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold mt-1">${totalRevenue}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completion Rate
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {averageCompletionRate}%
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>
            Track your service performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bookings">
            <TabsList className="mb-4">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} bookings`, "Bookings"]}
                  />
                  <Bar dataKey="bookings" fill="#4169F0" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="revenue" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="categories" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Service Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>
            Individual performance metrics for each of your services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Service</th>
                  <th className="text-right py-3 px-4">Views</th>
                  <th className="text-right py-3 px-4">Bookings</th>
                  <th className="text-right py-3 px-4">Revenue</th>
                  <th className="text-right py-3 px-4">Completion</th>
                </tr>
              </thead>
              <tbody>
                {serviceStats.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{service.title}</td>
                    <td className="text-right py-3 px-4">{service.views}</td>
                    <td className="text-right py-3 px-4">{service.bookings}</td>
                    <td className="text-right py-3 px-4">${service.revenue}</td>
                    <td className="text-right py-3 px-4">
                      {service.completionRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceAnalytics;
