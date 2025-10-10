"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getPrivacyRecommendations } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, Sparkles } from "lucide-react";

const initialState = {
  error: undefined,
  data: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Analyze and Recommend
    </Button>
  );
}

export function PrivacyAssistantForm() {
  const [state, formAction] = useFormState(
    getPrivacyRecommendations,
    initialState
  );
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error?._form) {
      toast({
        title: "Error",
        description: state.error._form[0],
        variant: "destructive",
      });
    }
  }, [state, toast]);

  useEffect(() => {
    if (state.data) {
      formRef.current?.reset();
    }
  }, [state.data]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form ref={formRef} action={formAction} className="space-y-4">
        <Textarea
          name="browsingHistory"
          placeholder="e.g., Visited news.com, searched for 'best privacy practices', logged into mybank.com..."
          className="min-h-[200px] text-base"
          required
        />
        {state.error?.browsingHistory && (
          <p className="text-sm text-destructive">{state.error.browsingHistory[0]}</p>
        )}
        <SubmitButton />
      </form>
      
      <Card>
        <CardContent className="p-6">
          {state.data ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">Recommendations</h3>
                <p className="text-sm text-muted-foreground">{state.data.recommendations}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mt-4">Explanation</h3>
                <Accordion type="single" collapsible className="w-full">
                  {state.data.explanation.split('\n').filter(line => line.trim().length > 0).map((line, index) => {
                    // Simple logic to separate title from content
                    const parts = line.split(':');
                    const title = parts[0];
                    const content = parts.slice(1).join(':').trim();
                    return(
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{title}</AccordionTrigger>
                        <AccordionContent>
                          {content}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full border border-dashed p-4">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Your Recommendations</h3>
              <p className="text-muted-foreground">
                Your personalized privacy suggestions will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
