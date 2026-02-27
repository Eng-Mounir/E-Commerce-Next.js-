export default function Loading() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        /* ── Core spinner ── */
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        /* ── Pulse glow ── */
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(9,9,11,.08); }
          50%      { box-shadow: 0 0 0 18px rgba(9,9,11,0); }
        }

        /* ── Logo pop in ── */
        @keyframes logoPop {
          0%   { opacity:0; transform:scale(.6) rotate(-12deg); }
          60%  { transform:scale(1.1) rotate(3deg); }
          80%  { transform:scale(.97) rotate(-1deg); }
          100% { opacity:1; transform:scale(1) rotate(0deg); }
        }

        /* ── Text fade up ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── Dot bounce ── */
        @keyframes dotBounce {
          0%,80%,100% { transform:translateY(0); opacity:.3; }
          40%         { transform:translateY(-6px); opacity:1; }
        }

        /* ── Progress bar ── */
        @keyframes progress {
          0%   { width: 0%; }
          20%  { width: 25%; }
          50%  { width: 55%; }
          75%  { width: 75%; }
          90%  { width: 88%; }
          100% { width: 95%; }
        }

        /* ── Background shimmer ── */
        @keyframes bgShimmer {
          0%,100% { opacity: .4; }
          50%     { opacity: .7; }
        }

        /* ── Skeleton pulse ── */
        @keyframes skelPulse {
          0%,100% { opacity:.06; }
          50%     { opacity:.12; }
        }

        .ring-outer {
          width: 72px; height: 72px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #09090b;
          border-right-color: #09090b;
          animation: spinRing 1s cubic-bezier(.4,0,.2,1) infinite;
        }
        .ring-inner {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-bottom-color: #71717a;
          border-left-color: #71717a;
          animation: spinReverse 1.4s cubic-bezier(.4,0,.2,1) infinite;
        }
        .logo-pop  { animation: logoPop  .7s cubic-bezier(.16,1,.3,1) .1s both; }
        .text-a1   { animation: fadeUp   .5s cubic-bezier(.16,1,.3,1) .3s both; }
        .text-a2   { animation: fadeUp   .5s cubic-bezier(.16,1,.3,1) .45s both; }
        .progress-bar { animation: progress 3s cubic-bezier(.4,0,.2,1) .2s both; }

        .dot-1 { animation: dotBounce 1.2s ease-in-out .0s infinite; }
        .dot-2 { animation: dotBounce 1.2s ease-in-out .15s infinite; }
        .dot-3 { animation: dotBounce 1.2s ease-in-out .30s infinite; }

        .skel { animation: skelPulse 1.8s ease-in-out infinite; }
        .skel-2 { animation: skelPulse 1.8s ease-in-out .2s infinite; }
        .skel-3 { animation: skelPulse 1.8s ease-in-out .4s infinite; }
        .skel-4 { animation: skelPulse 1.8s ease-in-out .6s infinite; }

        .bg-shimmer { animation: bgShimmer 3s ease-in-out infinite; }
        .pulse-logo { animation: pulseGlow 2s ease-in-out infinite; }
      `}</style>

      <div className="dm fixed inset-0 bg-white z-[9999] flex flex-col">

        {/* ── Background decorations ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Dot grid */}
          <div className="bg-shimmer absolute inset-0"
            style={{backgroundImage:'radial-gradient(circle at 1px 1px,#e4e4e7 1px,transparent 0)',backgroundSize:'28px 28px'}} />
          {/* Dark slab top-right */}
          <div className="absolute -top-10 -right-10 w-[40vw] h-[50vh] bg-zinc-950 opacity-[.03]"
            style={{clipPath:'polygon(0 0,100% 0,100% 70%,0 100%)'}} />
          {/* Soft glow center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-zinc-100 rounded-full blur-3xl opacity-60" />
        </div>

        {/* ── Top progress bar ── */}
        <div className="relative z-10 h-0.5 bg-zinc-100 w-full shrink-0">
          <div className="progress-bar h-full bg-zinc-950 rounded-full" />
        </div>

        {/* ── Navbar skeleton ── */}
        <div className="relative z-10 border-b border-zinc-100 px-6 lg:px-16 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="skel w-8 h-8 bg-zinc-950 rounded-xl" />
            <div className="skel-2 w-24 h-4 bg-zinc-200 rounded-full" />
          </div>
          <div className="hidden md:flex items-center gap-2">
            {[40, 36, 48, 44].map((w, i) => (
              <div key={i} className="skel h-7 bg-zinc-100 rounded-full" style={{width:`${w}px`, animationDelay:`${i*0.1}s`}} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="skel w-8 h-8 bg-zinc-100 rounded-full" />
            <div className="skel-2 w-8 h-8 bg-zinc-100 rounded-full" />
            <div className="skel-3 w-20 h-8 bg-zinc-950 rounded-full opacity-10" />
          </div>
        </div>

        {/* ── Center spinner + logo ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8">

          {/* Spinner rings */}
          <div className="relative flex items-center justify-center">
            <div className="ring-outer absolute" />
            <div className="ring-inner absolute" />

            {/* Logo in center */}
            <div className="pulse-logo logo-pop w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center shadow-lg z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="text-center">
            <div className="text-a1 flex items-center justify-center gap-1 mb-1">
              <span className="cg text-2xl font-bold text-zinc-900 tracking-tight">ShopMart</span>
            </div>
            <div className="text-a2 flex items-center justify-center gap-1.5">
              <span className="text-[12px] text-zinc-400 font-light">Loading</span>
              <span className="dot-1 inline-block w-1 h-1 bg-zinc-400 rounded-full" />
              <span className="dot-2 inline-block w-1 h-1 bg-zinc-400 rounded-full" />
              <span className="dot-3 inline-block w-1 h-1 bg-zinc-400 rounded-full" />
            </div>
          </div>

          {/* ── Page skeleton preview ── */}
          <div className="w-full max-w-2xl px-6 mt-2">
            {/* Hero skeleton */}
            <div className="skel w-full h-28 bg-zinc-950 rounded-3xl opacity-[.06] mb-4" />
            {/* Card row skeleton */}
            <div className="grid grid-cols-4 gap-3 mb-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skel h-20 bg-zinc-200 rounded-2xl" style={{animationDelay:`${i*0.12}s`}} />
                  <div className="skel-2 h-2.5 bg-zinc-200 rounded-full w-3/4" style={{animationDelay:`${i*0.12}s`}} />
                  <div className="skel-3 h-2 bg-zinc-100 rounded-full w-1/2" style={{animationDelay:`${i*0.12}s`}} />
                </div>
              ))}
            </div>
            {/* Text lines skeleton */}
            <div className="flex flex-col gap-2">
              <div className="skel h-2 bg-zinc-100 rounded-full w-full" />
              <div className="skel-2 h-2 bg-zinc-100 rounded-full w-4/5" />
              <div className="skel-3 h-2 bg-zinc-100 rounded-full w-2/3" />
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-10 border-t border-zinc-100 px-6 lg:px-16 py-3 flex items-center justify-between shrink-0">
          <p className="text-[10px] text-zinc-300 font-medium">© 2024 ShopMart</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[10px] text-zinc-300 font-medium">All systems operational</p>
          </div>
        </div>

      </div>
    </>
  )
}