'use server';

import { getTabGroups as getTabGroupsFlow, TabGroupInput, TabGroupOutput } from "@/ai/flows/tab-group-flow";

export async function getTabGroups(input: TabGroupInput): Promise<TabGroupOutput | null> {
  try {
    const results = await getTabGroupsFlow(input);
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
}
