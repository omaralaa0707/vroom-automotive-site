/**
 * Vroom Automotive shoot every car — Lamborghini or Skoda — against the same
 * fixed point: their own showroom wall, a terracotta timber slat facade cut
 * by a dark faceted-marble panel and their own angular monogram in raised
 * graphite. It is the one constant in a catalogue that otherwise runs from a
 * Lamborghini Urus and a Ferrari to a Skoda Kodiaq and a Cadillac Escalade,
 * with almost no other information volunteered per car — no year on most
 * listings, no mileage, no spec sheet, just "Now available at Vroom" and a
 * phone number.
 *
 * Two of their last eight posts are the same car twice — the Kodiaq and the
 * "Rox 01" each appear in consecutive posts with near-identical captions.
 */

export type CarId = "urus" | "ferrari" | "cla180" | "rox01" | "escalade" | "kodiaq";

export type Car = {
  id: CarId;
  marque: string;
  model: string;
  year?: string;
  /** Their own line, when they wrote one beyond the model name. */
  billing?: string;
  /** True for the two cars posted twice in the eight sourced posts. */
  repeated: boolean;
  frames: string[];
  postUrl: string;
  /** The phone number printed on this specific post. */
  phone: string;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;
const f = (s: string, n = 3) => Array.from({ length: n }, (_, i) => `/media/${s}-${i + 1}.jpg`);

/** Newest first, as posted. */
export const CARS: Car[] = [
  {
    id: "urus",
    marque: "Lamborghini",
    model: "Urus",
    billing: "Speed redefined",
    repeated: false,
    frames: f("urus"),
    postUrl: post("DNn3mH7IUNP"),
    phone: "01156664445",
  },
  {
    id: "ferrari",
    marque: "Ferrari",
    model: "12Cilindri",
    billing: "Pure Power. Pure Prestige.",
    repeated: false,
    frames: f("ferrari"),
    postUrl: post("DVMjz8RCMHC"),
    phone: "01097796677",
  },
  {
    id: "cla180",
    marque: "Mercedes-Benz",
    model: "CLA 180",
    year: "2026",
    repeated: false,
    frames: f("cla180", 2),
    postUrl: post("DcqZRzECNoX"),
    phone: "01156664445",
  },
  {
    id: "rox01",
    marque: "Rox",
    model: "01",
    year: "2026",
    billing: "Collection Rox 01",
    repeated: true,
    frames: f("rox01-a"),
    postUrl: post("DcodhElCL22"),
    phone: "01156664445",
  },
  {
    id: "escalade",
    marque: "Cadillac",
    model: "Escalade",
    year: "2026",
    repeated: false,
    frames: f("escalade"),
    postUrl: post("Dca-w-diO7g"),
    phone: "01156664445",
  },
  {
    id: "kodiaq",
    marque: "Skoda",
    model: "Kodiaq",
    year: "2026",
    repeated: true,
    frames: f("kodiaq-a"),
    postUrl: post("Dbx6VK2CEH8"),
    phone: "01156664445",
  },
];

export const PROFILE = {
  instagram: "https://www.instagram.com/vroom.automotive/",
  facebook: "https://www.facebook.com/Vroom.Automotive/",
  maps: "https://maps.app.goo.gl/1HeDVTuaDGckSnEN9?g_st=iwb",
  /** The number printed on six of the eight sourced posts. */
  phone: "01156664445",
  phoneHref: "tel:+201156664445",
  address: "Unit G06, Plot 128, 70th Street, Bank Center, Fifth Settlement, New Cairo",
  addressAr: "وحدة G06، قطعة 128، الشارع السبعين، بانك سنتر، التجمع الخامس، القاهرة الجديدة",
  followers: "15K",
  posts: "1,456",
} as const;
