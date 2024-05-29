import React from 'react'
import Feed from './components/Feed'
import PopularProfiles from './components/PopularProfiles'
import TrendingPosts from './components/TrendingPosts'

export default function HomePage() {
  return (
    <>
      <Feed />
      <section className="extra_section_home">
        <PopularProfiles />
        <TrendingPosts />
      </section>
    </>
  )
}
