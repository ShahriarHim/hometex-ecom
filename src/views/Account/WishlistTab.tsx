import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Heart } from "lucide-react";

export const WishlistTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">View and manage your saved items</p>
        <Button asChild variant="default" size="sm">
          <Link href="/account/wishlist" className="flex items-center gap-2 hover:text-black">
            <Heart className="h-4 w-4" />
            <span>View Wishlist</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
