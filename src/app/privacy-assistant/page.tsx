import AppLayout from "@/components/app-layout";
import { PrivacyAssistantForm } from "./privacy-assistant-form";

export default function PrivacyAssistantPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold">AI-Powered Privacy Assistant</h1>
          <p className="text-muted-foreground">
            Paste your browsing history below to get personalized privacy recommendations.
          </p>
        </div>
        <PrivacyAssistantForm />
      </div>
    </AppLayout>
  );
}
