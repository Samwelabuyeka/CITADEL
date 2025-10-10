import type { Tab, TabGroup } from "./types";

export const mockTabs: Tab[] = [
  { id: "tab-1", title: "Project Brief", domain: "docs.google.com" },
  { id: "tab-2", title: "Design Mockups", domain: "figma.com" },
  { id: "tab-3", title: "Task Board", domain: "jira.citadel.com" },
  { id: "tab-4", title: "React Docs", domain: "react.dev" },
  { id: "tab-5", title: "Tailwind CSS", domain: "tailwindcss.com" },
  { id: "tab-6", title: "Stack Overflow", domain: "stackoverflow.com" },
  { id: "tab-7", title: "Hacker News", domain: "news.ycombinator.com" },
  { id: "tab-8", title: "The Verge", domain: "theverge.com" },
];

export const mockTabGroups: TabGroup[] = [
  {
    id: "group-1",
    name: "Project Citadel",
    tabs: [
      { id: "tab-1", title: "Project Brief", domain: "docs.google.com" },
      { id: "tab-2", title: "Design Mockups", domain: "figma.com" },
      { id: "tab-3", title: "Task Board", domain: "jira.citadel.com" },
    ],
  },
  {
    id: "group-2",
    name: "Dev Research",
    tabs: [
      { id: "tab-4", title: "React Docs", domain: "react.dev" },
      { id: "tab-5", title: "Tailwind CSS", domain: "tailwindcss.com" },
      { id: "tab-6", title: "Stack Overflow", domain: "stackoverflow.com" },
    ],
  },
  {
    id: "group-3",
    name: "Tech News",
    tabs: [
        { id: "tab-7", title: "Hacker News", domain: "news.ycombinator.com" },
        { id: "tab-8", title: "The Verge", domain: "theverge.com" },
    ],
  },
];
