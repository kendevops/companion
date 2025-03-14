import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  DollarSign,
//   CheckCircle,
  AlertTriangle,
  ChevronRight,
//   TrendingUp,
  ClipboardList,
  ArrowUpRight,
//   ArrowDownRight,
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
import { PurchaseStatus, PaymentStatus } from "@/types";

// Mock data for the admin dashboard
const platformStats = {
  totalUsers: 456,
  newUsersToday: 12,
  totalSellers: 124,
  totalBuyers: 332,
  totalTransactions: 789,
  totalRevenue: 52450.75,
  pendingPayouts: 8750.25,
  transactionsToday: 23,
  completionRate: 94,
};

const recentTransactions = [
  {
    id: "tx1",
    buyer: "Alex Johnson",
    seller: "Sophia Reynolds",
    services: "Personal Shopping",
    amount: 150.0,
    fee: 15.0,
    status: PaymentStatus.COMPLETED,
    date: "2025-03-12T15:30:00Z",
  },
  {
    id: "tx2",
    buyer: "Emma Davis",
    seller: "Marcus Chen",
    services: "City Tour Guide",
    amount: 200.0,
    fee: 20.0,
    status: PaymentStatus.COMPLETED,
    date: "2025-03-12T13:45:00Z",
  },
  {
    id: "tx3",
    buyer: "Michael Smith",
    seller: "Elena Kim",
    services: "Language Tutoring",
    amount: 50.0,
    fee: 5.0,
    status: PaymentStatus.PENDING,
    date: "2025-03-12T11:20:00Z",
  },
  {
    id: "tx4",
    buyer: "Olivia Brown",
    seller: "James Wilson",
    services: "Personal Training",
    amount: 80.0,
    fee: 8.0,
    status: PaymentStatus.FAILED,
    date: "2025-03-12T09:15:00Z",
  },
];

const recentRequests = [
  {
    id: "req1",
    buyer: "Alex Johnson",
    seller: "Sophia Reynolds",
    service: "Personal Shopping",
    amount: 150.0,
    status: PurchaseStatus.PENDING,
    date: "2025-03-12T14:30:00Z",
  },
  {
    id: "req2",
    buyer: "Emma Davis",
    seller: "Marcus Chen",
    service: "City Tour Guide",
    amount: 200.0,
    status: PurchaseStatus.ACCEPTED,
    date: "2025-03-11T10:20:00Z",
  },
  {
    id: "req3",
    buyer: "Michael Smith",
    seller: "Elena Kim",
    service: "Language Tutoring",
    amount: 50.0,
    status: PurchaseStatus.COMPLETED,
    date: "2025-03-10T16:45:00Z",
  },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage your marketplace platform
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-bold mt-1">
                    ${platformStats.totalRevenue.toFixed(2)}
                  </h3>
                  <div className="flex items-center mb-1 text-green-600 text-xs font-semibold">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5.2%
                  </div>
                </div>
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
                  Total Users
                </p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-bold mt-1">
                    {platformStats.totalUsers}
                  </h3>
                  <div className="flex items-center mb-1 text-green-600 text-xs font-semibold">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.8%
                  </div>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Transactions
                </p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-bold mt-1">
                    {platformStats.totalTransactions}
                  </h3>
                  <div className="flex items-center mb-1 text-green-600 text-xs font-semibold">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8.4%
                  </div>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Payouts
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  ${platformStats.pendingPayouts.toFixed(2)}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>Breakdown of platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Sellers</p>
                  <p className="text-2xl font-bold">
                    {platformStats.totalSellers}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Buyers</p>
                  <p className="text-2xl font-bold">
                    {platformStats.totalBuyers}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">New Today</p>
                  <p className="text-2xl font-bold">
                    {platformStats.newUsersToday}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-muted-foreground">
                    Sellers vs. Buyers
                  </p>
                  <p className="text-sm font-medium">
                    {Math.round(
                      (platformStats.totalSellers / platformStats.totalUsers) *
                        100
                    )}
                    %
                  </p>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${
                        (platformStats.totalSellers /
                          platformStats.totalUsers) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full">
                    View All Users <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>
              Completion rate and transaction data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Completion Rate</p>
                  <p className="text-2xl font-bold">
                    {platformStats.completionRate}%
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Today's Transactions</p>
                  <p className="text-2xl font-bold">
                    {platformStats.transactionsToday}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-muted-foreground">
                    Service Completion
                  </p>
                  <p className="text-sm font-medium">
                    {platformStats.completionRate}%
                  </p>
                </div>
                <Progress
                  value={platformStats.completionRate}
                  className="h-3"
                />
              </div>

              <div className="pt-4">
                <Link to="/admin/transactions">
                  <Button variant="outline" className="w-full">
                    View All Transactions{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest platform transactions</CardDescription>
          </div>
          <Link to="/admin/payments">
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
                <TableHead>Seller</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.buyer}</TableCell>
                  <TableCell>{tx.seller}</TableCell>
                  <TableCell>{tx.services}</TableCell>
                  <TableCell>${tx.amount.toFixed(2)}</TableCell>
                  <TableCell>${tx.fee.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === PaymentStatus.COMPLETED
                          ? "default"
                          : tx.status === PaymentStatus.PENDING
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(tx.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Service Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Service Requests</CardTitle>
            <CardDescription>
              Latest service requests on the platform
            </CardDescription>
          </div>
          <Link to="/admin/requests">
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
                <TableHead>Seller</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.buyer}</TableCell>
                  <TableCell>{req.seller}</TableCell>
                  <TableCell>{req.service}</TableCell>
                  <TableCell>${req.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        req.status === PurchaseStatus.PENDING
                          ? "outline"
                          : req.status === PurchaseStatus.ACCEPTED
                          ? "secondary"
                          : req.status === PurchaseStatus.COMPLETED
                          ? "default"
                          : "destructive"
                      }
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(req.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
