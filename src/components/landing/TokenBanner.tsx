'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTokenBanner, BannerToken } from '@/hooks/useTokenBanner';

interface TokenPillProps {
  token: BannerToken;
  onClick: () => void;
}

function TokenPill({ token, onClick }: TokenPillProps) {
  // Compute if the change is positive based on the real number
  const isPositive = (token.change_24h || 0) >= 0;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2 rounded-full border mx-2 shrink-0 transition-colors cursor-pointer group"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-green)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Real images from API, with a fallback emoji if missing */}
      {token.image_url ? (
        <Image src={token.image_url} alt={token.symbol} width={24} height={24} className="rounded-full" />
      ) : (
        <span className="text-base leading-none">🪙</span>
      )}
      
      <span className="text-white font-semibold text-sm">{token.symbol}</span>
      
      <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
        ${token.price ? token.price.toFixed(4) : '0.00'}
      </span>
      
      <span
        className="text-xs font-medium"
        style={{ color: isPositive ? 'var(--color-green)' : 'var(--color-red)' }}
      >
        {isPositive ? '▲' : '▼'} {Math.abs(token.change_24h || 0).toFixed(2)}%
      </span>
    </button>
  );
}

interface TokenBannerProps {
  direction?: 'left' | 'right';
}

export default function TokenBanner({ direction = 'left' }: TokenBannerProps) {
  const router = useRouter();
  
  // HOOK MUST BE INSIDE THE COMPONENT
  const { tokens, loading } = useTokenBanner();

  // Don't render the marquee if it's still loading or empty to prevent layout breaking
  if (loading || tokens.length === 0) {
    return (
      <div className="border-y py-3 h-[60px] flex items-center justify-center" style={{ borderColor: 'var(--color-border)' }}>
        <span className="text-sm animate-pulse" style={{ color: 'var(--color-muted)' }}>Loading live markets...</span>
      </div>
    );
  }

  // Repeating the array so the seamless loop never leaves a gap
  const infitokens = [...tokens, ...tokens, ...tokens, ...tokens];

  return (
    <div
      className="overflow-hidden border-y py-3 marquee-track"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className={`flex ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
        {infitokens.map((token, i) => (
          <TokenPill
            key={`${token.mint}-${i}`} // Use mint + index for a truly unique key
            token={token}
            onClick={() => router.push(`/trade/${token.mint}`)}
          />
        ))}
      </div>
    </div>
  );
}