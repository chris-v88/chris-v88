import type { ReactNode } from 'react';

/* ── tiny markdown-flavoured helpers ─────────────────────── */
const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl font-bold text-gray-100 mt-0 mb-6 pb-3 border-b border-neutral-700">
    {children}
  </h1>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-semibold text-gray-100 mt-10 mb-4 pb-2 border-b border-neutral-800">
    {children}
  </h2>
);
const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg font-semibold text-gray-200 mt-8 mb-3">{children}</h3>
);
const P = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-400 leading-7 mb-4">{children}</p>
);
const Code = ({ children }: { children: ReactNode }) => (
  <code className="bg-neutral-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
    {children}
  </code>
);
const Pre = ({ children }: { children: ReactNode }) => (
  <pre className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 mb-6 overflow-x-auto text-sm font-mono text-gray-300 leading-6 whitespace-pre">
    {children}
  </pre>
);
const Li = ({ children }: { children: ReactNode }) => (
  <li className="text-gray-400 leading-7 mb-1">{children}</li>
);
const Ul = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
);
const Callout = ({ children }: { children: ReactNode }) => (
  <div className="bg-blue-950 border border-blue-700 rounded-lg px-4 py-3 mb-6 text-blue-300 text-sm leading-6">
    {children}
  </div>
);
const Warn = ({ children }: { children: ReactNode }) => (
  <div className="bg-yellow-950 border border-yellow-700 rounded-lg px-4 py-3 mb-6 text-yellow-300 text-sm leading-6">
    {children}
  </div>
);
const Divider = () => <hr className="border-neutral-800 my-10" />;

/* ── page ─────────────────────────────────────────────────── */
const Docs = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* back nav */}
      <div className="border-b border-neutral-800 px-6 py-3 flex items-center gap-4">
        <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-mono">
          ← back
        </a>
        <span className="text-neutral-700 text-sm font-mono">/docs</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <H1>Portfolio — Internal Docs</H1>
        <P>
          This is a hidden reference page. It documents the custom pixel design system and the
          feature-flag infrastructure used in this portfolio. Navigate here at <Code>/docs</Code>.
        </P>

        {/* ── SECTION 1: Feature Flags ─────────────────────── */}
        <Divider />
        <H2>Feature Flags</H2>
        <P>
          Feature flags let you ship new UI experiments without deleting old code. When a flag is{' '}
          <strong>active</strong> the new <em>feature</em> renders; when it is off the{' '}
          <em>backup</em> renders instead.
        </P>

        <H3>How a flag is defined</H3>
        <P>
          Flags live in <Code>src/data/flags.json</Code>. Each entry has four fields:
        </P>
        <Pre>{`// src/data/flags.json
{
  "flags": [
    {
      "name":        "ENABLE_REWRITE_2026",   // unique key
      "enabled":     true,                    // default value
      "expires":     "2026-12-31",            // hard expiry date
      "description": "Enable the 2026 rewrite of the portfolio"
    }
  ]
}`}</Pre>

        <H3>Priority order</H3>
        <Ul>
          <Li>
            <strong>Expired?</strong> → always returns <Code>true</Code> regardless of anything
            else. Old code paths are removed automatically after the expiry date.
          </Li>
          <Li>
            <strong>localStorage override?</strong> → <Code>flag-overrides</Code> key stores a JSON
            map of <Code>{`{ "FLAG_NAME": true | false }`}</Code>. This lets you test either branch
            locally.
          </Li>
          <Li>
            <strong>Otherwise</strong> → uses the <Code>enabled</Code> value from{' '}
            <Code>flags.json</Code>.
          </Li>
        </Ul>

        <H3>Runtime helper — isFlagActive</H3>
        <Pre>{`import { isFlagActive, Flag } from '../utils/featureFlags';

// returns true | false
const isRewrite = isFlagActive(Flag.ENABLE_REWRITE_2026);`}</Pre>

        <H3>React component — FeatureFlag</H3>
        <P>
          Use the <Code>{'<FeatureFlag />'}</Code> component to declaratively swap whole subtrees:
        </P>
        <Pre>{`import FeatureFlag from '../components/FeatureFlag';
import { Flag } from '../utils/featureFlags';

<FeatureFlag
  name={Flag.ENABLE_REWRITE_2026}
  feature={<NewComponent />}   // rendered when flag is ON
  backup={<OldComponent />}    // rendered when flag is OFF
/>`}</Pre>

        <H3>The /config page</H3>
        <P>
          Navigate to <Code>/config</Code> to toggle flags via a UI. Overrides are stored in{' '}
          <Code>localStorage</Code> and survive page refreshes but are wiped when you hit{' '}
          <strong>Reset</strong>.
        </P>
        <Callout>
          Flags whose <Code>expires</Code> date has passed are locked to <Code>true</Code> in the
          config UI and cannot be overridden.
        </Callout>

        <H3>Adding a new flag</H3>
        <Pre>{`// 1. Add to flags.json
{ "name": "MY_FLAG", "enabled": false, "expires": "2027-01-01", "description": "..." }

// 2. Register the key in featureFlags.ts
export const Flag = {
  ENABLE_REWRITE_2026: 'ENABLE_REWRITE_2026',
  MY_FLAG: 'MY_FLAG',          // ← add here
} as const;

// 3. Use it
isFlagActive(Flag.MY_FLAG);`}</Pre>

        {/* ── SECTION 2: Pixel Design System ───────────────── */}
        <Divider />
        <H2>Pixel Design System</H2>
        <P>
          The 2026 rewrite uses a pixel-art aesthetic built on three CSS utility classes defined in{' '}
          <Code>src/index.css</Code>. All of them use <Code>clip-path</Code> to cut geometric
          notches into elements.
        </P>

        {/* Card */}
        <H3>Pixel Card — .card-pixel / .card-pixel-clip</H3>
        <P>
          Cards get a single notch cut from the <strong>top-right corner</strong> (16 px × 16 px).
          The shadow is applied via <Code>filter: drop-shadow</Code> because <Code>box-shadow</Code>{' '}
          ignores <Code>clip-path</Code>.
        </P>
        <Pre>{`.card-pixel {
  clip-path: polygon(
    0% 0%,
    calc(100% - 16px) 0%,
    calc(100% - 16px) 16px,
    100% 16px,
    100% 100%,
    0% 100%
  );
  filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.6));
}`}</Pre>
        <P>
          <Code>.card-pixel-clip</Code> is the same polygon without the drop-shadow — used as the
          inner clipping mask for the <strong>outline</strong> variant.
        </P>

        <H3>Using {'<Card />'} in JSX</H3>
        <P>
          The <Code>{'<Card />'}</Code> component wraps both classes with tone and size props:
        </P>
        <Pre>{`import { Card } from '../components/ui';

// Fill variant — solid background colour
<Card size="wide" tone="neutral">
  …content…
</Card>

// Outline variant — pixel border with dark interior
// Renders: .card-pixel (accent bg) > .card-pixel-clip (dark bg, m-0.75, p-4)
<Card size="wide" type="outline" tone="neutral">
  …content…
</Card>

// Available tones: 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'theme'
// Available sizes: 'wide' (w-full) | 'skinny' (w-fit)`}</Pre>

        <Callout>
          <strong>Outline trick:</strong> the outer <Code>{'<div>'}</Code> carries the accent
          background colour and the pixel clip-path. A second inner <Code>{'<div>'}</Code> with{' '}
          <Code>.card-pixel-clip</Code> sits 3 px (m-0.75) inside it. The exposed rim becomes the
          "border" colour.
        </Callout>

        {/* Button */}
        <H3>Pixel Button — .btn-pixel</H3>
        <P>
          Buttons get notches cut from <strong>all four corners</strong> (10 px × 10 px), giving
          them the classic RPG UI look. An offset <Code>box-shadow</Code> acts as a hard pixel
          drop-shadow.
        </P>
        <Pre>{`.btn-pixel {
  clip-path: polygon(
    10px 0%,  calc(100% - 10px) 0%,
    calc(100% - 10px) 10px, 100% 10px,
    100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px),
    calc(100% - 10px) 100%, 10px 100%,
    10px calc(100% - 10px), 0% calc(100% - 10px),
    0% 10px, 10px 10px
  );
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.8);
  transition: transform 0.08s, box-shadow 0.08s;
}`}</Pre>

        <H3>When does .btn-pixel apply?</H3>
        <P>
          The <Code>{'<Button />'}</Code> component only adds <Code>.btn-pixel</Code> when{' '}
          <strong>both</strong> conditions are true:
        </P>
        <Ul>
          <Li>
            The <Code>display</Code> prop is one of <Code>fill</Code>, <Code>outline</Code>, or{' '}
            <Code>menu</Code> (controlled by <Code>PIXEL_DISPLAYS</Code> in <Code>Button.tsx</Code>
            ).
          </Li>
          <Li>
            The <Code>ENABLE_REWRITE_2026</Code> flag is active (checked via{' '}
            <Code>isRewrite()</Code> inside the component).
          </Li>
        </Ul>
        <Pre>{`// Button.tsx (simplified)
const PIXEL_DISPLAYS: ButtonDisplay[] = ['fill', 'outline', 'menu'];

const pixelClass =
  PIXEL_DISPLAYS.includes(display) && isRewrite()
    ? 'btn-pixel px-6 py-3'
    : '';`}</Pre>
        <Warn>
          <strong>Padding note:</strong> when <Code>.btn-pixel</Code> is applied it overrides the
          display-level padding with <Code>px-6 py-3</Code>. This is intentional — the larger
          padding ensures the clipped corners don't eat into the label.
        </Warn>

        {/* Avatar */}
        <H3>Pixel Avatar — .avatar-pixel</H3>
        <P>
          The same 10 px four-corner notch is used for the avatar frame. A white 6 px padding
          creates the frame colour; <Code>filter: drop-shadow</Code> applies the shadow after
          clipping.
        </P>
        <Pre>{`.avatar-pixel {
  display: inline-block;
  padding: 6px;
  background: #ffffff;           /* frame colour */
  clip-path: polygon(…);         /* same 10px notch as btn-pixel */
  filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.9));
  image-rendering: pixelated;    /* keep pixel art crisp */
}`}</Pre>

        {/* Theme */}
        <H3>Rewrite theme — .rw-theme</H3>
        <P>
          Applied to the root <Code>{'<div>'}</Code> in <Code>App.tsx</Code> when the rewrite flag
          is on. It sets CSS custom properties consumed by components:
        </P>
        <Pre>{`.rw-theme {
  --rw-bg:           #160f0f;   /* page background */
  --rw-btn-primary:  #a51919;   /* primary button / accent */
  --rw-pill-1:       #22388c;   /* callout badge background */
  --rw-font:         #ffffff;

  background-color: var(--rw-bg);
  color: var(--rw-font);
}`}</Pre>

        <Divider />
        <P className="text-xs text-neutral-600 text-center">
          Last updated: May 2026 · /docs · internal only
        </P>
      </div>
    </div>
  );
};

export default Docs;
