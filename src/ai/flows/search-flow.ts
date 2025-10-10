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

    // Assuming the API returns a JSON string in the 'result' field that needs to be parsed.
    // This might need adjustment based on the actual API response format.
    if (responseData.result && typeof responseData.result === 'string') {
        const searchResults = JSON.parse(responseData.result);
        // We'll validate the structure of the parsed results.
        const validatedResults = SearchOutputSchema.safeParse(searchResults);
        if (validatedResults.success) {
            return validatedResults.data;
        } else {
            console.error("Failed to parse search results from Mega-Brain:", validatedResults.error);
            return { results: [] };
        }
    }
    
    // Fallback for other potential response structures
    const validatedDirect = SearchOutputSchema.safeParse(responseData);
     if (validatedDirect.success) {
        return validatedDirect.data;
     }
    

    console.error('Unexpected response format from Mega-Brain API:', responseData);
    return { results: [] };

  } catch (error) {
    console.error("Error calling Mega-Brain API:", error);
    return { results: [] };
  }
}

export async function search(input: SearchInput): Promise<SearchOutput> {
  // We now directly call the function that queries your custom network.
  return performWebSearch(input.query);
}