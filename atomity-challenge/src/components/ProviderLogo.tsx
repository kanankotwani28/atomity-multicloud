import { providers, type ProviderId } from "../tokens";

interface ProviderLogoProps {
  id: ProviderId;
}

export default function ProviderLogo({ id }: ProviderLogoProps) {
  const providerColor = providers[id].color;

  switch (id) {
    case "aws":
      return (
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
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
          <path
            d="M12 32L26 8L32 20H22L38 32H12Z"
            fill={providerColor}
            opacity="0.9"
          />
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
          <circle cx="14" cy="14" r="6" fill="var(--color-gcp)" />
          <circle cx="26" cy="14" r="6" fill="var(--color-accent-primary)" />
          <circle cx="20" cy="26" r="6" fill="var(--color-azure)" />
          <circle cx="8" cy="26" r="6" fill="var(--color-onprem)" />
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
          {[7, 16, 25].map((y) => (
            <g key={y}>
              <rect x="8" y={y} width="16" height="5" rx="1" fill={providerColor} opacity="0.3" />
              <circle cx="27" cy={y + 2.5} r="1.8" fill={providerColor} opacity="0.8" />
              <line x1="6" y1={y + 8} x2="30" y2={y + 8} stroke={providerColor} opacity="0.15" strokeWidth="0.5" />
            </g>
          ))}
          <circle cx="10" cy="35" r="1.2" fill="var(--color-accent-primary)" />
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
