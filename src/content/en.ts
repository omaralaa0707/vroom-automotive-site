import type { VroomContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: VroomContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Vroom Automotive",
    shortName: "V",
    tagline: "Fifth Settlement, New Cairo",
  },

  nav: [
    { label: "The range", href: "#range" },
    { label: "The wall", href: "#screen" },
  ],

  hero: {
    eyebrow: "New Cairo · Bank Center",
    headline: "A Lamborghini and a Skoda, against the same wall",
    sub: "Vroom photograph every car — supercar or family SUV — from the same spot, in front of their own showroom facade. It is the one fact that holds a genuinely wide catalogue together. Move your pointer over the frame; the screen in front of the photo and the car behind it shift at different rates, the way a real lattice does as you walk past it.",
    primaryCta: "Call Vroom",
    secondaryCta: "See the range",
    latticeAlt: "A car from Vroom's catalogue, seen through a diamond-lattice screen modelled on their own showroom wall.",
    followersLabel: "Followers",
    postsLabel: "Posts",
    marquesLabel: "Marques below",
  },

  about: {
    heading: "Vroom Automotive",
    body: [
      "A showroom at Bank Center, 70th Street, Fifth Settlement, New Cairo — recognisable in almost every one of their posts by the same terracotta timber wall and faceted marble panel behind the car.",
    ],
  },

  services: { heading: "The range", items: [] },
  gallery: { heading: "The range", items: [] },

  range: {
    eyebrow: "The range",
    heading: "Six cars, in the order they were posted",
    intro: "Almost nothing is published per car beyond a name — no year on most listings, no mileage, no specification. What follows is exactly that: their own words, and nothing supplied on top of them.",
    repeatedTag: "Posted twice",
    viewPost: "See the post",
    phoneNote: {
      urus: null,
      ferrari: "The one post in this set with a different number printed on it.",
      cla180: null,
      rox01: null,
      escalade: null,
      kodiaq: null,
    },
  },

  screen: {
    eyebrow: "The wall",
    heading: "One backdrop for a catalogue this wide",
    body: [
      "Six of the last eight cars they posted go from a Lamborghini Urus and a Ferrari 12Cilindri to a Skoda Kodiaq and a Cadillac Escalade — and every one of them stands in the same spot, against the same terracotta timber facade and the same faceted diamond panel carrying their own monogram.",
      "That panel is what the screen at the top of this page is a model of. The lattice this page uses to look at each car is built from the shape of the wall Vroom already look at their cars through.",
    ],
    stillAlt: "Vroom's showroom facade — terracotta timber slats and a faceted diamond marble panel carrying their monogram.",
  },

  contact: {
    heading: "Visit",
    addressLabel: "Address",
    address: PROFILE.address,
    phoneLabel: "Call",
    phones: [PROFILE.phone],
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call Vroom",
  },

  footer: {
    rights: "© Vroom Automotive. All rights reserved.",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
