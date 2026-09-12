"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useVroom } from "@/content/schema-ext";
import { CARS, PROFILE, type Car } from "@/content/media";
import { Lattice } from "@/components/webgl/lattice";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--glimpse-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: the glimpse. A diamond-shaped clip opens from a
 * pinpoint to cover the block — the shape of one gap in the lattice. */
function Glimpse({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  // A polymorphic tag's prop union is too wide for TS to resolve on its own.
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-glimpse="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-glimpse-rule=""
      className={`h-px w-full origin-[left_center] bg-cream/20 rtl:origin-[right_center] ${className ?? ""}`}
      style={delayVar(delay)}
    />
  );
}

function SectionHead({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div>
      <Glimpse className="label text-terracotta">{eyebrow}</Glimpse>
      <Glimpse as="h2" className="text-display font-display mt-3 max-w-[24ch] text-cream" delay={60}>
        {heading}
      </Glimpse>
      <Rule className="mt-6" delay={110} />
      {intro ? (
        <Glimpse className="text-lead mt-6 max-w-[68ch] leading-[1.8] text-cream-2" delay={160}>
          {intro}
        </Glimpse>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useVroom();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/12 bg-ground/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[86rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[0.94rem] font-semibold text-cream">{c.brand.name}</span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-cream-2 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="latin tnum ms-auto shrink-0 text-[0.86rem] font-semibold text-terracotta transition-opacity hover:opacity-75 md:ms-0"
        >
          {PROFILE.phone}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-cream/25 px-3 py-1.5 text-[0.7rem] text-cream-2 transition-colors hover:border-terracotta hover:text-cream"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- hero -- */

function Hero({ selected }: { selected: number }) {
  const c = useVroom();
  const car = CARS[selected];

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="mx-auto max-w-[86rem] px-5 pt-10 sm:px-8 lg:pt-14">
        <Glimpse className="label text-terracotta">{c.hero.eyebrow}</Glimpse>
        <Glimpse as="h1" className="text-hero font-display mt-4 max-w-[20ch] text-cream" delay={70}>
          {c.hero.headline}
        </Glimpse>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Glimpse delay={30}>
            <Lattice
              src={car.frames[0]}
              alt={c.hero.latticeAlt}
              className="aspect-[4/3] w-full border border-cream/12 bg-ground-2"
            />
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <span className="latin font-display text-[0.98rem] text-cream">
                {car.marque} {car.model}
              </span>
              <span className="fine text-cream-3">{c.hero.marquesLabel}</span>
            </div>
          </Glimpse>

          <div>
            <Glimpse className="text-lead max-w-[50ch] leading-[1.85] text-cream-2" delay={140}>
              {c.hero.sub}
            </Glimpse>

            <Glimpse className="mt-9 flex flex-wrap items-center gap-3" delay={220}>
              <a
                href={PROFILE.phoneHref}
                className="bg-terracotta px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href="#range"
                className="border border-cream/30 px-6 py-3 text-[0.9rem] text-cream transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {c.hero.secondaryCta}
              </a>
            </Glimpse>

            <Glimpse className="mt-12 grid grid-cols-2 gap-px border-t border-cream/15" delay={300}>
              {[
                { k: c.hero.followersLabel, v: PROFILE.followers },
                { k: c.hero.postsLabel, v: PROFILE.posts },
              ].map((s) => (
                <div key={s.k} className="pt-6">
                  <div className="tnum font-display text-[1.7rem] leading-none text-cream">
                    <span className="latin">{s.v}</span>
                  </div>
                  <div className="label mt-2 text-cream-2">{s.k}</div>
                </div>
              ))}
            </Glimpse>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- range -- */

function RangeCard({
  car,
  index,
  selected,
  onSelect,
}: {
  car: Car;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const c = useVroom();
  const note = c.range.phoneNote[car.id];

  return (
    <Glimpse as="li" delay={Math.min(index, 5) * 60}>
      <button
        onClick={onSelect}
        aria-pressed={selected}
        className={`w-full border p-5 text-start transition-colors ${
          selected ? "border-terracotta bg-ground-2" : "border-cream/15 hover:border-cream/35"
        }`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-ground-2">
          <img
            src={car.frames[0]}
            alt={`${car.marque} ${car.model}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <span className="tnum font-body text-[0.76rem] text-cream-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          {car.repeated ? <span className="label text-terracotta">{c.range.repeatedTag}</span> : null}
        </div>
        <h3 className="latin font-display mt-1.5 text-[1.1rem] leading-tight text-cream">
          {car.marque} {car.model}
        </h3>
        {car.billing ? <p className="fine mt-1 text-cream-2">{car.billing}</p> : null}
        <p className="fine mt-2 text-cream-3">
          {car.year ? <span className="latin">{car.year}</span> : null}
        </p>

        {note ? <p className="fine mt-2 text-terracotta">{note}</p> : null}

        <a
          href={car.postUrl}
          target="_blank"
          rel="noreferrer noopener"
          onClick={(e) => e.stopPropagation()}
          className="fine mt-3 inline-block text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:text-terracotta"
        >
          {c.range.viewPost}
        </a>
      </button>
    </Glimpse>
  );
}

function Range({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (i: number) => void;
}) {
  const c = useVroom();

  return (
    <section id="range" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead eyebrow={c.range.eyebrow} heading={c.range.heading} intro={c.range.intro} />

      <ul className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {CARS.map((car, i) => (
          <RangeCard
            key={car.id}
            car={car}
            index={i}
            selected={i === selected}
            onSelect={() => setSelected(i)}
          />
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- screen -- */

function Screen() {
  const c = useVroom();

  return (
    <section id="screen" className="border-y border-cream/12 bg-ground-2 py-24 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <Glimpse className="label text-terracotta">{c.screen.eyebrow}</Glimpse>
            <Glimpse as="h2" className="text-display font-display mt-3 max-w-[20ch] text-cream" delay={60}>
              {c.screen.heading}
            </Glimpse>
            <Rule className="mt-6" delay={110} />
            {c.screen.body.map((p, i) => (
              <Glimpse
                key={p.slice(0, 24)}
                className="text-lead mt-6 max-w-[52ch] leading-[1.85] text-cream-2"
                delay={160 + i * 90}
              >
                {p}
              </Glimpse>
            ))}
          </div>

          <Glimpse delay={100} className="overflow-hidden bg-ground">
            <img
              src="/media/urus-3.jpg"
              alt={c.screen.stillAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </Glimpse>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- contact -- */

function Contact() {
  const c = useVroom();

  return (
    <section id="contact" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <Glimpse as="h2" className="text-display font-display max-w-[16ch] text-cream">
        {c.contact.heading}
      </Glimpse>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <Glimpse delay={60}>
          <div className="label text-terracotta">{c.contact.addressLabel}</div>
          <p className="mt-3 text-[0.94rem] leading-relaxed text-cream-2">{c.contact.address}</p>
          <a
            href={c.contact.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="fine mt-3 inline-block text-cream underline decoration-cream/40 underline-offset-4"
          >
            Google Maps
          </a>
        </Glimpse>

        <Glimpse delay={130}>
          <div className="label text-terracotta">{c.contact.phoneLabel}</div>
          <a
            href={PROFILE.phoneHref}
            className="latin tnum mt-3 block text-[1.05rem] text-cream transition-opacity hover:opacity-75"
          >
            {c.contact.phones[0]}
          </a>
        </Glimpse>

        <Glimpse delay={200}>
          <div className="label text-terracotta">{c.brand.name}</div>
          <div className="mt-3 flex flex-col gap-2 text-[0.9rem]">
            <a
              href={c.contact.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
            >
              Instagram
            </a>
            <a
              href={c.contact.facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
            >
              Facebook
            </a>
          </div>
        </Glimpse>

        <Glimpse delay={270}>
          <a
            href={PROFILE.phoneHref}
            className="inline-block bg-terracotta px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
          >
            {c.contact.cta}
          </a>
        </Glimpse>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- export -- */

export function Sections() {
  // The lattice in the hero and the range list below share one selection,
  // the same control pattern used elsewhere in this project.
  const [selected, setSelected] = useState(0);

  return (
    <main>
      <Hero selected={selected} />
      <Range selected={selected} setSelected={setSelected} />
      <Screen />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useVroom();

  return (
    <footer className="border-t border-cream/12 bg-ground py-10">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="font-display text-[0.9rem] font-semibold text-cream">{c.brand.name}</span>
        </div>
        <p className="fine text-cream-2">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
