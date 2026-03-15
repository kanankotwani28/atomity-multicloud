import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { tokens } from "../tokens";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          color: tokens.colors.textSecondary,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {isDark ? "Dark" : "Light"}
      </span>
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        style={{
          position: "relative",
          width: "44px",
          height: "24px",
          borderRadius: "9999px",
          border: `1.5px solid ${tokens.colors.border}`,
          backgroundColor: isDark
            ? tokens.colors.accentPrimary
            : tokens.colors.bgSecondary,
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          outline: "none",
        }}
      >
        <motion.div
          animate={{ x: isDark ? 21 : 3 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: tokens.colors.surface,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </motion.button>
    </div>
  );
}
