import { siteConfig } from "@/lib/site-data";

export function IntroSplash() {
  return (
    <div id="intro-splash" aria-hidden="true" className="intro-splash" data-state="active">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,161,74,0.17),transparent_32%),radial-gradient(circle_at_75%_22%,rgba(102,169,255,0.14),transparent_26%),radial-gradient(circle_at_50%_85%,rgba(244,156,162,0.12),transparent_28%)]" />
      <div className="intro-loader-mesh absolute inset-0" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="intro-loader-pulse absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,161,74,0.22),rgba(214,161,74,0.04)_34%,transparent_68%)] blur-2xl" />

        <div className="relative flex h-[18rem] w-[18rem] items-center justify-center md:h-[22rem] md:w-[22rem]">
          <div className="intro-loader-ring absolute inset-0" />
          <div className="intro-loader-ring intro-loader-ring--reverse absolute inset-[10%]" />
          <div className="intro-loader-ring intro-loader-ring--accent absolute inset-[20%]" />
          <div className="absolute inset-[31%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),rgba(255,255,255,0.02)_62%)] backdrop-blur-sm" />
          <div className="intro-loader-scan absolute left-1/2 top-1/2 h-px w-[120%] -translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10">
            <p className="eyebrow text-[0.68rem] text-brass/85">Launching Promnix</p>
            <p className="mt-4 font-display text-[clamp(4.5rem,15vw,7rem)] leading-none text-cream">
              {siteConfig.shortName}
            </p>
            <p className="mt-3 text-[0.7rem] tracking-[0.45em] text-silver uppercase">
              {siteConfig.role}
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-md">
          <p className="text-sm tracking-[0.18em] text-silver uppercase">First impression in motion</p>
          <div className="mt-4 h-px w-[min(22rem,80vw)] overflow-hidden rounded-full bg-white/10">
            <div className="intro-loader-progress h-full w-full" />
          </div>
          <p className="mt-4 text-xs leading-6 text-silver/75">
            {siteConfig.name} opens with a short cinematic intro before the work comes into focus.
          </p>
        </div>
      </div>
    </div>
  );
}
