'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Jupiter: { init: (config: object) => void; };
  }
}

export default function SwapPanel({ mint }: { mint: string }) {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');

//   useEffect(() => {
//     const script = document.createElement('script');
//     // depricated 
//     script.src = 'https://terminal.jup.ag/main-v3.js'; 
//     script.onload = () => {
//       if (window.Jupiter) {
//         window.Jupiter.init({
//           displayMode: 'integrated',
//           integratedTargetId: 'jupiter-terminal',
//           endpoint: process.env.NEXT_PUBLIC_ALCHEMY_SOLANA_RPC,
//           defaultExplorer: 'Solana Explorer',
//           initialInputMint: 'So11111111111111111111111111111111111111112', // SOL
//           initialOutputMint: mint,
//         });
//       }
//     };
//     document.body.appendChild(script);
//   }, [mint]);

  return (
    <div className="flex flex-col w-full p-4 rounded-2xl border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setMode('buy')}
          className="flex-1 py-3 font-bold rounded-xl transition-all"
          style={{ backgroundColor: mode === 'buy' ? 'var(--color-green)' : 'var(--color-elevated)', color: mode === 'buy' ? '#000' : 'var(--color-muted)' }}
        >
          Buy
        </button>
        <button 
          onClick={() => setMode('sell')}
          className="flex-1 py-3 font-bold rounded-xl transition-all"
          style={{ backgroundColor: mode === 'sell' ? 'var(--color-red)' : 'var(--color-elevated)', color: mode === 'sell' ? '#fff' : 'var(--color-muted)' }}
        >
          Sell
        </button>
      </div>
      
      <div className="flex gap-2 mb-4">
        {['$10', '$50', '$100'].map(amt => (
          <button 
            key={amt} 
            className="flex-1 py-2 rounded-lg border text-sm transition-colors hover:border-white"
            style={{ borderColor: 'var(--color-border)', color: 'white' }}
          >
            {amt}
          </button>
        ))}
        <button className="px-3 py-2 rounded-lg border flex items-center justify-center transition-colors hover:border-white" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
          ⊞
        </button>
      </div>
      
      <div className="flex-1 min-h-[400px] rounded-xl flex items-center justify-center"
        style={{
        backgroundColor: "var(--color-elevated)",
        border: "1px dashed var(--color-border)",
        }}
    >
    <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">
        Jupiter Swap
        </h3>

        <p style={{ color: "var(--color-muted)" }}>
        Swap integrations are temporarily disabled.
        </p>

        <p
        className="text-xs mt-2"
        style={{ color: "var(--color-dim)" }}
        >
        Ready for Jupiter V6 / Ultra API integration.
        </p>
    </div>
    </div>
    </div>
  );
}