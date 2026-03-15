import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { tokens, type ProviderId } from "../tokens";
import { useCloudData } from "../hooks/useCloudData";
import { TopologyLoadingSkeleton } from "./Skeleton";
import ProviderNode from "./ProviderNode";
import ConnectionLines from "./ConnectionLines";
import CostPanel from "./CostPanel";
import MultiCloudHeader from "./MultiCloudHeader";
import MultiCloudSummaryBar from "./MultiCloudSummaryBar";
import { gridAreas, positions, providerIds } from "./multiCloudLayout";

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
      <MultiCloudHeader isInView={isInView} />

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
          const providerData = data.providers.find((provider) => provider.id === id)!;

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

      <MultiCloudSummaryBar
        activeProvider={activeProvider}
        providersData={data.providers}
        totalCost={data.totalCost}
        onToggle={toggle}
      />

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
