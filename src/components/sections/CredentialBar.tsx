"use client";

const items = [
  "10+ Years Engineering Experience",
  "Austria-Based",
  "Battery to Propulsion",
  "Series Production Ready",
  "ISO-Tested Components",
  "Custom Development Partner",
  "Maritime Electromobility",
  "Full-Stack Electronics",
];

const repeated = [...items, ...items];

export function CredentialBar() {
  return (
    <div className="relative border-y border-cyan/20 bg-abyss/80 backdrop-blur overflow-hidden py-3.5">
      <div className="overflow-hidden">
        <div className="ticker-track flex whitespace-nowrap animate-ticker gap-0">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8">
              <span className="font-mono text-xs text-sonar/60 tracking-widest uppercase">{item}</span>
              <span className="text-cyan/30 text-xs">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
