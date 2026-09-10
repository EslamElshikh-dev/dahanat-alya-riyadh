import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Frame,
  Hammer,
  PaintRoller,
  PanelsTopLeft,
  PanelTop,
  Shapes,
  ShieldCheck,
  SquareStack,
  Wallpaper,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Frame,
  Hammer,
  PaintRoller,
  PanelsTopLeft,
  PanelTop,
  Shapes,
  ShieldCheck,
  SquareStack,
  Wallpaper,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? PaintRoller;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
}
