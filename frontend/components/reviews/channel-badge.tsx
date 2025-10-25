interface ChannelBadgeProps {
  channel: string
}

export function ChannelBadge({ channel }: ChannelBadgeProps) {
  const getChannelStyles = (channel: string) => {
    const lowerChannel = channel.toLowerCase()

    if (lowerChannel.includes("airbnb")) {
      return "bg-red-50 text-red-700 border-red-200"
    }
    if (lowerChannel.includes("booking")) {
      return "bg-blue-50 text-blue-700 border-blue-200"
    }
    if (lowerChannel.includes("vrbo") || lowerChannel.includes("homeaway")) {
      return "bg-purple-50 text-purple-700 border-purple-200"
    }
    return "bg-gray-50 text-gray-700 border-gray-200"
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getChannelStyles(
        channel,
      )}`}
    >
      {channel}
    </span>
  )
}
