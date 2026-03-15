import { AnimatePresence, motion } from "framer-motion";
import { tokens, providers } from "../tokens";
import type { ProviderData } from "../hooks/useCloudData";
import Badge from "./Badge";
import AnimatedNumber from "./AnimatedNumber";
import ProviderLogo from "./ProviderLogo";
import ProviderPopup from "./ProviderPopup";

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
          x: {
            delay: index * 0.12 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 22,
          },
          y: {
            delay: index * 0.12 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 22,
          },
          opacity: { duration: 0.12, ease: "easeOut" },
          scale: { duration: 0.12, ease: "easeOut" },
        }}
        whileHover={{ scale: isActive ? 1.08 : 1.04 }}
        whileTap={{ scale: 0.985 }}
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
                  duration: 0.2,
                  ease: "easeOut",
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
          <ProviderPopup
            data={data}
            providerColor={providerColor}
            position={position}
            popupAnchor={popupAnchor}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
