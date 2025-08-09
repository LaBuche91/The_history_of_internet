// TimelineSection.jsx - Section principale avec les événements interactifs
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import eventsConfig from '../events.config.json';
import ArpanetGame from './mini-games/ArpanetGame';
import TCPIPGame from './mini-games/TCPIPGame';
import HTTPProtocolGame from './mini-games/HTTPProtocolGame';
import HTMLFirstPageGame from './mini-games/HTMLFirstPageGame';
import PopupKillerGame from './mini-games/PopupKillerGame';
import GoogleSearchGame from './mini-games/GoogleSearchGame';
import MP3DownloadGame from './mini-games/MP3DownloadGame';
import GeoCitiesBuilder from './mini-games/GeoCitiesBuilder';
import MSNNudgeGame from './mini-games/MSNNudgeGame';
import VirusDefenseGame from './mini-games/VirusDefenseGame';
import YouTubeVintageGame from './mini-games/YouTubeVintageGame';
import SocialMediaDashboard from './mini-games/SocialMediaDashboard';
import AIChatGame from './mini-games/AIChatGame';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const timelineRef = useRef(null);

  // Mapping des composants interactifs
  const componentMap = {
    'arpanet-1969': ArpanetGame,
    'tcp-ip-1983': TCPIPGame,
    'http-1990': HTTPProtocolGame,
    'web-html-1991': HTMLFirstPageGame,
    'internet-explorer-1995': PopupKillerGame,
    'google-1998': GoogleSearchGame,
    'mp3-download-1999': MP3DownloadGame,
    'geocities-2000': GeoCitiesBuilder,
    'msn-messenger-2003': MSNNudgeGame,
    'virus-pop-ups-2004': VirusDefenseGame,
    'youtube-2005': YouTubeVintageGame,
    'web2-2010': SocialMediaDashboard,
    'cloud-ai-2020': AIChatGame
  };

  // Transformation des événements de la config pour le rendu
  const events = eventsConfig.map(event => ({
    ...event,
    className: `event-${event.year}`,
    component: componentMap[event.id] || (() => <div>Mini-jeu en développement...</div>),
    sound: event.media?.sound?.replace('.mp3', '') || 'default-sound'
  }));

  useEffect(() => {
    // Animation d'apparition pour chaque événement au scroll
    events.forEach((event, index) => {
      const eventElement = document.querySelector(`#${event.id}`);
      if (eventElement) {
        // Animation des éléments textuels
        const year = eventElement.querySelector('.event-year');
        const title = eventElement.querySelector('.event-title');
        const description = eventElement.querySelector('.event-description');
        const interactive = eventElement.querySelector('.event-interactive');

        // Timeline d'animation déclenchée par le scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: eventElement,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        });

        // Animation séquentielle des éléments
        tl.fromTo(year, 
          { y: 100, opacity: 0, scale: 0.5 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
        )
        .fromTo(title,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(description,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(interactive,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.8)" },
          "-=0.2"
        );

        // Effet de parallax pour les arrière-plans
        gsap.to(eventElement, {
          backgroundPositionY: '50%',
          ease: 'none',
          scrollTrigger: {
            trigger: eventElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // Nettoyage des ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={timelineRef} className="timeline">
      {events.map((event, index) => {
        const InteractiveComponent = event.component;
        
        return (
          <div 
            key={event.id}
            id={event.id}
            className={`timeline-event ${event.className}`}
          >
            <div className="event-content">
              <div className="event-year">{event.year}</div>
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              
              <div className="event-interactive">
                <InteractiveComponent soundId={event.sound} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TimelineSection;
