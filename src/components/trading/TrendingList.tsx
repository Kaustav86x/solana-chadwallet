'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTokenBanner } from '@/hooks/useTokenBanner';

interface Props {
  activeMint?: string;
}

export default function TrendingList({ activeMint }: Props) {
  const router = useRouter();
  const { tokens, loading } = useTokenBanner();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'Live' | 'KOLs' | 'Trending'>('Trending');

  const filteredTokens = tokens.filter(t => 
    t.symbol.toLowerCase().includes(search.toLowerCase()) || 
    t.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="flex flex-col h-[800px] rounded-2xl border overflow-hidden"
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
    >
      {/* Header & Search */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <input
          type="text"
          placeholder="Search tokens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm outline-none transition-colors"
          style={{ 
            backgroundColor: 'var(--color-elevated)', 
            color: 'white',
            border: '1px solid var(--color-border)' 
          }}
        />
        
        {/* Tabs */}
        <div className="flex gap-4 mt-4 text-sm font-semibold">
          {['Live', 'KOLs', 'Trending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className="pb-2 transition-colors"
              style={{
                color: activeTab === tab ? 'white' : 'var(--color-muted)',
                borderBottom: activeTab === tab ? '2px solid var(--color-green)' : '2px solid transparent'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span style={{ color: 'var(--color-muted)' }} className="text-sm animate-pulse">Loading tokens...</span>
          </div>
        ) : (
          filteredTokens.map((token) => {
            const isPositive = token.change_24h >= 0;
            const isActive = token.mint === activeMint;

            return (
              <div
                key={token.mint}
                onClick={() => router.push(`/trade/${token.mint}`)}
                className="flex items-center justify-between p-3 mb-1 rounded-lg cursor-pointer transition-colors"
                style={{
                  backgroundColor: isActive ? 'var(--color-elevated)' : 'transparent',
                  border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-elevated)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isActive ? 'var(--color-elevated)' : 'transparent'}
              >
                <div className="flex items-center gap-3">
                  {token.image_url ? (
                    <Image 
                      src={token.image_url} 
                      alt={token.symbol} 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-gray-800 text-white">
                      {token.symbol.substring(0, 2)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">{token.symbol}</span>
                    <span className="text-xs" style={{ color: 'var(--color-dim)' }}>
                      ${token.market_cap ? (token.market_cap / 1000000).toFixed(2) + 'M' : '--'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm text-white">${token.price?.toFixed(4) || '0.00'}</span>
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: isPositive ? 'var(--color-green)' : 'var(--color-red)' }}
                  >
                    {isPositive ? '▲' : '▼'} {Math.abs(token.change_24h || 0).toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}