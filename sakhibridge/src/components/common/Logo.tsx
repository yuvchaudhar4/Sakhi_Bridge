import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  inverted = false
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Sakhibridge Mark: Two paths arching up to form a bridge and arch of agency */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl ${
          inverted
            ? 'bg-white text-stone-900 shadow-sm'
            : 'bg-stone-900 text-stone-50'
        } transition-transform hover:scale-[1.02]`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          aria-hidden="true"
        >
          {/* Foundation baseline */}
          <path
            d="M5 24C9 24 10 22 12 18C14 14 16 11 19 11C23 11 25 15 27 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Connecting Bridge Arch */}
          <path
            d="M5 19C8 19 11 16 13 13C15 10 18 8 22 8C25 8 26 10 27 15"
            stroke={inverted ? '#0d9488' : '#2dd4bf'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0.2 0"
          />
          {/* Human Agency / Sanctuary Keystone */}
          <circle
            cx="16"
            cy="7"
            r="2.2"
            fill={inverted ? '#0f766e' : '#5eead4'}
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-semibold tracking-tight uppercase ${titleSizes[size]} ${
            inverted ? 'text-white' : 'text-stone-900'
          }`}
          style={{ letterSpacing: '0.04em' }}
        >
          SAKHIBRIDGE
        </span>
        {showTagline && (
          <span
            className={`text-[10px] tracking-normal mt-0.5 font-normal ${
              inverted ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            From Safety to Independence
          </span>
        )}
      </div>
    </div>
  );
};
