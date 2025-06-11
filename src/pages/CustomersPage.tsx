import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Mail, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const sampleCustomers = [
  { id: 'CUST001', name: 'Alex Green', email: 'alex.green@example.com', totalOrders: 5, lastOrderDate: '2023-10-15', totalSpent: '$350.00', avatarUrl: 'https://ui.shadcn.com/avatars/01.png', status: 'Active' },
  { id: 'CUST002', name: 'Maria Garcia', email: 'maria.garcia@example.com', totalOrders: 2, lastOrderDate: '2023-09-01', totalSpent: '$150.75', avatarUrl: 'https://ui.shadcn.com/avatars/02.png', status: 'Active' },
  { id: 'CUST003', name: 'David Miller', email: 'david.miller@example.com', totalOrders: 10, lastOrderDate: '2023-10-20', totalSpent: '$1200.50', avatarUrl: 'https://ui.shadcn.com/avatars/03.png', status: 'Inactive' },
  { id: 'CUST004', name: 'Sophia Davis', email: 'sophia.davis@example.com', totalOrders: 1, lastOrderDate: '2023-08-05', totalSpent: '$45.00', avatarUrl: 'https://ui.shadcn.com/avatars/04.png', status: 'Active' },
];

const CustomersPage = () => {
  console.log('CustomersPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  const filteredCustomers = sampleCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const currentCustomers = filteredCustomers.slice((currentPage - 1) * customersPerPage, currentPage * customersPerPage);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar isInitiallyCollapsed={false} />
      <div className="flex flex-col flex-1 ml-60">
        <Header userName="Admin" userAvatarUrl="https://ui.shadcn.com/avatars/01.png" onSearch={setSearchTerm} />
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-tight">Customers</h1>
                {/* <Button>Add Customer</Button> Potentially useful */}
              </div>
              <Card>
                <CardHeader className="px-7">
                   <Input
                      placeholder="Filter by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Total Orders</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentCustomers.length > 0 ? currentCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                                <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{customer.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell className="text-center">{customer.totalOrders}</TableCell>
                          <TableCell>{customer.lastOrderDate}</TableCell>
                          <TableCell className="text-right">{customer.totalSpent}</TableCell>
                          <TableCell>{customer.status}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Send Email</DropdownMenuItem>
                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Customer</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete Customer</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No customers found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="border-t px-7 py-4">
                   <div className="text-xs text-muted-foreground">
                      Showing <strong>{currentCustomers.length > 0 ? (currentPage - 1) * customersPerPage + 1 : 0}</strong> to <strong>{Math.min(currentPage * customersPerPage, filteredCustomers.length)}</strong> of <strong>{filteredCustomers.length}</strong> customers
                    </div>
                    {totalPages > 1 && (
                      <Pagination className="ml-auto">
                        <PaginationContent>
                          <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} disabled={currentPage === 1} /></PaginationItem>
                          {[...Array(totalPages)].map((_, i) => (<PaginationItem key={i}><PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => {e.preventDefault(); setCurrentPage(i + 1);}}>{i + 1}</PaginationLink></PaginationItem>))}
                          <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} disabled={currentPage === totalPages} /></PaginationItem>
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

export default CustomersPage;