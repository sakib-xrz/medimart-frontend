export const AUTH_TOKEN_KEY = "ACCESS_TOKEN";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const categories = [
  {
    id: "1",
    title: "Supplements",
    description:
      "Vitamins and minerals to support overall health and wellness.",
    icon: "NutIcon",
    color: "#FFD166",
    slug: "supplements",
  },
  {
    id: "2",
    title: "First Aid",
    description: "Essential supplies for treating minor injuries and wounds.",
    icon: "Bandage",
    color: "#4ECDC4",
    slug: "first-aid",
  },
  {
    id: "3",
    title: "Women's Health",
    description: "Specialized products for women's wellness needs.",
    icon: "Activity",
    color: "#CB429F",
    slug: "womens-health",
  },
  {
    id: "4",
    title: "Pain Relief",
    description:
      "Medications to alleviate pain, reduce inflammation, and lower fever.",
    icon: "Pill",
    color: "#FF6B6B",
    slug: "pain-relief",
  },
  {
    id: "5",
    title: "Skin Care",
    description: "Treatments for various skin conditions and daily care.",
    icon: "Sparkles",
    color: "#7A86CB",
    slug: "skin-care",
  },
  {
    id: "6",
    title: "Digestive Health",
    description: "Relief for digestive issues and gut health support.",
    icon: "Leaf",
    color: "#06D6A0",
    slug: "digestive-health",
  },
];

export const forms = [
  "Bandage",
  "Capsule",
  "Cream",
  "Cup",
  "Gel",
  "Liquid",
  "Pad",
  "Roll",
  "Strips",
  "Tablet",
  "Test Kit",
  "Wipes",
];

export const categoryNames = [
  "Digestive Health",
  "First Aid",
  "Pain Relief",
  "Skin Care",
  "Supplements",
  "Women's Health",
];
