import { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60',
  className,
  style,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  )
}
