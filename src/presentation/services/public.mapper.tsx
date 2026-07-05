import {
  Science,
  Restaurant,
  ColorLens,
  LocalHospital,
  Shield,
  Visibility,
  Favorite,
  EmojiEvents,
  Description,
  Settings,
  Search,
  Verified,
  Biotech,
  AcUnit,
  WaterDrop,
  Scale,

  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  ScienceOutlined,
  BiotechOutlined,
  //ScaleOutlined,
  //OpacityOutlined,
  AcUnitOutlined,
  ScienceRounded,
  VerifiedUser,
} from "@mui/icons-material";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace("/api", "");

export function getFullImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return apiBaseUrl ? `${apiBaseUrl}/${imageUrl}` : imageUrl;
}

export function mapIconNameToMui(iconName: string | null) {
  switch (iconName) {
    case "flask":
      return <Science />;
    case "utensils":
      return <Restaurant />;
    case "palette":
      return <ColorLens />;
    case "medical":
      return <LocalHospital />;
    case "shield":
      return <Shield />;
    case "eye":
      return <Visibility />;
    case "heart":
      return <Favorite />;
    case "trophy":
      return <EmojiEvents />;
    case "document":
      return <Description />;
    case "settings":
      return <Settings />;

    case "search":
      return <Search />;
    case "check":
      return <Verified />;
    case "microscope":
      return <Biotech />;
    case "snowflake":
      return <AcUnit />;
    case "water":
      return <WaterDrop />;
    case "scale":
      return <Scale />;

    case "1-square":
      return <LooksOne sx={{ color: "#3B82F6" }} />;
    case "2-square":
      return <LooksTwo sx={{ color: "#22C55E" }} />;
    case "3-square":
      return <Looks3 sx={{ color: "#F97316" }} />;
    case "4-square":
      return <Looks4 sx={{ color: "#A855F7" }} />;

    case "science":
      return <ScienceOutlined />;
    case "biotech":
      return <BiotechOutlined />;
    case "spectrophotometer":
      return <ScienceRounded />;
    case "freezer":
      return <AcUnitOutlined />;
    /*case "water":
      return <OpacityOutlined />;
    case "scale":
      return <ScaleOutlined />;*/

    case "description":
      return <Description sx={{ color: "#3B82F6" }} />;
    /*case "search":
      return <Search sx={{ color: "#F97316" }} />;*/
    case "verified":
      return <VerifiedUser sx={{ color: "#A855F7" }} />;
    case "shield-check":
      return <VerifiedUser sx={{ color: "#A855F7" }} />;

    default:
      return <Science />;
  }
}
