interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  borderRadius?: string;
}

export default function Skeleton({
  width = "100%",
  height = "20px",
  className = "",
  borderRadius,
}: SkeletonProps) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{
        display: "block",
        width,
        height,
        ...(borderRadius ? { borderRadius } : {}),
      }}
      aria-hidden="true"
    />
  );
}

export function TopologyLoadingSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridTemplateRows: "auto 1fr auto",
        gap: "clamp(16px, 3vw, 40px)",
        alignItems: "center",
        justifyItems: "center",
        padding: "clamp(2rem, 4vw, 4rem)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Top-left */}
      <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
        <Skeleton width="120px" height="120px" borderRadius="12px" />
      </div>
      {/* Top-right */}
      <div style={{ gridArea: "1 / 3 / 2 / 4" }}>
        <Skeleton width="120px" height="120px" borderRadius="12px" />
      </div>
      {/* Center */}
      <div style={{ gridArea: "1 / 2 / 4 / 3" }}>
        <Skeleton width="320px" height="300px" borderRadius="16px" />
      </div>
      {/* Bottom-left */}
      <div style={{ gridArea: "3 / 1 / 4 / 2" }}>
        <Skeleton width="120px" height="120px" borderRadius="12px" />
      </div>
      {/* Bottom-right */}
      <div style={{ gridArea: "3 / 3 / 4 / 4" }}>
        <Skeleton width="120px" height="120px" borderRadius="12px" />
      </div>
    </div>
  );
}
