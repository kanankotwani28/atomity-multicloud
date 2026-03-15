import { motion } from "framer-motion";
import { tokens } from "../tokens";
import type { ProviderData } from "../hooks/useCloudData";
import AnimatedNumber from "./AnimatedNumber";

interface ProviderPopupProps {
  data: ProviderData;
  providerColor: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  popupAnchor: { top?: string; bottom?: string; left?: string; right?: string };
}

export default function ProviderPopup({
  data,
  providerColor,
  position,
  popupAnchor,
}: ProviderPopupProps) {
  const topResources = [...data.resources].sort((a, b) => b.cost - a.cost).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: position.startsWith("top") ? -4 : 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.985, y: position.startsWith("top") ? -3 : 3 }}
      transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        width: "min(280px, 72vw)",
        ...popupAnchor,
        padding: "14px",
        borderRadius: "16px",
        background: `linear-gradient(180deg,
          color-mix(in srgb, var(--color-bg-primary) 95%, ${providerColor} 5%),
          color-mix(in srgb, var(--color-bg-secondary) 97%, ${providerColor} 3%)
        )`,
        border: `1px solid color-mix(in srgb, ${providerColor} 42%, var(--color-border))`,
        boxShadow: `0 18px 38px color-mix(in srgb, ${providerColor} 16%, transparent), 0 10px 24px rgba(0, 0, 0, 0.12)`,
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: tokens.colors.textPrimary,
            }}
          >
            {data.label}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: tokens.colors.textMuted,
            }}
          >
            Live provider snapshot
          </div>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "1rem",
            color: providerColor,
          }}
        >
          $<AnimatedNumber value={data.totalCost} />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        {[
          { label: "Instances", value: data.instanceCount.toString() },
          { label: "Efficiency", value: `${data.efficiency}%` },
          { label: "Share", value: `${data.share}%` },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              borderRadius: "12px",
              padding: "10px 8px",
              backgroundColor:
                "color-mix(in srgb, var(--color-bg-primary) 90%, var(--color-accent-primary) 10%)",
              border: `1px solid color-mix(in srgb, ${providerColor} 16%, var(--color-border))`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.64rem",
                color: tokens.colors.textMuted,
                marginBottom: "4px",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "0.78rem",
                color: tokens.colors.textPrimary,
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {topResources.map((resource) => (
          <div
            key={resource.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.74rem",
                color: tokens.colors.textSecondary,
              }}
            >
              {resource.label}
            </div>
            <div
              style={{
                height: "6px",
                width: "100%",
                minWidth: "64px",
                borderRadius: "999px",
                backgroundColor:
                  "color-mix(in srgb, var(--color-bg-primary) 88%, var(--color-accent-primary) 12%)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${resource.percentage}%`,
                  height: "100%",
                  borderRadius: "999px",
                  background: "var(--gradient-accent)",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: providerColor,
              }}
            >
              ${resource.cost}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
