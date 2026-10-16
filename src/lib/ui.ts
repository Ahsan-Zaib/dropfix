import { cn } from "@/lib/utils";

const base =
  "btn-fx inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants = {
  primary: "bg-primary text-primary-foreground hover:brightness-110 shadow-soft",
  navy: "bg-navy text-navy-foreground hover:bg-navy/90",
  emergency: "bg-emergency text-emergency-foreground hover:brightness-105 shadow-soft",
  whatsapp: "bg-whatsapp text-navy hover:brightness-105",
  outline: "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
  ghostLight: "border border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10",
} as const;

const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-base py-3.5" } as const;

export function btn(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md", extra?: string) {
  return cn(base, variants[variant], sizes[size], extra);
}
