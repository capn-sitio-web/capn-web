import { Tab, Tabs } from "@mui/material";

export type AboutTabKey = "historia" | "misionVision" | "valores" | "equipo";

type Props = {
  value: AboutTabKey;
  onChange: (value: AboutTabKey) => void;
};

export default function AboutTabs({ value, onChange }: Props) {
  return (
    <Tabs
      value={value}
      onChange={(_, v) => onChange(v as AboutTabKey)}
      sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}
    >
      <Tab value="historia" label="Historia" sx={{ textTransform: "none" }} />
      <Tab value="misionVision" label="Misión y Visión" sx={{ textTransform: "none" }} />
      <Tab value="valores" label="Valores" sx={{ textTransform: "none" }} />
      <Tab value="equipo" label="Equipo" sx={{ textTransform: "none" }} />
    </Tabs>
  );
}

