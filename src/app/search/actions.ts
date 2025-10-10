'use server';

import { search } from '@/ai/flows/search-flow';

export async function getSearchResults(query: string) {
  try {
    const results = await search({ query });
    return results;
  } catch (error) {
    // console.error(error);
    return { results: [] };
  }
}
