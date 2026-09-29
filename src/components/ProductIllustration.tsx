import React from "react";
import { Product } from "@/data/store-data";

interface Props {
  type: Product["svgType"];
  className?: string;
}

export const ProductIllustration: React.FC<Props> = ({ type, className = "w-full h-full" }) => {
  switch (type) {
    case "power_station":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="psBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#334155" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
            <linearGradient id="psAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="205" rx="105" ry="12" fill="#000" opacity="0.25" />
          {/* Top Handles */}
          <path d="M68,62 L68,42 Q68,32 78,32 L242,32 Q252,32 252,42 L252,62" fill="none" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
          {/* Main Chassis */}
          <rect x="56" y="55" width="208" height="142" rx="16" fill="url(#psBody)" stroke="#475569" strokeWidth="2.5" />
          <rect x="66" y="65" width="188" height="122" rx="10" fill="#1e293b" />
          {/* Smart OLED Screen */}
          <rect x="82" y="76" width="96" height="48" rx="6" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="92" y="98" fill="#38bdf8" fontSize="15" fontWeight="bold" fontFamily="monospace">98% 1500W</text>
          <text x="92" y="114" fill="#94a3b8" fontSize="9" fontFamily="monospace">OUT: 420W · 04.2 HRS</text>
          {/* USB-C PD Ports */}
          <rect x="192" y="76" width="50" height="48" rx="6" fill="#0f172a" stroke="#334155" />
          <rect x="202" y="86" width="12" height="5" rx="2" fill="#38bdf8" />
          <rect x="220" y="86" width="12" height="5" rx="2" fill="#38bdf8" />
          <rect x="202" y="102" width="12" height="7" rx="1" fill="#64748b" />
          <rect x="220" y="102" width="12" height="7" rx="1" fill="#64748b" />
          {/* 3x Pure Sine Wave AC Outlets */}
          <g transform="translate(82, 136)">
            {[0, 54, 108].map((x) => (
              <g key={x} transform={`translate(${x}, 0)`}>
                <rect x="0" y="0" width="42" height="38" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                <line x1="14" y1="11" x2="14" y2="20" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="28" y1="11" x2="28" y2="20" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="21" cy="27" r="2.5" fill="#94a3b8" />
              </g>
            ))}
          </g>
          {/* Accent LED Bar */}
          <rect x="76" y="62" width="168" height="3" rx="1.5" fill="url(#psAccent)" />
        </svg>
      );

    case "solar_panel":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="204" rx="120" ry="11" fill="#000" opacity="0.2" />
          <g transform="translate(32, 48) skewX(-12)">
            {[0, 68, 136, 204].map((x) => (
              <g key={x} transform={`translate(${x}, 0)`}>
                <rect x="0" y="0" width="62" height="140" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="31" y1="4" x2="31" y2="136" stroke="#1e293b" strokeWidth="1.5" />
                {[28, 56, 84, 112].map((y) => (
                  <line key={y} x1="4" y1={y} x2="58" y2={y} stroke="#1e3a8a" strokeWidth="1" />
                ))}
                <rect x="6" y="6" width="50" height="128" fill="none" stroke="#0284c7" strokeWidth="0.8" opacity="0.6" />
              </g>
            ))}
          </g>
          <circle cx="275" cy="42" r="22" fill="#facc15" opacity="0.85" />
        </svg>
      );

    case "carbon_ebike":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="205" rx="115" ry="10" fill="#000" opacity="0.25" />
          {/* Rear & Front Wheels */}
          <circle cx="88" cy="154" r="44" fill="none" stroke="#1e293b" strokeWidth="9" />
          <circle cx="88" cy="154" r="38" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="234" cy="154" r="44" fill="none" stroke="#1e293b" strokeWidth="9" />
          <circle cx="234" cy="154" r="38" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Carbon Monocoque Frame */}
          <path d="M88,154 L148,154 L204,96 L128,96 Z" fill="none" stroke="#0f172a" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M128,96 L204,96" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          {/* Seatpost & Saddle */}
          <line x1="148" y1="154" x2="118" y2="74" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
          <path d="M102,72 L134,72" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
          {/* Fork & Aero Handlebar */}
          <line x1="196" y1="70" x2="234" y2="154" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
          <path d="M184,70 L212,68" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
          <circle cx="148" cy="154" r="11" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
        </svg>
      );

    case "car_fridge":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="204" rx="108" ry="12" fill="#000" opacity="0.22" />
          <rect x="58" y="64" width="204" height="128" rx="14" fill="#334155" stroke="#475569" strokeWidth="2" />
          <rect x="58" y="64" width="204" height="28" rx="10" fill="#0f172a" />
          <rect x="74" y="102" width="110" height="74" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" opacity="0.85" />
          <text x="90" y="144" fill="#38bdf8" fontSize="18" fontWeight="bold" fontFamily="monospace">-20°C / 4°C</text>
          <circle cx="242" cy="188" r="16" fill="#0f172a" stroke="#94a3b8" strokeWidth="4" />
          <rect x="200" y="104" width="44" height="32" rx="5" fill="#020617" stroke="#38bdf8" />
        </svg>
      );

    case "espresso_machine":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="208" rx="95" ry="11" fill="#000" opacity="0.25" />
          <rect x="86" y="38" width="148" height="162" rx="12" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
          <rect x="96" y="48" width="128" height="38" rx="6" fill="#0f172a" />
          {/* Dual Pressure Gauges */}
          <circle cx="136" cy="67" r="13" fill="#020617" stroke="#f59e0b" strokeWidth="2" />
          <line x1="136" y1="67" x2="144" y2="59" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="184" cy="67" r="13" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
          <line x1="184" y1="67" x2="192" y2="61" stroke="#38bdf8" strokeWidth="2" />
          {/* Group Head & Portafilter */}
          <rect x="140" y="92" width="40" height="26" rx="4" fill="#64748b" />
          <line x1="160" y1="112" x2="222" y2="124" stroke="#b45309" strokeWidth="9" strokeLinecap="round" />
          {/* Espresso Cup & Golden Crema Stream */}
          <line x1="156" y1="118" x2="156" y2="154" stroke="#d97706" strokeWidth="3" />
          <line x1="164" y1="118" x2="164" y2="154" stroke="#d97706" strokeWidth="3" />
          <path d="M140,152 L180,152 L174,178 L146,178 Z" fill="#f8fafc" />
          <rect x="94" y="178" width="132" height="14" rx="3" fill="#475569" />
        </svg>
      );

    case "coffee_grinder":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="206" rx="75" ry="10" fill="#000" opacity="0.25" />
          <rect x="112" y="182" width="96" height="16" rx="4" fill="#334155" />
          <path d="M128,182 L138,72 L182,72 L192,182 Z" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
          <ellipse cx="160" cy="56" rx="34" ry="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="160" cy="112" r="22" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
          <rect x="144" y="150" width="32" height="32" rx="4" fill="#475569" />
        </svg>
      );

    case "laser_engraver":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="206" rx="98" ry="11" fill="#000" opacity="0.25" />
          <rect x="78" y="46" width="164" height="150" rx="14" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
          {/* Protective Orange Laser Acrylic Shield */}
          <rect x="92" y="62" width="136" height="92" rx="8" fill="#7c2d12" stroke="#f97316" strokeWidth="2" opacity="0.85" />
          {/* Laser Beam Inside */}
          <line x1="160" y1="66" x2="160" y2="138" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="160" cy="138" r="7" fill="#38bdf8" />
          <circle cx="160" cy="138" r="14" fill="#38bdf8" opacity="0.35" />
          <circle cx="212" cy="175" r="9" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
        </svg>
      );

    case "bionic_chair":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="210" rx="78" ry="9" fill="#000" opacity="0.22" />
          <rect x="136" y="30" width="48" height="22" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <rect x="122" y="56" width="76" height="78" rx="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <rect x="130" y="106" width="60" height="24" rx="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="116" y="140" width="88" height="16" rx="8" fill="#334155" />
          <line x1="160" y1="156" x2="160" y2="196" stroke="#94a3b8" strokeWidth="8" />
          <path d="M112,202 L160,190 L208,202" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case "red_light_panel":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="210" rx="72" ry="10" fill="#ef4444" opacity="0.28" />
          <rect x="108" y="26" width="104" height="176" rx="12" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
          <g transform="translate(122, 42)">
            {[0, 22, 44, 66, 88, 110, 132].map((y) =>
              [0, 19, 38, 57, 76].map((x) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="5.5"
                  fill={(x + y) % 2 === 0 ? "#fb7185" : "#e11d48"}
                />
              ))
            )}
          </g>
        </svg>
      );

    case "led_mask":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="120" rx="86" ry="86" fill="#f43f5e" opacity="0.14" />
          <path
            d="M106,68 C106,34 214,34 214,68 C220,126 198,186 160,194 C122,186 100,126 106,68 Z"
            fill="#1e1b4b"
            stroke="#fb7185"
            strokeWidth="3"
          />
          {/* Eye Shields & Mouth Cutout */}
          <ellipse cx="136" cy="98" rx="15" ry="9" fill="#090d16" stroke="#f43f5e" strokeWidth="2" />
          <ellipse cx="184" cy="98" rx="15" ry="9" fill="#090d16" stroke="#f43f5e" strokeWidth="2" />
          <ellipse cx="160" cy="156" rx="18" ry="7" fill="#090d16" stroke="#f43f5e" strokeWidth="1.5" />
          {/* Glowing Red/NIR LED Matrix */}
          {[
            [135, 65], [160, 62], [185, 65],
            [122, 125], [142, 130], [178, 130], [198, 125],
            [140, 174], [160, 178], [180, 174],
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#fb7185" />
          ))}
        </svg>
      );

    case "cold_plunge":
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="204" rx="115" ry="11" fill="#000" opacity="0.25" />
          {/* Chiller Unit */}
          <rect x="46" y="88" width="82" height="106" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <rect x="58" y="100" width="58" height="24" rx="4" fill="#020617" />
          <text x="66" y="117" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">37°F ❄️👑</text>
          <circle cx="87" cy="156" r="24" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
          {/* Insulated Plunge Tub */}
          <path d="M148,96 L276,96 L266,194 L158,194 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="212" cy="96" rx="64" ry="14" fill="#0284c7" stroke="#7dd3fc" strokeWidth="2" />
        </svg>
      );

    case "recovery_boots":
    default:
      return (
        <svg viewBox="0 0 320 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="206" rx="95" ry="10" fill="#000" opacity="0.25" />
          {[0, 66].map((offset) => (
            <g key={offset} transform={`translate(${offset}, 0)`}>
              <path
                d="M104,42 L148,42 L142,158 L172,176 Q180,184 170,192 L102,192 Z"
                fill="#0f172a"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {[68, 94, 120, 146].map((y) => (
                <line key={y} x1="104" y1={y} x2="144" y2={y} stroke="#334155" strokeWidth="2.5" />
              ))}
              <rect x="116" y="50" width="20" height="12" rx="3" fill="#10b981" />
            </g>
          ))}
        </svg>
      );
  }
};
