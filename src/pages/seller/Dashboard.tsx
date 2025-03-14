import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  ChevronRight,
  PlusCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PurchaseStatus } from "@/types";

// Mock data
const mockStats = {
  totalEarnings: 1250.0,
  totalRequests: 24,
  completedRequests: 18,
  activeServices: 5,
  profileViews: 189,
};

const mockRecentRequests = [
  {
    id: "req1",
    buyerName: "Alex Johnson",
    service: "Personal Shopping",
    amount: 150.0,
    status: PurchaseStatus.PENDING,
    date: "2025-03-10T14:30:00Z",
  },
  {
    id: "req2",
    buyerName: "Emma Davis",
    service: "Style Consultation",
    amount: 120.0,
    status: PurchaseStatus.ACCEPTED,
    date: "2025-03-09T11:20:00Z",
  },
  {
    id: "req3",
    buyerName: "Michael Smith",
    service: "Personal Shopping",
    amount: 150.0,
    status: PurchaseStatus.COMPLETED,
    date: "2025-03-08T16:45:00Z",
  },
  {
    id: "req4",
    buyerName: "Olivia Brown",
    service: "Personal Shopping + Style Consultation",
    amount: 270.0,
    status: PurchaseStatus.COMPLETED,
    date: "2025-03-07T09:15:00Z",
  },
];

const SellerDashboard: React.FC = () => {
  // Calculate completion rate
  const completionRate = Math.round(
    (mockStats.completedRequests / mockStats.totalRequests) * 100
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your account.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Earnings
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  ${mockStats.totalEarnings.toFixed(2)}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Service Requests
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {mockStats.totalRequests}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
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
                <h3 className="text-2xl font-bold mt-1">{completionRate}%</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <Progress value={completionRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Profile Views
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {mockStats.profileViews}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>
              You have{" "}
              {
                mockRecentRequests.filter(
                  (r) => r.status === PurchaseStatus.PENDING
                ).length
              }{" "}
              pending requests
            </CardDescription>
          </div>
          <Link to="/seller/requests">
            <Button variant="ghost" className="text-sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRecentRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.buyerName}
                  </TableCell>
                  <TableCell>{request.service}</TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === PurchaseStatus.PENDING
                          ? "outline"
                          : request.status === PurchaseStatus.ACCEPTED
                          ? "secondary"
                          : request.status === PurchaseStatus.COMPLETED
                          ? "default"
                          : "destructive"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(request.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Your sales and earnings over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center">
              <BarChart className="h-16 w-16 text-muted-foreground opacity-50" />
              <p className="mt-2 text-sm text-muted-foreground">
                Performance chart will appear here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerDashboard;
