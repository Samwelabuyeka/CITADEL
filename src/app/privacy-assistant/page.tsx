import AppLayout from "@/components/app-layout";
import { PrivacyAssistantForm } from "./privacy-assistant-form";

export default function PrivacyAssistantPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            AI-Powered Privacy Assistant
          </h1>
          <p className="text-muted-foreground">
            Paste your browsing history below to receive personalized privacy recommendations.
            This tool analyzes browsing habits to suggest optimal settings, simplifying complex choices.
          </p>
        </div>
        <PrivacyAssistantForm />
      </div>
    </AppLayout>
  );
}
