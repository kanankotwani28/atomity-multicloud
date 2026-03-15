import { motion, useScroll, useTransform } from "framer-motion";
import { tokens } from "../tokens";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.9]);

  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "clamp(1rem, 4vw, 3rem)",
      }}
    >
      {/* Background blur layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: tokens.colors.bgPrimary,
          opacity: bgOpacity,
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          borderBottom: `1px solid ${tokens.colors.border}`,
          zIndex: -1,
        }}
      />

      {/* Logo */}
      <a
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            width="32"
            height="32"
            rx="8"
            fill={tokens.colors.accentPrimary}
          />
          <path
            d="M16 8L24 24H8L16 8Z"
            fill="white"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: tokens.colors.textPrimary,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Atomity
        </span>
      </a>

      {/* Nav links — hidden on mobile */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
        className="hidden md:flex"
      >
        {["Platform", "Pricing", "Docs", "Blog"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: tokens.colors.textSecondary,
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = tokens.colors.textPrimary)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = tokens.colors.textSecondary)
            }
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <ThemeToggle />
        <motion.a
          href="#platform"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden sm:inline-flex"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: tokens.colors.accentPrimary,
            color: "#0d0f12",
            fontSize: "0.85rem",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textDecoration: "none",
            cursor: "pointer",
            border: "none",
          }}
        >
          Start free
        </motion.a>
      </div>
    </motion.nav>
  );
}
