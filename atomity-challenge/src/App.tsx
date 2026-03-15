import { ThemeProvider } from "./hooks/ThemeProvider";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MultiCloudSection from "./components/MultiCloudSection";
import { tokens } from "./tokens";

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <HeroSection />
        <section id="platform">
          <MultiCloudSection />
        </section>
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "32px 24px",
          borderTop: `1px solid ${tokens.colors.border}`,
          color: tokens.colors.textMuted,
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
        }}
      >
      </footer>
    </ThemeProvider>
  );
}
