import TrendingList from '@/components/trading/TrendingList';
import TokenInfo from '@/components/trading/TokenInfo';
import PriceChart from '@/components/trading/PriceChart';
import SwapPanel from '@/components/trading/SwapPanel';

interface TradePageProps {
  params: Promise<{ token: string }>;
}

export default async function TradePage({ params }: TradePageProps) {
  const resolvedParams = await params;
  const tokenMint = resolvedParams.token;

  return (
    <div className="min-h-screen flex flex-col pt-[72px]" style={{ backgroundColor: 'var(--color-bg)' }}>
      <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 flex flex-col lg:flex-row gap-4">
        
        {/* Left Panel: Trending List */}
        <aside className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
          <TrendingList activeMint={tokenMint} />
        </aside>

        {/* Middle Panel: Info & Chart */}
        <section className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex flex-col rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
            <TokenInfo mint={tokenMint} />
            <PriceChart mint={tokenMint} />
          </div>
          
          <div className="flex-1 rounded-lg border border-dashed flex flex-col items-center justify-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-dim)' }}>
          <div className="text-4xl mb-3">📡</div>
        <h3 className="text-lg font-semibold text-white">
        Live Trades
        </h3>

        <p className="text-sm mt-2 max-w-xs text-center">
        Real-time Codex WebSocket stream will appear here once connected.
        </p>
        </div>
        </section>

        {/* Right Panel: Execution (Jupiter) */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-4">
          <SwapPanel mint={tokenMint} />
        </aside>

      </main>
    </div>
  );
}