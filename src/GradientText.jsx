export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  direction = 'horizontal',
  pauseOnHover = false,
  showBorder = false,
}) {
  const angle =
    direction === 'vertical' ? 'to bottom' : direction === 'diagonal' ? 'to bottom right' : 'to right'
  const size = direction === 'vertical' ? '100% 300%' : direction === 'diagonal' ? '300% 300%' : '300% 100%'
  const gradientColors = [...colors, colors[0]].join(', ')

  return (
    <span
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${
        pauseOnHover ? 'pause-on-hover' : ''
      } ${className}`}
      style={{
        '--gradient-image': `linear-gradient(${angle}, ${gradientColors})`,
        '--gradient-size': size,
        '--gradient-speed': `${animationSpeed}s`,
      }}
    >
      {showBorder && <span className="gradient-overlay" aria-hidden="true" />}
      <span className="text-content">{children}</span>
    </span>
  )
}
