import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle } from "lucide-react";
import { btn } from "@/lib/ui";
import { telLink, waLink, type WaKind } from "@/config/site";

type Size = "sm" | "md" | "lg";

export function CallButton({ size = "md", label = "Call Now", variant = "emergency" as const, className }: { size?: Size; label?: string; variant?: "emergency" | "navy" | "outline" | "ghostLight"; className?: string }) {
  const href = telLink();
  const cls = btn(variant, size, className);
  if (!href)
    return (
      <Link to="/contact" className={cls} title="Phone number not yet configured">
        <Phone className="size-4" /> {label}
      </Link>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <Phone className="size-4" /> {label}
    </a>
  );
}

export function WhatsAppButton({ kind = "general", size = "md", label = "WhatsApp Us", extra, className }: { kind?: WaKind; size?: Size; label?: string; extra?: string; className?: string }) {
  const href = waLink(kind, extra);
  const cls = btn("whatsapp", size, className);
  if (!href)
    return (
      <Link to="/contact" className={cls} title="WhatsApp number not yet configured">
        <MessageCircle className="size-4" /> {label}
      </Link>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <MessageCircle className="size-4" /> {label}
    </a>
  );
}
