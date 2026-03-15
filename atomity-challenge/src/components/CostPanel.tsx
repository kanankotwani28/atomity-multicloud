import { motion, AnimatePresence } from "framer-motion";
import { tokens, providers, resourceTypes, type ProviderId } from "../tokens";
import type { ProviderData } from "../hooks/useCloudData";
import AnimatedNumber from "./AnimatedNumber";
import Badge from "./Badge";

interface CostPanelProps {
  activeProvider: ProviderId | null;
  providerData: ProviderData[];
  totalCost: number;
}

function getDisplayData(
  activeProvider: ProviderId | null,
  providerData: ProviderData[],
  totalCost: number
) {
  if (activeProvider) {
    const p = providerData.find((d) => d.id === activeProvider);
    if (p) {
      return {
        label: p.label,
        cost: p.totalCost,
        color: providers[p.id].color,
        resources: p.resources,
        instances: p.instanceCount,
        efficiency: p.efficiency,
        share: p.share,
      };
    }
  }
  // Aggregate all providers
  const aggregatedResources = resourceTypes.map((rt) => {
    const cost = providerData.reduce((sum, pd) => {
      const r = pd.resources.find((r) => r.id === rt.id);
      return sum + (r?.cost ?? 0);
    }, 0);
    return {
      id: rt.id,
      label: rt.label,
      cost,
      percentage: rt.factor * 100,
    };
  });

  return {
    label: "All Providers",
    cost: totalCost,
    color: tokens.colors.accentPrimary,
    resources: aggregatedResources,
    instances: providerData.reduce((s, p) => s + p.instanceCount, 0),
    efficiency: Math.round(
      providerData.reduce((s, p) => s + p.efficiency, 0) / providerData.length
    ),
    share: 100,
  };
}

export default function CostPanel({
  activeProvider,
  providerData,
  totalCost,
}: CostPanelProps) {
  const display = getDisplayData(activeProvider, providerData, totalCost);
  const maxCost = Math.max(...display.resources.map((r) => r.cost));

  return (
    <motion.div
      className="cost-panel-container"
      layout
      style={{
        width: "clamp(260px, 38vw, 460px)",
        borderRadius: "16px",
        backgroundColor: tokens.colors.surface,
        border: `1.5px solid ${activeProvider ? display.color : tokens.colors.border}`,
        boxShadow: activeProvider
          ? `0 0 30px color-mix(in srgb, ${display.color} 20%, transparent), 0 4px 20px rgba(0,0,0,0.08)`
          : "0 4px 20px rgba(0,0,0,0.06)",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: tokens.colors.textPrimary,
              }}
            >
              {display.label}
            </span>
            <Badge variant="accent" size="sm">
              LIVE
            </Badge>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "1.3rem",
              color: display.color,
            }}
          >
            $<AnimatedNumber value={display.cost} />
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            color: tokens.colors.textMuted,
          }}
        >
          Resource cost breakdown · Last 30 days
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: tokens.colors.border,
          marginInline: "24px",
        }}
      />

      {/* Bar chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProvider ?? "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="img"
          aria-label="Resource cost bar chart"
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "8px",
            padding: "20px 24px",
          }}
        >
          {display.resources.map((resource, index) => {
            const pct = maxCost > 0 ? (resource.cost / maxCost) * 100 : 0;

            return (
              <div
                key={resource.id}
                className="resource-row"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {/* Value above bar */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: tokens.colors.textSecondary,
                  }}
                >
                  $<AnimatedNumber value={resource.cost} />
                </span>

                {/* Bar track */}
                <div
                  style={{
                    height: "clamp(80px, 14vw, 160px)",
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    position: "relative",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    className="resource-bar"
                    initial={{ height: "4%" }}
                    animate={{ height: `${Math.max(pct, 4)}%` }}
                    whileHover={{
                      scaleX: 1.06,
                      backgroundColor: display.color,
                      boxShadow: `0 0 16px color-mix(in srgb, ${display.color} 50%, transparent)`,
                    }}
                    transition={{
                      delay: index * 0.09 + 0.5,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      width: "70%",
                      borderRadius: "4px 4px 2px 2px",
                      backgroundColor: `color-mix(in srgb, ${display.color} 72%, transparent)`,
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  />
                </div>

                {/* Label below bar */}
                <span
                  className="resource-label text-fluid-xs"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: tokens.colors.textMuted,
                  }}
                >
                  {resource.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Footer stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1px",
          margin: "0 16px 16px",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: tokens.colors.border,
        }}
      >
        {[
          {
            label: "Instances",
            value: display.instances,
            suffix: "",
          },
          {
            label: "Efficiency",
            value: display.efficiency,
            suffix: "%",
          },
          {
            label: "Share",
            value: display.share,
            suffix: "%",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "12px 8px",
              textAlign: "center",
              backgroundColor: tokens.colors.bgSecondary,
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
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
                fontSize: "0.9rem",
                color: tokens.colors.textPrimary,
              }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
