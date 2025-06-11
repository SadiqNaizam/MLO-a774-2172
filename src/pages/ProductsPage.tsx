import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';


const productFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  sku: z.string().min(3, { message: "SKU must be at least 3 characters." }),
  category: z.string().optional(),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  stock: z.coerce.number().int().min(0, { message: "Stock can't be negative." }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  imageUrl: z.string().url({message: "Please enter a valid URL"}).optional().or(z.literal('')),
});
type ProductFormValues = z.infer<typeof productFormSchema>;

const sampleProducts = [
  { id: 'PROD001', name: 'Ergonomic Mouse', sku: 'EM-001', category: 'Electronics', stock: 150, price: 75.00, isActive: true, imageUrl: 'https://placehold.co/400x400/EBF5FF/737373?text=Mouse' },
  { id: 'PROD002', name: 'Mechanical Keyboard', sku: 'MK-002', category: 'Electronics', stock: 80, price: 120.00, isActive: true, imageUrl: 'https://placehold.co/400x400/EBF5FF/737373?text=Keyboard' },
  { id: 'PROD003', name: 'Organic Coffee Beans', sku: 'OCB-001', category: 'Groceries', stock: 300, price: 22.50, isActive: false, imageUrl: 'https://placehold.co/400x400/EBF5FF/737373?text=Coffee' },
];

const ProductsPage = () => {
  console.log('ProductsPage loaded');
  const [products, setProducts] = useState(sampleProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormValues | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { name: '', sku: '', category: '', price: 0, stock: 0, description: '', isActive: true, imageUrl: '' },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (editingProduct && editingProduct.id) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data, id: editingProduct.id } : p));
    } else {
      setProducts([...products, { ...data, id: `PROD${String(products.length + 1).padStart(3, '0')}` }]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    form.reset();
  };

  const handleEdit = (product: ProductFormValues) => {
    setEditingProduct(product);
    form.reset(product); // Populate form with product data
    setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingProduct(null);
    form.reset({ name: '', sku: '', category: '', price: 0, stock: 0, description: '', isActive: true, imageUrl: '' });
    setIsDialogOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);


  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar isInitiallyCollapsed={false} />
      <div className="flex flex-col flex-1 ml-60">
        <Header userName="Admin" userAvatarUrl="https://ui.shadcn.com/avatars/01.png" onSearch={setSearchTerm}/>
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
                <Button onClick={handleAddNew}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
                </Button>
              </div>

              <Card>
                 <CardHeader className="px-7">
                    <Input
                      placeholder="Filter by product name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentProducts.length > 0 ? currentProducts.map((product) => (
                        <TableRow key={product.id}>
                           <TableCell>
                            <img
                                alt={product.name}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={product.imageUrl || `https://placehold.co/64x64/EBF5FF/737373?text=${product.name.substring(0,1)}`}
                                width="64"
                              />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={product.isActive ? 'default' : 'secondary'}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEdit(product)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )) : (
                         <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No products found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                 <CardFooter className="border-t px-7 py-4">
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>{currentProducts.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0}</strong> to <strong>{Math.min(currentPage * productsPerPage, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products
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

              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingProduct(null); }}>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                      {editingProduct ? 'Update the details of your product.' : 'Fill in the details for the new product.'}
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl><Input placeholder="e.g. Wireless Mouse" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="sku" render={({ field }) => (<FormItem><FormLabel>SKU</FormLabel><FormControl><Input placeholder="e.g. WM-001" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Category</FormLabel><FormControl><Input placeholder="e.g. Electronics" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="price" render={({ field }) => (<FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" step="0.01" placeholder="e.g. 29.99" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="stock" render={({ field }) => (<FormItem><FormLabel>Stock Quantity</FormLabel><FormControl><Input type="number" placeholder="e.g. 100" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                      <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Brief description of the product..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="imageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5"><FormLabel>Status</FormLabel><FormDescription>Is this product currently active and available?</FormDescription></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">{editingProduct ? 'Save Changes' : 'Add Product'}</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;