import Image from 'next/image';
import Link from 'next/link';
import AuthButton from '@/components/shared/AuthButton';
import lightlogo from '../../../public/assests/light.png';

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[72px] border-b backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(13, 15, 20, 0.85)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src={lightlogo}
          alt="Chadlogo"
          width={32}
          height={32}
          className="rounded-md object-contain"
        />
        <span className="text-white font-bold text-lg tracking-tight">
          ChadWallet
        </span>
      </Link>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: 'var(--color-muted)' }}>
        <Link
          href="/"
          className="transition-colors hover:text-white"
        >
          Home
        </Link>
        <Link
        // {/* using the official Mint address for Wrapped SOL */}
          href="/trade/So11111111111111111111111111111111111111112"
          className="transition-colors hover:text-white"
        >
          Trade
        </Link>
        <a
          href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white"
        >
          Android
        </a>
        <a
          href="https://apps.apple.com/us/app/chadwallet/id6757367474"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white"
        >
          iOS
        </a>
      </div>

      {/* Auth */}
      <AuthButton />
    </nav>
  );
}
