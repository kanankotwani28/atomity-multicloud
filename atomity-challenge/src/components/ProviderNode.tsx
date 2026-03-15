import { motion } from "framer-motion";
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

function ProviderLogo({ id }: { id: ProviderId }) {
  const providerColor = providers[id].color;

  switch (id) {
    case "aws":
      return (
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
          {/* AWS text */}
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
          {/* Smile arrow */}
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
          {/* Azure icon - stylized shape */}
          <path
            d="M12 32L26 8L32 20H22L38 32H12Z"
            fill={providerColor}
            opacity="0.9"
          />
          {/* Azure text */}
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
          {/* Google Cloud colored dots - larger */}
          <circle cx="14" cy="14" r="6" fill="#EA4335" />
          <circle cx="26" cy="14" r="6" fill="#4285F4" />
          <circle cx="20" cy="26" r="6" fill="#34A853" />
          <circle cx="8" cy="26" r="6" fill="#FBBC05" />
          {/* Google Cloud text */}
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
          {/* Server rack */}
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
          {/* Server rows */}
          {[7, 16, 25].map((y) => (
            <g key={y}>
              <rect x="8" y={y} width="16" height="5" rx="1" fill={providerColor} opacity="0.3" />
              <circle cx="27" cy={y + 2.5} r="1.8" fill={providerColor} opacity="0.8" />
              {/* Separator line */}
              <line x1="6" y1={y + 8} x2="30" y2={y + 8} stroke={providerColor} opacity="0.15" strokeWidth="0.5" />
            </g>
          ))}
          {/* Status LED */}
          <circle cx="10" cy="35" r="1.2" fill="#22d46a" />
          {/* Text */}
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
  const isDimmed = isAnyActive && !isActive;
  const providerColor = providers[data.id].color;

  return (
    <motion.button
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${data.label} — $${data.totalCost.toLocaleString()}/mo. Click to focus.`}
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
      {/* Octagon */}
      <div
        style={{
          position: "relative",
          width: "clamp(100px, 14vw, 148px)",
          height: "clamp(100px, 14vw, 148px)",
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          backgroundColor: tokens.colors.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isActive
            ? `0 0 24px color-mix(in srgb, ${providerColor} 40%, transparent)`
            : "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Active glow background */}
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

        {/* Border overlay via box-shadow inside the clip */}
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

        {/* Service icons inside octagon */}
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

      {/* Logo */}
      <ProviderLogo id={data.id} />

      {/* Provider name */}
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

      {/* Cost */}
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

      {/* Trend badge */}
      <Badge
        variant={data.trend > 0 ? "error" : "success"}
        size="sm"
      >
        {data.trend > 0 ? "↑" : "↓"} {Math.abs(data.trend).toFixed(1)}%
      </Badge>

      {/* Focus outline */}
      <style>{`
        button:focus-visible {
          outline: 2px solid ${tokens.colors.accentPrimary};
          outline-offset: 4px;
          border-radius: 12px;
        }
      `}</style>
    </motion.button>
  );
}
