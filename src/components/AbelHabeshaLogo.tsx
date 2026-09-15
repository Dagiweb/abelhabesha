import React from 'react';

interface LogoProps {
  variant?: 'gold' | 'burgundy' | 'white' | 'dark' | 'dual';
  layout?: 'inline' | 'stacked' | 'icon';
  showText?: boolean;
  showPhone?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AbelHabeshaLogo: React.FC<LogoProps> = ({
  variant = 'dual',
  layout = 'inline',
  showText = true,
  showPhone = false,
  className = '',
  size = 'md'
}) => {
  const sizeStyles = {
    sm: { height: 32, iconSize: 32, fontSize: '11px', phoneSize: '9px', subtitleSize: '9px' },
    md: { height: 44, iconSize: 44, fontSize: '14px', phoneSize: '10px', subtitleSize: '10px' },
    lg: { height: 68, iconSize: 64, fontSize: '18px', phoneSize: '12px', subtitleSize: '11px' },
    xl: { height: 104, iconSize: 96, fontSize: '24px', phoneSize: '15px', subtitleSize: '13px' },
  }[size];

  // Colors accurately tailored to the UI theme palette
  const getColors = () => {
    switch (variant) {
      case 'gold':
        return {
          primary: '#C5A059',
          secondary: '#E2C275',
          accent: '#D4AF37',
          text: '#C5A059',
          subtext: '#EAD8C0',
          phone: '#C5A059',
          gradientId: 'ah-logo-gold'
        };
      case 'burgundy':
        return {
          primary: '#8B0000',
          secondary: '#A52A2A',
          accent: '#6E0000',
          text: '#8B0000',
          subtext: '#5A0000',
          phone: '#8B0000',
          gradientId: 'ah-logo-burgundy'
        };
      case 'white':
        return {
          primary: '#FFFFFF',
          secondary: '#F5EFEB',
          accent: '#C5A059',
          text: '#FFFFFF',
          subtext: '#EAD8C0',
          phone: '#C5A059',
          gradientId: 'ah-logo-white'
        };
      case 'dark':
        return {
          primary: '#2D241E',
          secondary: '#4A3B32',
          accent: '#8B0000',
          text: '#2D241E',
          subtext: '#8B0000',
          phone: '#2D241E',
          gradientId: 'ah-logo-dark'
        };
      case 'dual':
      default:
        return {
          primary: '#8B0000',
          secondary: '#A31515',
          accent: '#C5A059',
          text: '#8B0000',
          subtext: '#2D241E',
          phone: '#8B0000',
          gradientId: 'ah-logo-dual'
        };
    }
  };

  const colors = getColors();

  // The Exact Stylized Interlocking "AH" Monogram matching the user's uploaded logo
  const MonogramSVG = (
    <svg
      width={layout === 'stacked' ? sizeStyles.iconSize * 1.3 : sizeStyles.iconSize}
      height={layout === 'stacked' ? sizeStyles.iconSize * 1.1 : sizeStyles.iconSize}
      viewBox="0 0 240 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))' }}
    >
      <defs>
        {/* Luxury UI Gradients */}
        <linearGradient id={`${colors.gradientId}-main`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="65%" stopColor={variant === 'dual' ? '#9E1B1B' : colors.secondary} />
          <stop offset="100%" stopColor={variant === 'dual' ? colors.accent : colors.primary} />
        </linearGradient>

        <linearGradient id={`${colors.gradientId}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === 'dual' ? '#C5A059' : colors.primary} />
          <stop offset="100%" stopColor={variant === 'dual' ? '#E2C275' : colors.secondary} />
        </linearGradient>

        <linearGradient id={`${colors.gradientId}-swoosh`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === 'dual' ? '#8B0000' : colors.primary} />
          <stop offset="100%" stopColor={variant === 'dual' ? '#C5A059' : colors.secondary} />
        </linearGradient>
      </defs>

      {/* Main Unified Interlocking "AH" Glyph - exact geometry from user's logo */}
      <g>
        {/* Central Interlocking Body: Top of A, Inner Counter, Crossbar, and Right Stem of H */}
        <path
          d="
            M 76 22 
            L 124 22 
            L 92 84 
            L 142 84 
            L 174 22 
            L 204 22 
            L 156 122 
            L 126 122 
            L 138 98 
            L 85 98 
            L 73 122 
            L 43 122 
            Z
          "
          fill="none"
        />

        {/* 1. The Right Stem of H (Parallel slanted pillar with flat top and bottom) */}
        <path
          d="
            M 174 22 
            L 204 22 
            L 156 122 
            L 126 122 
            L 134 105 
            L 155 105 
            L 182 48 
            L 160 48 
            Z
          "
          fill={`url(#${colors.gradientId}-accent)`}
        />

        {/* 2. The Main "A" & Center "H" Interlocking Monogram Body */}
        {/* Includes: 
            - Slanted top apex of A
            - Inner negative triangle of A
            - Horizontal continuous crossbar uniting A and H
            - Central diagonal pillar linking A to H
        */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M 76 22 
            L 128 22 
            L 174 122 
            L 144 122 
            L 137 106 
            L 185 106 
            L 194 88 
            L 129 88 
            L 125 78 
            L 180 78 
            L 185 68 
            L 120 68 
            L 106 38 
            L 86 78 
            L 64 78 
            Z
          "
          fill="none"
        />

        {/* Accurate Solid Monogram Path based on exact user logo contours */}
        {/* A Top and Left Diagonal Stem */}
        <path
          d="
            M 72 22 
            L 122 22 
            L 86 92 
            L 52 92 
            Z
          "
          fill={`url(#${colors.gradientId}-main)`}
        />

        {/* Center Diagonal Stem (Shared right leg of A and left upright of H) */}
        <path
          d="
            M 122 22 
            L 150 22 
            L 100 124 
            L 72 124 
            Z
          "
          fill={`url(#${colors.gradientId}-main)`}
        />

        {/* Right Slanted Pillar of H */}
        <path
          d="
            M 166 22 
            L 196 22 
            L 146 124 
            L 116 124 
            Z
          "
          fill={variant === 'dual' ? `url(#${colors.gradientId}-accent)` : `url(#${colors.gradientId}-main)`}
        />

        {/* Horizontal Connector Crossbar (Bridges across both A and H in one fluid line) */}
        <path
          d="
            M 52 74 
            L 188 74 
            L 178 94 
            L 42 94 
            Z
          "
          fill={`url(#${colors.gradientId}-main)`}
        />

        {/* Inner Counter Triangle of A (Crisp negative cut) */}
        <path
          d="
            M 97 34 
            L 115 74 
            L 77 74 
            Z
          "
          fill={variant === 'white' ? '#2D241E' : '#FFFFFF'}
          opacity={variant === 'white' ? 0.95 : 1}
        />

        {/* Negative cut inside H */}
        <path
          d="
            M 148 24 
            L 165 24 
            L 141 74 
            L 124 74 
            Z
          "
          fill={variant === 'white' ? '#2D241E' : '#FFFFFF'}
          opacity={variant === 'white' ? 0.95 : 1}
        />

        {/* 3. The Signature Bottom-Left Swoosh Elements */}
        {/* Upper curved swoosh petal */}
        <path
          d="
            M 42 94 
            C 30 98, 22 106, 22 116 
            C 22 124, 32 128, 48 124 
            C 62 120, 74 110, 84 94 
            Z
          "
          fill={`url(#${colors.gradientId}-swoosh)`}
        />

        {/* Lower dynamic tapered wave tail (feather/wing motif on user's logo) */}
        <path
          d="
            M 88 108 
            C 68 122, 42 138, 14 140 
            C 9 140, 7 137, 9 133 
            C 13 126, 22 118, 38 108 
            C 52 98, 64 96, 60 102 
            C 44 112, 28 122, 20 128 
            C 42 124, 68 114, 88 104 
            Z
          "
          fill={variant === 'dual' ? `url(#${colors.gradientId}-accent)` : `url(#${colors.gradientId}-swoosh)`}
        />
      </g>
    </svg>
  );

  // Stacked Layout: Matches the EXACT composition of the user's uploaded image
  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {MonogramSVG}

        {showText && (
          <div className="flex flex-col items-center mt-2">
            <span
              className="font-sans font-black tracking-[0.14em] uppercase leading-none"
              style={{
                color: colors.text,
                fontSize: sizeStyles.fontSize,
                fontWeight: 900
              }}
            >
              ABEL HABESHA
            </span>

            <span
              className="font-ethiopic font-bold text-[#C5A059] tracking-wider mt-1"
              style={{ fontSize: sizeStyles.subtitleSize }}
            >
              አቤል ሓበሻ ባህላዊ አልባሳት
            </span>

            {showPhone && (
              <span
                className="font-sans font-extrabold tracking-[0.12em] mt-1.5"
                style={{
                  color: colors.phone,
                  fontSize: sizeStyles.phoneSize,
                  fontWeight: 800
                }}
              >
                +251 913 31 23 14
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Icon Only Layout
  if (layout === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{MonogramSVG}</div>;
  }

  // Default Inline Layout: Great for standard desktop & mobile navigation bars
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {MonogramSVG}

      {showText && (
        <div className="flex flex-col text-left">
          <span 
            className="font-sans font-black tracking-[0.12em] leading-none uppercase"
            style={{ 
              color: colors.text,
              fontSize: sizeStyles.fontSize,
              fontWeight: 900
            }}
          >
            ABEL HABESHA
          </span>

          <span 
            className="font-ethiopic font-bold text-[10px] leading-tight mt-1"
            style={{ color: colors.subtext }}
          >
            አቤል ሓበሻ ባህላዊ አልባሳት
          </span>

          {showPhone && (
            <span 
              className="font-sans font-extrabold tracking-wider mt-0.5"
              style={{ 
                color: colors.phone,
                fontSize: sizeStyles.phoneSize,
                fontWeight: 800
              }}
            >
              +251 913 31 23 14
            </span>
          )}
        </div>
      )}
    </div>
  );
};

