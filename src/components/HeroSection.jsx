// HeroSection.jsx - Section d'accueil avec animation d'introduction
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animation séquentielle d'entrée
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(indicatorRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" },
      "-=0.3"
    );

    // Effet de parallax léger au scroll
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      gsap.to(heroRef.current, {
        y: scrollY * 0.5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour faire défiler vers la timeline
  const scrollToTimeline = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: window.innerHeight,
      ease: "power2.inOut"
    });
  };

  return (
    <section ref={heroRef} className="hero">
      <h1 ref={titleRef} className="hero-title">
        The History of the Internet
      </h1>
      
      <p ref={subtitleRef} className="hero-subtitle">
        Embarquez pour un voyage interactif à travers les moments 
        qui ont façonné notre monde numérique. Des premiers pas 
        d'ARPANET aux réseaux sociaux modernes.
      </p>
      
      <div 
        ref={indicatorRef} 
        className="scroll-indicator"
        onClick={scrollToTimeline}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ fontSize: '2rem' }}>↓</div>
        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Faites défiler pour explorer
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
