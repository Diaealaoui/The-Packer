import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../hooks/use_toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../lib/queryClient";
import { useLocation } from "wouter";

// Form schema
const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zipCode: z.string().min(5, { message: "ZIP code must be at least 5 characters" }),
  cardName: z.string().min(2, { message: "Name on card must be at least 2 characters" }),
  cardNumber: z.string().min(16, { message: "Card number must be at least 16 characters" }),
  expiry: z.string().min(5, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string().min(3, { message: "CVV must be at least 3 characters" }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutForm = () => {
  const { cartItems, calculateCartTotals, clearCart } = useCart();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const { subtotal, shipping, total } = calculateCartTotals();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    }
  });
  
  const placeOrderMutation = useMutation({
    mutationFn: async (formData: CheckoutFormValues) => {
      const items = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      
      return await apiRequest("POST", "/api/orders", {
        order: {
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          total: total.toString(),
        },
        items,
      });
    },
    onSuccess: () => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
        duration: 5000,
      });
      
      clearCart();
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error placing order",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (values: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    placeOrderMutation.mutate(values);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      <div className="md:flex -mx-4">
        <div className="md:w-7/12 px-4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-6">Shipping Information</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-6">Payment Information</h3>
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="•••• •••• •••• ••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="MM/YY" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="•••" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:hidden mt-8">
                <Button 
                  type="submit" 
                  className="w-full bg-secondary text-white py-3 font-medium hover:bg-opacity-90 transition-colors"
                  disabled={placeOrderMutation.isPending}
                >
                  {placeOrderMutation.isPending ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        <div className="md:w-5/12 px-4">
          <div className="bg-neutral-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex justify-between text-sm text-neutral-500">
                      <span>{item.variant}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-neutral-300 pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-neutral-300">
                <span>Total</span>
                <span>${(total + (subtotal * 0.08)).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <Button 
                type="button" 
                className="w-full bg-secondary text-white py-3 mt-6 font-medium hover:bg-opacity-90 transition-colors"
                onClick={form.handleSubmit(onSubmit)}
                disabled={placeOrderMutation.isPending}
              >
                {placeOrderMutation.isPending ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
