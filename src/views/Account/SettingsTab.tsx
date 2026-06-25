import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield } from "lucide-react";

interface SettingsTabProps {
  onOpenPreferences: () => void;
}

export const SettingsTab = ({ onOpenPreferences }: SettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Preferences</h3>
          <p className="text-sm text-muted-foreground mb-4">Manage your account preferences</p>
          <Button
            variant="default"
            size="sm"
            onClick={onOpenPreferences}
            className="flex items-center gap-2 hover:text-black"
          >
            <Settings className="h-4 w-4" />
            <span>Manage Preferences</span>
          </Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Security</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Change password and security settings
          </p>
          <Button variant="default" size="sm" className="flex items-center gap-2 hover:text-black">
            <Shield className="h-4 w-4" />
            <span>Security Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
