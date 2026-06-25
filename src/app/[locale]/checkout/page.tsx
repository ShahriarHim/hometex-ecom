import CheckoutView from "@/views/Checkout";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}
    >
      <CheckoutView />
    </Suspense>
  );
}
