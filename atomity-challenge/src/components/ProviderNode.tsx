import { AnimatePresence, motion } from "framer-motion";
import { tokens, providers, type ProviderId } from "../tokens";
import type { ProviderData } from "../hooks/useCloudData";
import Badge from "./Badge";
import AnimatedNumber from "./AnimatedNumber";

interface ProviderNodeProps {
  data: ProviderData;
  index: number;
  isActive: boolean;
  isAnyActive: boolean;
  onClick: () => void;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const positionOffsets: Record<
  ProviderNodeProps["position"],
  { x: number; y: number }
> = {
  "top-left": { x: -60, y: -60 },
  "top-right": { x: 60, y: -60 },
  "bottom-left": { x: -60, y: 60 },
  "bottom-right": { x: 60, y: 60 },
};

const popupAnchors: Record<
  ProviderNodeProps["position"],
  { top?: string; bottom?: string; left?: string; right?: string }
> = {
  "top-left": { top: "calc(100% + 14px)", left: "0" },
  "top-right": { top: "calc(100% + 14px)", right: "12px" },
  "bottom-left": { bottom: "calc(100% + 14px)", left: "0" },
  "bottom-right": { bottom: "calc(100% + 14px)", right: "12px" },
};

function ProviderLogo({ id }: { id: ProviderId }) {
  const providerColor = providers[id].color;

  switch (id) {
    case "aws":
      return (
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
          <text
            x="40"
            y="20"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={providerColor}
            fontFamily="'Inter', sans-serif"
            fontWeight="800"
            fontSize="22"
            letterSpacing="-0.5"
          >
            aws
          </text>
          <path
            d="M15 30 Q40 40 65 30"
            stroke={providerColor}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M58 26 L65 30 L58 33"
            stroke={providerColor}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "azure":
      return (
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
          <path
            d="M12 32L26 8L32 20H22L38 32H12Z"
            fill={providerColor}
            opacity="0.9"
          />
          <text
            x="56"
            y="24"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={providerColor}
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="14"
          >
            Azure
          </text>
        </svg>
      );
    case "gcp":
      return (
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="6" fill="var(--color-gcp)" />
          <circle cx="26" cy="14" r="6" fill="var(--color-accent-primary)" />
          <circle cx="20" cy="26" r="6" fill="var(--color-azure)" />
          <circle cx="8" cy="26" r="6" fill="var(--color-onprem)" />
          <text
            x="54"
            y="18"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={providerColor}
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="10"
          >
            Google
          </text>
          <text
            x="54"
            y="30"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={providerColor}
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="10"
          >
            Cloud
          </text>
        </svg>
      );
    case "onprem":
      return (
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
          <rect
            x="4"
            y="2"
            width="28"
            height="36"
            rx="3"
            stroke={providerColor}
            strokeWidth="2"
            fill="none"
          />
          {[7, 16, 25].map((y) => (
            <g key={y}>
              <rect x="8" y={y} width="16" height="5" rx="1" fill={providerColor} opacity="0.3" />
              <circle cx="27" cy={y + 2.5} r="1.8" fill={providerColor} opacity="0.8" />
              <line x1="6" y1={y + 8} x2="30" y2={y + 8} stroke={providerColor} opacity="0.15" strokeWidth="0.5" />
            </g>
          ))}
          <circle cx="10" cy="35" r="1.2" fill="var(--color-accent-primary)" />
          <text
            x="56"
            y="18"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={providerColor}
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="10"
          >
            On-
          </text>
          <text
            x="56"
            y="30"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={providerColor}
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="10"
          >
            Premise
          </text>
        </svg>
      );
  }
}

export default function ProviderNode({
  data,
  index,
  isActive,
  isAnyActive,
  onClick,
  position,
}: ProviderNodeProps) {
  const offset = positionOffsets[position];
  const popupAnchor = popupAnchors[position];
  const isDimmed = isAnyActive && !isActive;
  const providerColor = providers[data.id].color;
  const topResources = [...data.resources].sort((a, b) => b.cost - a.cost).slice(0, 3);

  return (
    <motion.div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        zIndex: isActive ? 20 : 5,
      }}
    >
      <motion.button
        onClick={onClick}
        aria-pressed={isActive}
        aria-label={`${data.label} - $${data.totalCost.toLocaleString()}/mo. Click to focus.`}
        initial={{
          x: offset.x,
          y: offset.y,
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: isDimmed ? 0.35 : 1,
          scale: isActive ? 1.06 : 1,
        }}
        transition={{
          delay: index * 0.12 + 0.3,
          type: "spring",
          stiffness: 200,
          damping: 22,
        }}
        whileHover={{ scale: isActive ? 1.08 : 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
          padding: "8px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "clamp(100px, 14vw, 148px)",
            height: "clamp(100px, 14vw, 148px)",
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            background: "var(--gradient-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isActive
              ? `0 10px 28px color-mix(in srgb, ${providerColor} 24%, transparent)`
              : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {isActive && (
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: `color-mix(in srgb, ${providerColor} 15%, transparent)`,
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: "2px",
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              border: `2px solid ${isActive ? providerColor : tokens.colors.border}`,
              borderRadius: 0,
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "16px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.12 + 0.5 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "3px",
                  backgroundColor: `color-mix(in srgb, ${providerColor} 20%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${providerColor} 50%, transparent)`,
                }}
              />
            ))}
          </div>
        </div>

        <span
          className="text-fluid-sm"
          style={{
            fontWeight: 600,
            color: tokens.colors.textPrimary,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {data.label}
        </span>

        <ProviderLogo id={data.id} />

        <span
          className="text-fluid-lg"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            color: providerColor,
          }}
        >
          $<AnimatedNumber value={data.totalCost} />
          <span
            style={{
              fontSize: "0.65em",
              color: tokens.colors.textMuted,
              fontWeight: 400,
            }}
          >
            /mo
          </span>
        </span>

        <Badge variant={data.trend > 0 ? "error" : "success"} size="sm">
          {data.trend > 0 ? "↑" : "↓"} {Math.abs(data.trend).toFixed(1)}%
        </Badge>

        <style>{`
          button:focus-visible {
            outline: 2px solid ${tokens.colors.accentPrimary};
            outline-offset: 4px;
            border-radius: 12px;
          }
        `}</style>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: position.startsWith("top") ? -8 : 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: position.startsWith("top") ? -6 : 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              width: "min(280px, 72vw)",
              ...popupAnchor,
              padding: "14px",
              borderRadius: "16px",
              background: "var(--gradient-surface)",
              border: `1px solid ${providerColor}`,
              boxShadow: `0 16px 34px color-mix(in srgb, ${providerColor} 18%, transparent)`,
              backdropFilter: "blur(14px)",
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
                    backgroundColor: "color-mix(in srgb, var(--color-accent-primary) 8%, transparent)",
                    border: `1px solid ${tokens.colors.border}`,
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
                      backgroundColor: "color-mix(in srgb, var(--color-accent-primary) 10%, transparent)",
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}
