import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { CheckCircle, SlidersHorizontal, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const userAvatar = PlaceHolderImages.find((p) => p.id === "user-avatar-1");

export function WorkspaceWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace & Profile</CardTitle>
        <CardDescription>
          Customize your workspace and manage your synced profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6">
          <Avatar className="h-20 w-20">
            {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt="User avatar"
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-lg font-semibold">Citadel User</p>
            <p className="text-sm text-muted-foreground">user@citadel.com</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <Wifi className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Secure Profile Sync</p>
            <Badge variant="default" className="mt-1 bg-green-600/20 text-green-400 border-green-600/30 hover:bg-green-600/30">
              <CheckCircle className="mr-2 h-4 w-4"/>
              Active
            </Badge>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Your settings, and data are securely synced across devices.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <SlidersHorizontal className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Customizable UI</p>
            <p className="text-sm text-muted-foreground">
              Tailor the browser to your needs.
            </p>
          </div>
          <Button variant="secondary">Customize Layout</Button>
        </div>
      </CardContent>
    </Card>
  );
}
