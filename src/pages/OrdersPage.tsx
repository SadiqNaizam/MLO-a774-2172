import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const sampleOrders = [
  { id: 'ORD001', customer: 'Liam Johnson', email: 'liam@example.com', date: '2023-10-26', status: 'Delivered', total: '$250.00', items: 3 },
  { id: 'ORD002', customer: 'Olivia Smith', email: 'olivia@example.com', date: '2023-10-25', status: 'Shipped', total: '$150.75', items: 1 },
  { id: 'ORD003', customer: 'Noah Williams', email: 'noah@example.com', date: '2023-10-24', status: 'Processing', total: '$350.00', items: 5 },
  { id: 'ORD004', customer: 'Emma Brown', email: 'emma@example.com', date: '2023-10-24', status: 'Delivered', total: '$450.50', items: 2 },
  { id: 'ORD005', customer: 'Ava Jones', email: 'ava@example.com', date: '2023-10-23', status: 'Cancelled', total: '$75.00', items: 1 },
];

type OrderStatus = "Delivered" | "Processing" | "Shipped" | "Cancelled";

const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case 'Delivered': return 'default'; // Greenish in default Badge style
    case 'Processing': return 'secondary'; // Bluish/Grayish
    case 'Shipped': return 'outline'; // Yellowish/Orangeish, but outline is neutral
    case 'Cancelled': return 'destructive'; // Reddish
    default: return 'default';
  }
};


const OrdersPage = () => {
  console.log('OrdersPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const filteredOrders = sampleOrders.filter(order =>
    (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status.toLowerCase() === statusFilter)
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar isInitiallyCollapsed={false} />
      <div className="flex flex-col flex-1 ml-60">
        <Header userName="Admin" userAvatarUrl="https://ui.shadcn.com/avatars/01.png" onSearch={setSearchTerm} />
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
                <Button>Export CSV</Button>
              </div>

              <Card>
                <CardHeader className="px-7">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Filter by customer or Order ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Items</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrders.length > 0 ? currentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>{order.customer}</div>
                            <div className="text-xs text-muted-foreground">{order.email}</div>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(order.status as OrderStatus)}>{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{order.total}</TableCell>
                          <TableCell className="text-center">{order.items}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete Order</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No orders found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="border-t px-7 py-4">
                 <div className="text-xs text-muted-foreground">
                    Showing <strong>{currentOrders.length > 0 ? (currentPage - 1) * ordersPerPage + 1 : 0}</strong> to <strong>{Math.min(currentPage * ordersPerPage, filteredOrders.length)}</strong> of <strong>{filteredOrders.length}</strong> orders
                  </div>
                  {totalPages > 1 && (
                    <Pagination className="ml-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} disabled={currentPage === 1} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                           <PaginationItem key={i}> <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>{i + 1}</PaginationLink></PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} disabled={currentPage === totalPages} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </CardFooter>
              </Card>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;