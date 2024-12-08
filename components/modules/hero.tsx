import React from 'react'
import { HeroProps } from '@/app/types/types-components'

import BlockContent from '@components/block-content'
import VideoLoop from '@components/vimeo-loop'
import Photo from '@components/photo'

const Hero: React.FC<HeroProps> = ({ data = {} }) => {
  const { content, bgType, photos, video } = data

  return (
    <section className="hero">
      {content && (
        <div className="hero--overlay">
          <div className="hero--content">
            <BlockContent blocks={content} />
          </div>
        </div>
      )}

      {bgType === 'video' && video && (
        <>
          <div className="hero--bg is-desktop">
            <VideoLoop title={video.title} id={video.id} />
          </div>
          <div className="hero--bg is-mobile">
            <VideoLoop title={video.title} id={video.id} />
          </div>
        </>
      )}

      {bgType === 'photo' && photos && (
        <>
          {photos.desktopPhoto && (
            <Photo
              photo={photos.desktopPhoto}
              layout="fill"
              sizes="100vw"
              className="hero--bg is-desktop"
            />
          )}
          {photos.mobilePhoto && (
            <Photo
              photo={photos.mobilePhoto}
              layout="fill"
              sizes="100vw"
              className="hero--bg is-mobile"
            />
          )}
        </>
      )}
    </section>
  )
}

export default Hero
