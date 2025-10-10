'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Reverted to a standard Genkit configuration.
// Your custom network is now called directly from the search flow.
export const ai = genkit({
  plugins: [googleAI()],
  // Allow functions to be called from the local dev UI.
  enableDevUI: true,
});
