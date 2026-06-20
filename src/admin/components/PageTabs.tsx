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
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      sx={{
        px: { xs: 0.5, sm: 1.5 },
        borderBottom: 1,
        borderColor: "divider",
        maxWidth: "100%",

        "& .MuiTabs-scroller": {
          overflowX: "auto",
        },

        "& .MuiTab-root": {
          textTransform: "none",
          minWidth: "max-content",
          whiteSpace: "nowrap",
        },

        "& .MuiTabs-scrollButtons": {
          width: 20,
          minWidth: 20,
        },

        "& .MuiTabs-scrollButtons.Mui-disabled": {
          opacity: 0.25,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
    </Tabs>
  );
}
