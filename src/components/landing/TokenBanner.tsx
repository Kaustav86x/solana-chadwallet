'use client';

import { useRouter } from 'next/navigation';

// Mock token data — replaced with live Codex.io data on Day 2
const MOCK_TOKENS = [
  { symbol: 'BONK',     price: '$0.00002', change: '+12.4%', positive: true,  mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', emoji: '🐶' },
  { symbol: 'WIF',      price: '$2.84',    change: '+5.2%',  positive: true,  mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', emoji: '🎩' },
  { symbol: 'POPCAT',   price: '$0.43',    change: '-3.1%',  positive: false, mint: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr', emoji: '🐱' },
  { symbol: 'MOODENG',  price: '$0.17',    change: '+28.9%', positive: true,  mint: 'ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzc8yy', emoji: '🦛' },
  { symbol: 'GOAT',     price: '$0.31',    change: '+8.7%',  positive: true,  mint: 'CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump', emoji: '🐐' },
  { symbol: 'PNUT',     price: '$0.62',    change: '-12.3%', positive: false, mint: '2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump', emoji: '🐿️' },
  { symbol: 'FARTCOIN', price: '$0.89',    change: '+44.2%', positive: true,  mint: '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump', emoji: '💨' },
  { symbol: 'DUMB',     price: '$0.0029',  change: '+26.7%', positive: true,  mint: 'DUMBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', emoji: '🤡' },
  { symbol: 'TROLL',    price: '$0.02',    change: '+4.1%',  positive: true,  mint: 'TROLLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', emoji: '👺' },
  { symbol: 'BELIEF',   price: '$0.02',    change: '+14.5%', positive: true,  mint: 'BELIEFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', emoji: '✨' },
];

interface TokenPillProps {
  token: (typeof MOCK_TOKENS)[0];
  onClick: () => void;
}

function TokenPill({ token, onClick }: TokenPillProps) {
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
      <span className="text-base leading-none">{token.emoji}</span>
      <span className="text-white font-semibold text-sm">{token.symbol}</span>
      <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
        {token.price}
      </span>
      <span
        className="text-xs font-medium"
        style={{ color: token.positive ? 'var(--color-green)' : 'var(--color-red)' }}
      >
        {token.change}
      </span>
    </button>
  );
}

interface TokenBannerProps {
  direction?: 'left' | 'right';
}

export default function TokenBanner({ direction = 'left' }: TokenBannerProps) {
  const router = useRouter();

  // Quadruple the array so the seamless loop never shows a gap
  const tokens = [...MOCK_TOKENS, ...MOCK_TOKENS, ...MOCK_TOKENS, ...MOCK_TOKENS];

  return (
    <div
      className="overflow-hidden border-y py-3 marquee-track"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className={`flex ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
        {tokens.map((token, i) => (
          <TokenPill
            key={`${token.symbol}-${i}`}
            token={token}
            onClick={() => router.push(`/trade/${token.mint}`)}
          />
        ))}
      </div>
    </div>
  );
}
