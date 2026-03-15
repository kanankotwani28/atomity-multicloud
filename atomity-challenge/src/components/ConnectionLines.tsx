import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { providers, type ProviderId } from "../tokens";

interface ConnectionLinesProps {
  activeProvider: ProviderId | null;
}

interface PathConfig {
  id: ProviderId;
  d: string;
}

const paths: PathConfig[] = [
  { id: "aws",    d: "M 105 105 H 280 V 265" },
  { id: "azure",  d: "M 895 105 H 720 V 265" },
  { id: "gcp",    d: "M 105 595 H 280 V 435" },
  { id: "onprem", d: "M 895 595 H 720 V 435" },
];

export default function ConnectionLines({ activeProvider }: ConnectionLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, amount: 0.3 });
  const [linesDrawn, setLinesDrawn] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLinesDrawn(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 700"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
      }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Glow filters per provider */}
        {paths.map((p) => (
          <filter key={`filter-${p.id}`} id={`glow-${p.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {paths.map((path, index) => {
        const isActive = activeProvider === path.id;
        const isDimmed = activeProvider !== null && !isActive;
        const providerColor = providers[path.id].color;

        return (
          <g key={path.id}>
            {/* Main path */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={providerColor}
              strokeWidth={isActive ? 2.5 : 1.5}
              strokeDasharray="6 8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: isInView ? 1 : 0,
                opacity: isInView ? (isDimmed ? 0.15 : isActive ? 0.8 : 0.5) : 0,
              }}
              transition={{
                duration: 1,
                delay: index * 0.15 + 0.4,
                ease: "easeOut",
              }}
              filter={isActive ? `url(#glow-${path.id})` : undefined}
              style={{
                transition: "opacity 0.4s ease",
              }}
            />

            {/* Animated particles */}
            {linesDrawn &&
              [0, 0.5, 1.0].map((begin, pIdx) => (
                <circle
                  key={`particle-${path.id}-${pIdx}`}
                  r={isActive ? 4 : 2.5}
                  fill={providerColor}
                  opacity={isDimmed ? 0.15 : isActive ? 0.9 : 0.6}
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 0 6px ${providerColor})`
                      : undefined,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <animateMotion
                    dur="2.2s"
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                    path={path.d}
                  />
                </circle>
              ))}
          </g>
        );
      })}
    </svg>
  );
}
