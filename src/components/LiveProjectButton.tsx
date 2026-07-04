type LiveProjectButtonProps = {
  label?: string
  className?: string
  onClick?: () => void
}

/**
 * Ghost / outline pill button.
 */
export default function LiveProjectButton({
  label = 'View Gallery',
  className = '',
  onClick,
}: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-mist px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10 ${className}`}
    >
      {label}
    </button>
  )
}
