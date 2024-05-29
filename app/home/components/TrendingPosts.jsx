import React from 'react'
import Link from 'next/link'

export default function TrendingPosts() {
  return (
    <div>
      <div className="popular_profiles_header">
        <h2>Messages</h2>
        <Link href="./home/messages">More</Link>
      </div>
    </div>
  )
}
