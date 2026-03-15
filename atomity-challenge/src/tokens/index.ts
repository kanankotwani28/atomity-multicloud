export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    bgSecondary: "var(--color-bg-secondary)",
    surface: "var(--color-surface)",
    surfaceElevated: "var(--color-surface-elevated)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    textMuted: "var(--color-text-muted)",
    accentPrimary: "var(--color-accent-primary)",
    accentPrimary10: "var(--color-accent-primary-10)",
    accentSuccess: "var(--color-accent-success)",
    accentError: "var(--color-accent-error)",
    accentWarning: "var(--color-accent-warning)",
    border: "var(--color-border)",
    borderAccent: "var(--color-border-accent)",
    aws: "var(--color-aws)",
    azure: "var(--color-azure)",
    gcp: "var(--color-gcp)",
    onprem: "var(--color-onprem)",
  },
} as const;

export type ProviderId = "aws" | "azure" | "gcp" | "onprem";

export const providers = {
  aws:    { id: "aws"    as const, label: "AWS",          color: "var(--color-aws)" },
  azure:  { id: "azure"  as const, label: "Azure",        color: "var(--color-azure)" },
  gcp:    { id: "gcp"    as const, label: "Google Cloud",  color: "var(--color-gcp)" },
  onprem: { id: "onprem" as const, label: "On-Premise",    color: "var(--color-onprem)" },
} as const;

export const resourceTypes = [
  { id: "cpu",     label: "CPU",     factor: 0.38 },
  { id: "gpu",     label: "GPU",     factor: 0.22 },
  { id: "ram",     label: "RAM",     factor: 0.18 },
  { id: "storage", label: "Storage", factor: 0.12 },
  { id: "network", label: "Network", factor: 0.10 },
] as const;
