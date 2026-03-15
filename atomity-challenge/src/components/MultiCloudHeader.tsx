import { motion } from "framer-motion";
import { tokens } from "../tokens";
import Badge from "./Badge";

interface MultiCloudHeaderProps {
  isInView: boolean;
}

export default function MultiCloudHeader({ isInView }: MultiCloudHeaderProps) {
  return (
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
  );
}
