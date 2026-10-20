import { useEffect } from "react";
import { animate, inView } from "framer-motion";
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
             if (el.dataset['fx']) setTimeout(() => el.classList.remove("reveal-img", "reveal-write", "reveal-type"), 2200);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    // Framer Motion 3D reveal: fade + slide up + rotateX, staggered among siblings, once.
    const mobile = window.innerWidth < 768;
    const hidden = `perspective(1000px) translateY(${mobile ? 24 : 40}px) rotateX(${mobile ? 6 : 12}deg)`;
    const targets = els.filter((el) => el.getBoundingClientRect().top >= window.innerHeight * 0.9);
    targets.forEach((el) => {
      el.dataset['revealed'] = "1";
      el.style.opacity = "0";
      el.style.transform = hidden;
      el.style.transformOrigin = "50% 100%";
    });
    const stopInView = targets.length
      ? inView(targets, (target) => {
          const el = target as HTMLElement;
          const idx = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
          animate(el, { opacity: 1, transform: "perspective(1000px) translateY(0px) rotateX(0deg)" }, {
            duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: (idx % 6) * 0.09,
          }).then(() => { el.style.transform = ""; el.style.opacity = ""; });
        }, { margin: "0px 0px -40px 0px", amount: 0.12 })
      : () => {};
    // "Being written" headings + paragraphs, and wiping image reveals
    const fx: Array<[string, string]> = [
      ["main section h2, main section h3", "reveal-write"],
      ["main section p", "reveal-type"],
      ["main section .photo-frame, main section img:not(.photo-frame img)", "reveal-img"],
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
    return () => { io.disconnect(); stopInView(); };
  }, [pathname]);
  return null;
}

/** Subtle 3D tilt + lift on cards and photo blocks (pointer devices only). */
export function HoverTilt() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let current: HTMLElement | null = null;
    const reset = (el: HTMLElement) => { el.style.transform = ""; el.style.boxShadow = ""; };
    const onMove = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const el = (t?.closest("main .card-lift") || t?.closest("main .photo-frame")) as HTMLElement | null;
      if (current && current !== el) reset(current);
      current = el;
      if (!el || el.style.opacity === "0") return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform .25s ease-out, box-shadow .3s ease";
      el.style.transform = `perspective(900px) translateY(-6px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      el.style.boxShadow = "var(--shadow-lift)";
    };
    const onLeave = () => { if (current) reset(current); current = null; };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => { document.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); };
  }, []);
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
