'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getTokenInfo } from '../../lib/codex';

interface Props {
  mint: string;
}

export default function TokenInfo({ mint }: Props) {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const data = await getTokenInfo(mint);
        setInfo(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchInfo();
  }, [mint]);

  if (!info) {
    return <div className="animate-pulse h-24 w-full rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-elevated)' }} />;
  }

  const isPositive = info.change_24h >= 0;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-t-2xl border-b gap-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
      <div className="flex items-center gap-4">
        {info.image_url ? (
          <Image src={info.image_url} alt={info.symbol} width={48} height={48} className="rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold">
            {info.symbol?.substring(0, 2) || '??'}
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{info.name}</h1>
            <span className="text-sm px-2 py-1 rounded-md" style={{ backgroundColor: 'var(--color-elevated)', color: 'var(--color-muted)' }}>{info.symbol}</span>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(mint)}
            className="text-xs text-left hover:text-white transition-colors mt-1 flex items-center gap-1"
            style={{ color: 'var(--color-dim)' }}
          >
            {mint.slice(0, 6)}...{mint.slice(-4)} 📋
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-3xl font-mono text-white font-bold">
          ${info.market_cap ? (info.market_cap / 1000000).toFixed(3) + 'M' : '0.00'}
        </span>
        <span 
          className="text-sm font-semibold flex items-center gap-1"
          style={{ color: isPositive ? 'var(--color-green)' : 'var(--color-red)' }}
        >
          {isPositive ? '▲' : '▼'} ${(info.market_cap * Math.abs(info.change_24h || 0) / 100).toFixed(2)}M ({Math.abs(info.change_24h || 0).toFixed(2)}%) Today
        </span>
      </div>
    </div>
  );
}