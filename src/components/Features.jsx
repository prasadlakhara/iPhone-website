import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import gsap from 'gsap'

const Features = () => {
  const videoRef = useRef()

  useGSAP(() => {
    // Video animation
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => videoRef.current.play()
    })

    // Text and image animations
    const animations = [
      {
        target: '#features_title',
        vars: { y: 0, opacity: 1 }
      },
      {
        target: '.g_grow',
        vars: { scale: 1, opacity: 1, ease: 'power1' },
        options: { scrub: 5.5 }
      },
      {
        target: '.g_text',
        vars: { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 }
      }
    ]

    animations.forEach(({ target, vars, options }) => {
      animateWithGsap(target, vars, options)
    })
  }, [])

  const renderFeatureText = (text, highlight) => (
    <p className="feature-text g_text">
      {text.split(highlight).map((part, i) => (
        i === 0 ? part : <>
          <span className="text-white">{highlight}</span>
          {part}
        </>
      ))}
    </p>
  )

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-wdith">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video 
                playsInline 
                id="exploreVideo" 
                className="w-full h-full object-cover object-center" 
                preload="none" 
                muted 
                autoPlay 
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore1Img} alt="titanium" className="feature-video g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore2Img} alt="titanium 2" className="feature-video g_grow" />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  {renderFeatureText(
                    "iPhone 15 Pro is the first iPhone to feature an aerospace-grade titanium design, using the same alloy that spacecrafts use for missions to Mars.",
                    "the first iPhone to feature an aerospace-grade titanium design"
                  )}
                </div>

                <div className="flex-1 flex-center">
                  {renderFeatureText(
                    "Titanium has one of the best strength-to-weight ratios of any metal, making these our lightest Pro models ever. You'll notice the difference the moment you pick one up.",
                    "lightest Pro models ever."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features