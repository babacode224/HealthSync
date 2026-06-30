export function HealthSyncLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6zm-1 15h-3v-3h3v-3h-3v-3h3V9h2v3h3v3h-3v3h3v3h-3v3h-2v-3z"
        fill="white"
      />
    </svg>
  );
}
