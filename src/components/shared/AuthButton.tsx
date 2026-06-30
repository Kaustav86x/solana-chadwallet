'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function AuthButton() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  // Don't render until Privy has initialised
  if (!ready) {
    return (
      <div className="h-9 w-24 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--color-card)' }} />
    );
  }

  if (authenticated) {
    const label =
      user?.google?.email?.split('@')[0] ||
      user?.apple?.email?.split('@')[0] ||
      'Wallet';

    return (
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          {/* Green dot — connected indicator */}
          <span
            className="w-2 h-2 rounded-full pulse-green"
            style={{ backgroundColor: 'var(--color-green)' }}
          />
          <span style={{ color: 'var(--color-muted)' }}>{label}</span>
        </div>
        <button
          onClick={logout}
          className="px-4 py-1.5 text-sm rounded-lg border transition-colors hover:border-[#EF4444] hover:text-[#EF4444]"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-muted)',
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="px-5 py-2 text-sm font-semibold rounded-lg transition-colors"
      style={{ backgroundColor: 'var(--color-green)', color: '#000' }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = 'var(--color-green-dim)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = 'var(--color-green)')
      }
    >
      Sign in
    </button>
  );
}
