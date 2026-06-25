"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/api";
import type { GuestOrderResponse } from "@/types/api/order";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Loader2,
  MapPin,
  Package,
  Search,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const GuestOrderTracking = () => {
  const { isAuthenticated } = useAuth();

  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<GuestOrderResponse["data"] | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) {
      toast.error("Please enter both Order Number and Email");
      return;
    }

    setLoading(true);
    setTrackingData(null);

    try {
      const response = await orderService.trackGuestOrder(orderNumber, email);
      if (response.success) {
        setTrackingData(response.data);
      } else {
        toast.error(response.message || "Order not found. Please check your details.");
      }
    } catch (error) {
      console.error("Tracking error:", error);
      toast.error("Failed to track order. Please verify your information.");
    } finally {
      setLoading(false);
    }
  };

  const trackingSteps = useMemo(() => {
    if (!trackingData) {
      return [];
    }

    const statusString = trackingData.order.status.toLowerCase();

    // Status normalization
    const normalizedStatus =
      statusString === "completed" || statusString === "delivered"
        ? "delivered"
        : statusString === "shipped"
          ? "shipped"
          : statusString === "processing"
            ? "processing"
            : "pending";

    return [
      { status: "pending", label: "Order Placed", icon: Package, completed: true },
      {
        status: "processing",
        label: "Processing",
        icon: Package,
        completed: ["processing", "shipped", "delivered"].includes(normalizedStatus),
      },
      {
        status: "shipped",
        label: "Shipped",
        icon: Truck,
        completed: ["shipped", "delivered"].includes(normalizedStatus),
      },
      {
        status: "delivered",
        label: "Delivered",
        icon: CheckCircle,
        completed: normalizedStatus === "delivered",
      },
    ];
  }, [trackingData]);

  // If user is authenticated, we might want to suggest viewing their account
  // But per request, this page is specifically for when not logged in.
  // We'll add a login prompt nicely.

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order number and email address to check the status of your Guest Order.
            </p>
          </div>

          {!trackingData ? (
            <Card className="max-w-md mx-auto shadow-lg">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>
                  Please provide the order number sent to your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      placeholder="e.g., HTB12345678"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="guest@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Track Order
                      </>
                    )}
                  </Button>
                </form>

                {!isAuthenticated && (
                  <div className="mt-6 pt-6 border-t text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Have an account? Log in to view all your orders.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/auth">Log In</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Button
                variant="ghost"
                onClick={() => setTrackingData(null)}
                className="mb-2 pl-0 hover:pl-2 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Track Another Order
              </Button>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Main Tracking Info */}
                <div className="flex-1 w-full space-y-6">
                  <Card>
                    <CardHeader className="pb-4 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl mb-1">
                            Order {trackingData.order.orderNumber}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(trackingData.order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="text-sm capitalize px-3 py-1">
                          {trackingData.order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-8 pb-8">
                      {/* Progress Bar */}
                      <div className="relative mb-4">
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-100" />
                        <div
                          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-1000 ease-out"
                          style={{
                            width: `${(trackingSteps.filter((s) => s.completed).length - 1) * 33.33}%`,
                          }}
                        />

                        <div className="relative flex justify-between">
                          {trackingSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isCompleted = step.completed;

                            return (
                              <div key={index} className="flex flex-col items-center group">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isCompleted
                                      ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                                      : "bg-white border-slate-200 text-slate-400"
                                  }`}
                                >
                                  <Icon className="h-5 w-5" />
                                </div>
                                <p
                                  className={`text-xs mt-3 font-medium transition-colors ${
                                    isCompleted ? "text-primary" : "text-slate-400"
                                  }`}
                                >
                                  {step.label}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {trackingData.order.trackingCode && (
                        <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                              Tracking Code
                            </p>
                            <p className="font-mono font-medium text-slate-700">
                              {trackingData.order.trackingCode}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {trackingData.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-2 border-b last:border-0 border-slate-50"
                          >
                            <div className="flex items-center gap-4">
                              {/* {item.photo ? (
                                <img
                                  src={item.photo}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-md bg-slate-100"
                                />
                              ) : ( */}
                              <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center text-slate-300">
                                <Package className="h-6 w-6" />
                              </div>
                              {/* )} */}
                              <div>
                                <p className="font-medium text-slate-800 line-clamp-1">
                                  {item.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Qty: {item.quantity} {item.sku && `• SKU: ${item.sku}`}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-slate-700">
                              ৳{item.price.toLocaleString()}
                            </p>
                          </div>
                        ))}

                        <div className="pt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>৳{trackingData.order.subTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Discount</span>
                            <span className="text-green-600">
                              - ৳{trackingData.order.discount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2 mt-2">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg text-primary">
                              ৳{trackingData.order.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-80 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-slate-100 p-1.5 rounded-full">
                          <MapPin className="h-4 w-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700 mb-1">Shipping Address</p>
                          <p className="text-muted-foreground leading-relaxed">
                            {trackingData.shipping.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-slate-100 p-1.5 rounded-full">
                          <AlertCircle className="h-4 w-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700 mb-1">Contact Info</p>
                          <p className="text-muted-foreground">{trackingData.customer.name}</p>
                          <p className="text-muted-foreground">{trackingData.customer.email}</p>
                          <p className="text-muted-foreground">{trackingData.customer.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Method</span>
                        <span className="font-medium">{trackingData.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant={
                            trackingData.order.paymentStatus === "paid" ? "default" : "secondary"
                          }
                          className="capitalize"
                        >
                          {trackingData.order.paymentStatus}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuestOrderTracking;
