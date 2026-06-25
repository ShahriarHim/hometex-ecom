import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CustomerOrderSummary } from "@/types/api/order";
import { Heart, Package, Settings, User } from "lucide-react";
import { OrdersTab } from "./OrdersTab";
import { ProfileTab } from "./ProfileTab";
import { SettingsTab } from "./SettingsTab";
import { WishlistTab } from "./WishlistTab";

interface UserProfile {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  customer_id?: number;
  [key: string]: string | number | undefined;
}

interface AccountTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoading: boolean;
  error: string | null;
  userProfile: UserProfile | null;
  orders: CustomerOrderSummary[];
  ordersLoading: boolean;
  ordersError: string | null;
  ordersFetched: boolean;
  trackingStatus: Record<string, string>;
  trackingLoading: Record<string, boolean>;
  onTrack: (order: CustomerOrderSummary) => void;
  onOpenPreferences: () => void;
}

export const AccountTabs = ({
  activeTab,
  onTabChange,
  isLoading,
  error,
  userProfile,
  orders,
  ordersLoading,
  ordersError,
  ordersFetched,
  trackingStatus,
  trackingLoading,
  onTrack,
  onOpenPreferences,
}: AccountTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="profile" className="group flex items-center gap-2">
          <User className="h-5 w-5 text-yellow-600" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="orders" className="group flex items-center gap-2">
          <Package className="h-5 w-5 text-yellow-600" />
          Orders
        </TabsTrigger>
        <TabsTrigger value="wishlist" className="group flex items-center gap-2">
          <Heart className="h-5 w-5 text-yellow-600" />
          Wishlist
        </TabsTrigger>
        <TabsTrigger value="settings" className="group flex items-center gap-2">
          <Settings className="h-5 w-5 text-yellow-600" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileTab isLoading={isLoading} error={error} userProfile={userProfile} />
      </TabsContent>

      <TabsContent value="orders">
        <OrdersTab
          orders={orders}
          ordersLoading={ordersLoading}
          ordersError={ordersError}
          ordersFetched={ordersFetched}
          isLoading={isLoading}
          trackingStatus={trackingStatus}
          trackingLoading={trackingLoading}
          onTrack={onTrack}
        />
      </TabsContent>

      <TabsContent value="wishlist">
        <WishlistTab />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTab onOpenPreferences={onOpenPreferences} />
      </TabsContent>
    </Tabs>
  );
};
