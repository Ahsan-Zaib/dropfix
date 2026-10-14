import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { projects } from "@/lib/images";
import { DemoNote } from "./Layout";
import { cn } from "@/lib/utils";

export function BeforeAfter() {
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const p = projects[idx];

  const move = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const go = (d: number) => { setIdx((i) => (i + d + projects.length) % projects.length); setPos(50); };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div
          ref={ref}
          className="relative aspect-[16/10] select-none overflow-hidden rounded-3xl shadow-lift touch-none cursor-ew-resize"
          onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
          onPointerMove={(e) => dragging.current && move(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <img src={p.after} alt={`After: ${p.category}`} className="absolute inset-0 size-full object-cover" draggable={false} />
          <div className="absolute inset-0 transition-[clip-path] duration-75" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={p.before} alt={`Before: ${p.category}`} className="absolute inset-0 size-full object-cover" draggable={false} />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold tracking-widest text-navy-foreground">BEFORE</span>
          <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-widest text-primary-foreground">AFTER</span>
          <div className="absolute inset-y-0 w-0.5 bg-background" style={{ left: `${pos}%` }}>
            <div
              role="slider" tabIndex={0} aria-label="Compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
              onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((v) => Math.max(0, v - 5)); if (e.key === "ArrowRight") setPos((v) => Math.min(100, v + 5)); }}
              className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-navy shadow-lift focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MoveHorizontal className="size-5" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex gap-3">
            {projects.map((pr, i) => (
              <button key={pr.id} onClick={() => { setIdx(i); setPos(50); }} aria-label={`Show ${pr.category}`} className={cn("h-16 w-24 overflow-hidden rounded-xl border-2 transition", i === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100")}>
                <img src={pr.after} alt="" className="size-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous project" className="flex size-11 items-center justify-center rounded-full border hover:border-primary hover:text-primary"><ChevronLeft className="size-5" /></button>
            <button onClick={() => go(1)} aria-label="Next project" className="flex size-11 items-center justify-center rounded-full border hover:border-primary hover:text-primary"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-muted p-8">
        <DemoNote>Demonstration images — not real customer work</DemoNote>
        <p className="eyebrow mt-6">{p.category}</p>
        <dl className="mt-4 grid gap-5 text-sm">
          <div><dt className="font-semibold text-navy">The problem</dt><dd className="mt-1 text-muted-foreground">{p.problem}</dd></div>
          <div><dt className="font-semibold text-navy">Work completed</dt><dd className="mt-1 text-muted-foreground">{p.work}</dd></div>
          <div><dt className="font-semibold text-navy">The result</dt><dd className="mt-1 text-muted-foreground">{p.result}</dd></div>
        </dl>
      </div>
    </div>
  );
}
