import React from 'react'
import { performanceImages } from '../../constants'

const Performance = () => {
  return (
    <section id='performance'>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className='wrapper'>
        {performanceImages.map(({ id, src}) => (
          <img src={src} key={id} alt={id} />
        ))}
      </div>

      <div className='content'>
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so <span className='text-white'>Gaming feels more immersive and realistic than ever.</span>
        </p>
      </div>
    </section>
  )
}

export default Performance