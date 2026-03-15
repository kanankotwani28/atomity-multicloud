import { motion } from "framer-motion";
import { tokens } from "../tokens";

const container = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.15, staggerChildren: 0.12 },
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
          gap: "28px",
          maxWidth: "620px",
        }}
      >
        <motion.h1
          variants={item}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: tokens.colors.textPrimary,
          }}
          className="text-fluid-3xl"
        >
          Unified cloud cost intelligence
        </motion.h1>

        <motion.a
          variants={item}
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
          Start
        </motion.a>
      </motion.div>
    </section>
  );
}
