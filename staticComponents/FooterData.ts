export interface QuickLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: 'facebook' | 'tiktok';
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export const FOOTER_QUICK_LINKS: QuickLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" }, // Or /our-story depending on your router
  { label: "Our Impact", href: "/impact" },
  { label: "Latest Stories", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_GET_INVOLVED_LINKS: QuickLink[] = [
  { label: "Donate", href: "/donate" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Support Our Mission", href: "/support" },
];

export const FOOTER_CONTACT: ContactInfo = {
  email: "info@marymaudcharity.org",
  phone: "+233-244637595", 
  location: "Accra, Ghana",
};

// Only official active platforms with verified links can be added here
export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  { platform: "Facebook", url: "https://web.facebook.com/profile.php?id=100092427775943&sk=map", iconName: "facebook" },
  { platform: "Tiktok", url: "https://www.tiktok.com/@marymaudcharity", iconName: "tiktok" }
];

export const FOOTER_LEGAL_LINKS: QuickLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
];