import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { CustomerOrderSummary } from "@/types/api/order";
import { Eye, Loader2, RefreshCcw, Truck } from "lucide-react";
import { memo } from "react";

// Helper function to get status styles with meaningful colors and glow (no hover effects)
const getStatusStyles = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("completed") || normalizedStatus.includes("delivered")) {
    return "bg-emerald-500 hover:bg-emerald-500 text-white hover:text-white border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]";
  }
  if (normalizedStatus.includes("processing") || normalizedStatus.includes("confirmed")) {
    return "bg-blue-500 hover:bg-blue-500 text-white hover:text-white border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]";
  }
  if (normalizedStatus.includes("pending") || normalizedStatus.includes("waiting")) {
    return "bg-yellow-500 hover:bg-yellow-500 text-black hover:text-black border-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.5)]";
  }
  if (
    normalizedStatus.includes("shipped") ||
    normalizedStatus.includes("transit") ||
    normalizedStatus.includes("out for delivery")
  ) {
    return "bg-purple-500 hover:bg-purple-500 text-white hover:text-white border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]";
  }
  if (
    normalizedStatus.includes("cancelled") ||
    normalizedStatus.includes("failed") ||
    normalizedStatus.includes("rejected")
  ) {
    return "bg-red-500 hover:bg-red-500 text-white hover:text-white border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]";
  }
  if (normalizedStatus.includes("refund") || normalizedStatus.includes("return")) {
    return "bg-orange-500 hover:bg-orange-500 text-white hover:text-white border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]";
  }
  // Default style
  return "bg-gray-500 hover:bg-gray-500 text-white hover:text-white border-gray-500 shadow-[0_0_12px_rgba(107,114,128,0.5)]";
};

// Memoized order card component for better performance
const OrderCard = memo(
  ({
    order,
    trackingStatus,
    trackingLoading,
    onTrack,
  }: {
    order: CustomerOrderSummary;
    trackingStatus?: string;
    trackingLoading: boolean;
    onTrack: () => void;
  }) => {
    return (
      <Card className="bg-slate-100 border-slate-300">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg">Order {order.order_number}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed: {order.created_at} • Updated: {order.updated_at}
            </p>
          </div>
          <Badge
            className={cn(
              "font-semibold cursor-default hover:opacity-100",
              getStatusStyles(order.order_status_string)
            )}
          >
            {order.order_status_string}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="text-sm text-muted-foreground">
              <div>Payment: {order.payment_method}</div>
              <div>Status: {order.order_status_string}</div>
              <div>Shop: {order.shop}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Total: ৳{order.total}</div>
              <div>Quantity: {order.quantity}</div>
              {order.tracking_code && <div>Tracking: {order.tracking_code}</div>}
            </div>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            {/* View Details */}
            <Button asChild variant="default" size="sm">
              <Link
                href={`/orders/${order.order_number}`}
                className="flex items-center gap-2 hover:text-black"
              >
                <Eye className="h-4 w-4 shrink-0" />
                <span>View Details</span>
              </Link>
            </Button>

            {/* Track */}
            <Button
              variant="default"
              size="sm"
              onClick={onTrack}
              disabled={trackingLoading}
              className="flex items-center gap-2 hover:text-black"
            >
              {trackingLoading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <Truck className="h-4 w-4 shrink-0" />
              )}
              <span>Track</span>
            </Button>

            {trackingStatus && (
              <div className="text-sm flex items-center gap-2">
                <span className="font-medium text-muted-foreground">Delivery Status:</span>
                <span className="text-foreground font-semibold">{trackingStatus}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

OrderCard.displayName = "OrderCard";

interface OrdersTabProps {
  orders: CustomerOrderSummary[];
  ordersLoading: boolean;
  ordersError: string | null;
  ordersFetched: boolean;
  isLoading: boolean;
  trackingStatus: Record<string, string>;
  trackingLoading: Record<string, boolean>;
  onTrack: (order: CustomerOrderSummary) => void;
}

export const OrdersTab = ({
  orders,
  ordersLoading,
  ordersError,
  ordersFetched,
  isLoading,
  trackingStatus,
  trackingLoading,
  onTrack,
}: OrdersTabProps) => {
  const renderOrders = () => {
    // Show loader if loading or if we haven't fetched yet (waiting for profile)
    if (ordersLoading || (ordersFetched === false && isLoading)) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading orders...</span>
        </div>
      );
    }
    if (ordersError) {
      const isNoOrderError = ordersError.toLowerCase().includes("no order found");
      return (
        <div className="text-center py-8">
          {isNoOrderError ? (
            <>
              <p className="text-muted-foreground mb-4">
                No order found, need shopping?{" "}
                <Link href="/products" className="text-primary underline hover:text-primary/80">
                  click here
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-destructive mb-4">{ordersError}</p>
              <Button
                variant="default"
                size="sm"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 hover:text-black"
              >
                <RefreshCcw className="h-4 w-4" />
                <span>Retry</span>
              </Button>
            </>
          )}
        </div>
      );
    }
    // Only show "No orders yet" if we've actually fetched and got empty results
    if (ordersFetched && (!orders || orders.length === 0)) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No orders yet. Start shopping to see orders.</p>
          <Button asChild variant="default" size="sm">
            <Link href="/products" className="flex items-center gap-2 hover:text-black">
              <span>Start Shopping</span>
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.order_number}
            order={order}
            trackingStatus={trackingStatus[order.order_number]}
            trackingLoading={trackingLoading[order.order_number]}
            onTrack={() => onTrack(order)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>{renderOrders()}</CardContent>
    </Card>
  );
};
