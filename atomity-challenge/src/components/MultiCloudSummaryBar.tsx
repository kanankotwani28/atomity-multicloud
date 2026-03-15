import { motion } from "framer-motion";
import { tokens, providers, type ProviderId } from "../tokens";
import type { ProviderData } from "../hooks/useCloudData";
import AnimatedNumber from "./AnimatedNumber";

interface MultiCloudSummaryBarProps {
  activeProvider: ProviderId | null;
  providersData: ProviderData[];
  totalCost: number;
  onToggle: (id: ProviderId) => void;
}

export default function MultiCloudSummaryBar({
  activeProvider,
  providersData,
  totalCost,
  onToggle,
}: MultiCloudSummaryBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "var(--gradient-surface)",
        borderRadius: "14px",
        border: `1px solid ${tokens.colors.border}`,
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "0.72rem",
            color: tokens.colors.textMuted,
            fontFamily: "'Inter', sans-serif",
            marginBottom: "4px",
          }}
        >
          Total multi-cloud spend - Last 30 days
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "1.3rem",
            color: tokens.colors.textPrimary,
          }}
        >
          $<AnimatedNumber value={totalCost} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {providersData.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onToggle(provider.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: `1px solid ${
                activeProvider === provider.id
                  ? providers[provider.id].color
                  : tokens.colors.border
              }`,
              backgroundColor:
                activeProvider === provider.id
                  ? `color-mix(in srgb, ${providers[provider.id].color} 10%, transparent)`
                  : tokens.colors.bgSecondary,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: tokens.colors.textSecondary,
              outline: "none",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: providers[provider.id].color,
                display: "inline-block",
              }}
            />
            {provider.label}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                color: tokens.colors.textMuted,
              }}
            >
              {provider.share}%
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
