import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // All flows will now default to using your Mega-Brain model.
  model: 'googleai/gemini-pro',
  // Allow functions to be called from the local dev UI.
  enableDevUI: true,
});
