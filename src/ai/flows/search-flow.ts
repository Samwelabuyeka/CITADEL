'use server';
/**
 * @fileOverview A search flow that uses a custom AI network to generate search results.
 *
 * - search - A function that handles the search process.
 * - SearchInput - The input type for the search function.
 * - SearchOutput - The return type for the search function.
 */

import {z} from 'genkit';

const SearchResultItemSchema = z.object({
  title: z.string().describe('The title of the search result.'),
  url: z.string().url().describe('The URL of the search result.'),
  snippet: z.string().describe('A short snippet of the search result.'),
});

const SearchInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
type SearchInput = z.infer<typeof SearchInputSchema>;

const SearchOutputSchema = z.object({
  results: z.array(SearchResultItemSchema).describe('A list of search results.'),
});
type SearchOutput = z.infer<typeof SearchOutputSchema>;

// This function now directly calls your custom "Mega-Brain" network.
async function performWebSearch(query: string): Promise<SearchOutput> {
  const apiKey = process.env.MEGA_BRAIN_API_KEY;
  const apiUrl = process.env.MEGA_BRAIN_API_URL;

  if (!apiKey || !apiUrl) {
    console.error('Missing MEGA_BRAIN_API_KEY or MEGA_BRAIN_API_URL in .env file');
    return { results: [] };
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ directive: `Perform a web search for: ${query}` }),
    });

    if (!response.ok) {
      console.error(`Mega-Brain API request failed with status ${response.status}`);
      return { results: [] };
    }

    const responseData = await response.json();

    // Validate the structure of the parsed results directly.
    const validatedResults = SearchOutputSchema.safeParse(responseData);
    if (validatedResults.success) {
        return validatedResults.data;
    } else {
        // Log the validation error and the data that failed.
        console.error("Failed to parse search results from Mega-Brain:", validatedResults.error);
        console.error("Received data:", responseData);
        return { results: [] };
    }

  } catch (error) {
    console.error("Error calling Mega-Brain API:", error);
    return { results: [] };
  }
}

export async function search(input: SearchInput): Promise<SearchOutput> {
  // We now directly call the function that queries your custom network.
  return performWebSearch(input.query);
}
