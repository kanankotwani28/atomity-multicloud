import type { ReactNode } from "react";
import { tokens } from "../tokens";

type BadgeVariant = "success" | "error" | "warning" | "neutral" | "accent";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<
  BadgeVariant,
  { bg: string; color: string; border: string }
> = {
  success: {
    bg: `color-mix(in srgb, ${tokens.colors.accentSuccess} 12%, transparent)`,
    color: tokens.colors.accentSuccess,
    border: `color-mix(in srgb, ${tokens.colors.accentSuccess} 30%, transparent)`,
  },
  error: {
    bg: `color-mix(in srgb, ${tokens.colors.accentError} 12%, transparent)`,
    color: tokens.colors.accentError,
    border: `color-mix(in srgb, ${tokens.colors.accentError} 30%, transparent)`,
  },
  warning: {
    bg: `color-mix(in srgb, ${tokens.colors.accentWarning} 12%, transparent)`,
    color: tokens.colors.accentWarning,
    border: `color-mix(in srgb, ${tokens.colors.accentWarning} 30%, transparent)`,
  },
  neutral: {
    bg: tokens.colors.bgSecondary,
    color: tokens.colors.textSecondary,
    border: tokens.colors.border,
  },
  accent: {
    bg: tokens.colors.accentPrimary10,
    color: tokens.colors.accentPrimary,
    border: tokens.colors.borderAccent,
  },
};

const sizeStyles: Record<BadgeSize, { padding: string; fontSize: string }> = {
  sm: { padding: "2px 8px", fontSize: "0.65rem" },
  md: { padding: "4px 12px", fontSize: "0.75rem" },
};

export default function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
}: BadgeProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: "9999px",
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        backgroundColor: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
