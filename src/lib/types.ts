export type Tab = {
  id: string;
  title: string;
  domain: string;
};

export type TabGroup = {
  id: string;
  name: string;
  tabs: Tab[];
};
