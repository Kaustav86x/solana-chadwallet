import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t py-14 px-6"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image src="/assets/light.png" alt="ChadWallet" width={24} height={24} className="object-contain" />
              <span className="text-white font-bold">ChadWallet</span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              The premier Solana memecoin trading platform, built for speed and simplicity.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 text-sm">
            <div>
              <div className="text-white font-semibold mb-4">Product</div>
              <div className="flex flex-col gap-3" style={{ color: 'var(--color-muted)' }}>
                <Link href="/trade" className="hover:text-white transition-colors">Trade</Link>
                <a
                  href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  iOS App
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Android App
                </a>
              </div>
            </div>

            <div>
              <div className="text-white font-semibold mb-4">Powered by</div>
              <div className="flex flex-col gap-3" style={{ color: 'var(--color-muted)' }}>
                <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Solana</a>
                <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Jupiter</a>
                <a href="https://privy.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privy</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-dim)' }}
        >
          <span>© 2025 ChadWallet. All rights reserved.</span>
          <span>
            Trading cryptocurrency involves significant risk. Never invest more than you can afford to lose.
          </span>
        </div>
      </div>
    </footer>
  );
}
