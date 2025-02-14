import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useMemo, useState, useCallback } from 'react';

const Hero = () => {
  const MOBILE_BREAKPOINT = 760;
  
  const getInitialVideoSrc = useMemo(() => 
    window.innerWidth < MOBILE_BREAKPOINT ? smallHeroVideo : heroVideo,
  []);

  const [videoSrc, setVideoSrc] = useState(getInitialVideoSrc);

  const handleVideoSrcSet = useCallback(() => {
    const newVideoSrc = window.innerWidth < MOBILE_BREAKPOINT ? smallHeroVideo : heroVideo;
    if (newVideoSrc !== videoSrc) {
      setVideoSrc(newVideoSrc);
    }
  }, [videoSrc]);

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    return () => window.removeEventListener('resize', handleVideoSrcSet);
  }, [handleVideoSrcSet]);

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { delay: 2 } });
    timeline
      .to('#hero', { opacity: 1 })
      .to('#cta', { opacity: 1, y: -50 }, '<');
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video 
            className="pointer-events-none" 
            autoPlay 
            muted 
            playsInline
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;