import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";
import type { CarId } from "./media";

/**
 * Vroom's catalogue runs from a Lamborghini to a Skoda against one fixed
 * backdrop, with almost nothing published per car beyond a name. The shared
 * schema has no vocabulary for a range this wide, for a repeated post, or
 * for the wall itself.
 */
export type VroomContent = SiteContent & {
  hero: SiteContent["hero"] & {
    latticeAlt: string;
    followersLabel: string;
    postsLabel: string;
    marquesLabel: string;
  };
  range: {
    eyebrow: string;
    heading: string;
    intro: string;
    repeatedTag: string;
    viewPost: string;
    phoneNote: Record<CarId, string | null>;
  };
  screen: {
    eyebrow: string;
    heading: string;
    body: string[];
    stillAlt: string;
  };
  contact: SiteContent["contact"];
};

export function useVroom() {
  return useContent() as VroomContent;
}
