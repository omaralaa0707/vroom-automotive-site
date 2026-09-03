import type { Metadata } from "next";
import { Unbounded, Work_Sans, Reem_Kufi, Cairo } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A geometric variable-width display face for a dealer whose one fixed
// identity marker is an angular monogram cut into a faceted marble panel.
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
});
// Reem Kufi Ink (tried first) is a COLR/CPAL colour font — its glyphs carry
// baked-in palette colours and ignore `color` entirely, which read as a
// fixed dark-red headline regardless of theme. Plain Reem Kufi keeps the
// same bold geometric kufi register without that.
const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem-kufi",
});
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Vroom Automotive — the wall | New Cairo",
  description:
    "A Lamborghini Urus and a Skoda Kodiaq, photographed against the same faceted marble wall. A dealership page built as that wall itself, rendered as a real lattice screen in front of each car.",
  metadataBase: new URL("https://vroom-automotive-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Vroom Automotive — the wall",
    description: "A dealership page modelled on the one fixed backdrop behind an unusually wide catalogue.",
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#1b1613" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${unbounded.variable} ${workSans.variable} ${reemKufi.variable} ${cairo.variable}`}
    >
      <body className="bg-ground text-cream antialiased">
        {/* Content opens like a lattice gap under an intersection observer,
            so without scripting every block would stay invisible. */}
        <noscript>
          <style>{`[data-glimpse],[data-glimpse-rule]{opacity:1!important;clip-path:none!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
