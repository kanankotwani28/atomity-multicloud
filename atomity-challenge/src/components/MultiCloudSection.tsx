import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { tokens, providers, type ProviderId } from "../tokens";
import { useCloudData } from "../hooks/useCloudData";
import { TopologyLoadingSkeleton } from "./Skeleton";
import ProviderNode from "./ProviderNode";
import ConnectionLines from "./ConnectionLines";
import CostPanel from "./CostPanel";
import Badge from "./Badge";
import AnimatedNumber from "./AnimatedNumber";

const gridAreas: Record<ProviderId, string> = {
  aws: "1 / 1 / 2 / 2",
  azure: "1 / 3 / 2 / 4",
  gcp: "3 / 1 / 4 / 2",
  onprem: "3 / 3 / 4 / 4",
};

const positions: Record<
  ProviderId,
  "top-left" | "top-right" | "bottom-left" | "bottom-right"
> = {
  aws: "top-left",
  azure: "top-right",
  gcp: "bottom-left",
  onprem: "bottom-right",
};

const providerIds: ProviderId[] = ["aws", "azure", "gcp", "onprem"];

export default function MultiCloudSection() {
  const [activeProvider, setActiveProvider] = useState<ProviderId | null>(null);
  const { data, isLoading, isError } = useCloudData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggle = (id: ProviderId) => {
    setActiveProvider((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="section-padding">
        <TopologyLoadingSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        className="section-padding"
        style={{
          textAlign: "center",
          color: tokens.colors.textMuted,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Failed to load cloud data. Please try again later.
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="multicloud-heading"
      className="section-padding"
      style={{
        maxWidth: "1280px",
        marginInline: "auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="accent" size="md">
            Multi-Cloud Intelligence
          </Badge>
        </motion.div>

        <motion.h2
          id="multicloud-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-fluid-2xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: tokens.colors.textPrimary,
            marginTop: "16px",
            marginBottom: "12px",
          }}
        >
          One view. <span style={{ color: tokens.colors.accentPrimary }}>Every cloud.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-fluid-base"
          style={{
            color: tokens.colors.textSecondary,
            maxWidth: "520px",
            marginInline: "auto",
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          See your AWS, Azure, Google Cloud, and on-premise costs in a single
          interactive topology - with resource-level breakdown and real-time trends.
        </motion.p>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            marginTop: "16px",
            fontSize: "0.75rem",
            color: tokens.colors.textMuted,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Tap any provider to open its data card
        </motion.p>
      </div>

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gridTemplateRows: "auto 1fr auto",
          gap: "clamp(16px, 3vw, 40px)",
          alignItems: "center",
          justifyItems: "center",
        }}
        className="topology-grid"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
          className="hidden lg:block"
        >
          <ConnectionLines activeProvider={activeProvider} />
        </div>

        {providerIds.map((id, index) => {
          const providerData = data.providers.find((p) => p.id === id)!;

          return (
            <div
              key={id}
              style={{
                gridArea: gridAreas[id],
                zIndex: 5,
              }}
            >
              <ProviderNode
                data={providerData}
                index={index}
                isActive={activeProvider === id}
                isAnyActive={activeProvider !== null}
                onClick={() => toggle(id)}
                position={positions[id]}
              />
            </div>
          );
        })}

        <div
          style={{
            gridArea: "1 / 2 / 4 / 3",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
          }}
          className={`col-span-full lg:col-auto cost-panel-shell${
            activeProvider ? " cost-panel-hidden-mobile" : ""
          }`}
        >
          <CostPanel
            activeProvider={activeProvider}
            providerData={data.providers}
            totalCost={data.totalCost}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: "clamp(2rem, 4vw, 3rem)",
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
            $<AnimatedNumber value={data.totalCost} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {data.providers.map((p) => (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "9999px",
                border: `1px solid ${
                  activeProvider === p.id ? providers[p.id].color : tokens.colors.border
                }`,
                backgroundColor:
                  activeProvider === p.id
                    ? `color-mix(in srgb, ${providers[p.id].color} 10%, transparent)`
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
                  backgroundColor: providers[p.id].color,
                  display: "inline-block",
                }}
              />
              {p.label}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  color: tokens.colors.textMuted,
                }}
              >
                {p.share}%
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1023px) {
          .topology-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto auto !important;
          }
          .topology-grid > div:nth-child(5) {
            grid-area: 2 / 1 / 3 / 3 !important;
          }
          .topology-grid > div:nth-child(1) {
            grid-area: 1 / 1 / 2 / 2 !important;
          }
          .topology-grid > div:nth-child(2) {
            grid-area: 1 / 2 / 2 / 3 !important;
          }
          .topology-grid > div:nth-child(3) {
            grid-area: 3 / 1 / 4 / 2 !important;
          }
          .topology-grid > div:nth-child(4) {
            grid-area: 3 / 2 / 4 / 3 !important;
          }
        }
        @media (max-width: 639px) {
          .topology-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(5, auto) !important;
          }
          .cost-panel-hidden-mobile {
            display: none !important;
          }
          .topology-grid > div:nth-child(1) { grid-area: 1 / 1 !important; }
          .topology-grid > div:nth-child(2) { grid-area: 2 / 1 !important; }
          .topology-grid > div:nth-child(5) { grid-area: 3 / 1 !important; }
          .topology-grid > div:nth-child(3) { grid-area: 4 / 1 !important; }
          .topology-grid > div:nth-child(4) { grid-area: 5 / 1 !important; }
        }
        button:focus-visible {
          outline: 2px solid var(--color-accent-primary);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
