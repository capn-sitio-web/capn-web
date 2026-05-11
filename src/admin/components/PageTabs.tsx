import { Tab, Tabs } from "@mui/material";

export type PageTabItem<T extends string = string> = {
  value: T;
  label: string;
};

type PageTabsProps<T extends string = string> = {
  value: T;
  tabs: PageTabItem<T>[];
  onChange: (value: T) => void;
};

export default function PageTabs<T extends string>({
  value,
  tabs,
  onChange,
}: PageTabsProps<T>) {
  return (
    <Tabs
      value={value}
      onChange={(_, nextValue) => onChange(nextValue as T)}
      sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          sx={{ textTransform: "none" }}
        />
      ))}
    </Tabs>
  );
}
