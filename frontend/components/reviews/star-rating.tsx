import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, maxRating = 10, size = "md" }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const starValue = i + 1
    const isFilled = starValue <= Math.round(rating)

    return (
      <Star
        key={i}
        className={`${sizeClasses[size]} ${
          isFilled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    )
  })

  return <div className="flex items-center gap-0.5">{stars}</div>
}
