"use server";

import { aiPoweredPrivacyRecommendations } from "@/ai/flows/ai-powered-privacy-recommendations";
import { z } from "zod";

const InputSchema = z.object({
  browsingHistory: z.string().min(50, "Please provide a more detailed browsing history for a better analysis."),
});

export async function getPrivacyRecommendations(prevState: any, formData: FormData) {
  const validatedFields = InputSchema.safeParse({
    browsingHistory: formData.get('browsingHistory'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await aiPoweredPrivacyRecommendations({ browsingHistory: validatedFields.data.browsingHistory });
    return { data: result };
  } catch (error) {
    console.error(error);
    return { error: { _form: ["An unexpected error occurred. Please try again."] } };
  }
}
