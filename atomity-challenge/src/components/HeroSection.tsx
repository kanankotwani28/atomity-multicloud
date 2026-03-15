import { motion } from "framer-motion";
import { tokens } from "../tokens";
import Badge from "./Badge";

const container = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.2, staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section
      className="dot-grid"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingInline: "clamp(1rem, 5vw, 4rem)",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 60% 50% at 50% 78%, color-mix(in srgb, var(--color-accent-primary) 18%, transparent), transparent), var(--gradient-page)",
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          maxWidth: "720px",
        }}
      >
        {/* Badge */}
        <motion.div variants={item}>
          <Badge variant="accent" size="md">
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: tokens.colors.accentPrimary,
                display: "inline-block",
              }}
            />
            Unified cloud cost intelligence
          </Badge>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: tokens.colors.textPrimary,
          }}
          className="text-fluid-3xl"
        >
          Stop paying for clouds you don't{" "}
          <span
            style={{
              color: tokens.colors.accentPrimary,
              textShadow: `0 10px 28px color-mix(in srgb, ${tokens.colors.accentPrimary} 24%, transparent)`,
            }}
          >
            understand.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={item}
          style={{
            color: tokens.colors.textSecondary,
            maxWidth: "540px",
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          }}
          className="text-fluid-base"
        >
          Atomity unifies AWS, Azure, Google Cloud, and on-premise infrastructure
          into one intelligent cost dashboard — with real-time optimization
          recommendations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <motion.a
            href="#platform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              borderRadius: "9999px",
              background: "var(--gradient-accent)",
              color: "#fff7ef",
              fontSize: "0.95rem",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              textDecoration: "none",
              cursor: "pointer",
              border: "none",
            }}
          >
            Start for free
          </motion.a>
          <motion.a
            href="#platform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              borderRadius: "9999px",
              background: "var(--gradient-surface)",
              color: tokens.colors.textPrimary,
              fontSize: "0.95rem",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              textDecoration: "none",
              cursor: "pointer",
              border: `1.5px solid ${tokens.colors.border}`,
            }}
          >
            See how it works
          </motion.a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={item}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            marginTop: "40px",
            color: tokens.colors.textMuted,
            fontSize: "0.75rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span>Scroll to explore</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
