import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/** Fades/slides elements into view as the user scrolls. Targets sections and cards automatically. */
export function AutoReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("main section > div > *, main .card-lift, main [data-reveal]"),
    ).filter((el) => !el.closest(".no-reveal") && !el.dataset['revealed']);
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("is-visible");
            io.unobserve(el);
            // drop effect classes once finished so hover effects work normally
            if (el.dataset['fx']) setTimeout(() => el.classList.remove("reveal-img", "reveal-write", "reveal-type", "is-visible"), 2200);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) return; // already visible — leave alone
      el.dataset['revealed'] = "1";
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
      io.observe(el);
    });
    // "Being written" headings + paragraphs, and wiping image reveals
    const fx: Array<[string, string]> = [
      ["main section h2, main section h3", "reveal-write"],
      ["main section p", "reveal-type"],
      ["main section img", "reveal-img"],
    ];
    fx.forEach(([sel, cls]) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.closest(".no-reveal") || el.dataset['fx']) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        el.dataset['fx'] = "1";
        el.classList.add(cls);
        io.observe(el);
      });
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

/** Thin progress bar at the top showing scroll progress. */
export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div id="scroll-progress" className="fixed inset-x-0 top-0 z-[60] h-1 origin-left scale-x-0 bg-aqua-gradient" aria-hidden />;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return <div key={pathname} className="animate-page">{children}</div>;
}
