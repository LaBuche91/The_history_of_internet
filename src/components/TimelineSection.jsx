// TimelineSection.jsx - Section principale avec les événements interactifs
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArpanetGame from './mini-games/ArpanetGame';
import TCPIPGame from './mini-games/TCPIPGame';
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

  // Configuration des événements avec leurs composants interactifs
  const events = [
    {
      id: 'arpanet-1969',
      year: '1969',
      title: 'Naissance d\'ARPANET',
      description: `Le 29 octobre 1969, le premier message est envoyé entre 
        l'UCLA et Stanford. Ce simple "LO" (tentative d'envoyer "LOGIN") 
        marque le début d'Internet.`,
      className: 'event-1969',
      component: ArpanetGame,
      sound: 'retro-beep'
    },
    {
      id: 'tcp-ip-1983',
      year: '1983',
      title: 'TCP/IP devient standard',
      description: `Le protocole TCP/IP devient la norme universelle, 
        permettant aux différents réseaux de communiquer entre eux. 
        C'est la naissance d'Internet tel qu'on le connaît.`,
      className: 'event-1983',
      component: TCPIPGame,
      sound: 'computer-beep'
    },
    {
      id: 'web-html-1991',
      year: '1991',
      title: 'Naissance du Web (HTML)',
      description: `Tim Berners-Lee crée le World Wide Web au CERN. 
        La première page web est mise en ligne, révolutionnant 
        l'accès à l'information.`,
      className: 'event-1991',
      component: HTMLFirstPageGame,
      sound: 'modem-connect'
    },
    {
      id: 'internet-explorer-1995',
      year: '1995',
      title: 'Internet Explorer',
      description: `Microsoft lance Internet Explorer, déclenchant les 
        guerres des navigateurs. L'époque des pop-ups invasives commence !`,
      className: 'event-1995',
      component: PopupKillerGame,
      sound: 'windows-95'
    },
    {
      id: 'google-1998',
      year: '1998',
      title: 'Google',
      description: `Larry Page et Sergey Brin lancent Google depuis leur garage. 
        La recherche web ne sera plus jamais la même.`,
      className: 'event-1998',
      component: GoogleSearchGame,
      sound: 'dial-up'
    },
    {
      id: 'mp3-download-1999',
      year: '1999',
      title: 'L\'ère du téléchargement MP3',
      description: `Napster révolutionne le partage de musique. Revivez 
        l'époque où télécharger un MP3 était une aventure de patience 
        et d'espoir que la connexion ne se coupe pas.`,
      className: 'event-1999',
      component: MP3DownloadGame,
      sound: 'dialup-modem'
    },
    {
      id: 'geocities-2000',
      year: '2000',
      title: 'GeoCities et les sites personnels',
      description: `L'âge d'or des sites personnels avec GIFs animés, 
        Comic Sans et compteurs de visiteurs. Créez votre propre 
        chef-d'œuvre rétro !`,
      className: 'event-2000',
      component: GeoCitiesBuilder,
      sound: 'midi-music'
    },
    {
      id: 'msn-messenger-2003',
      year: '2003',
      title: 'MSN Messenger et les Nudges',
      description: `L'apogée de la messagerie instantanée. Les statuts 
        personnalisés, les émoticônes animées et bien sûr... les fameux 
        nudges qui faisaient vibrer l'écran de vos amis.`,
      className: 'event-2003',
      component: MSNNudgeGame,
      sound: 'msn-sound'
    },
    {
      id: 'virus-pop-ups-2004',
      year: '2004',
      title: 'L\'invasion des virus et pop-ups',
      description: `L'internet sauvage des années 2000 : virus, spyware, 
        et pop-ups à gogo. Survivez à cette époque dangereuse !`,
      className: 'event-2004',
      component: VirusDefenseGame,
      sound: 'alert-sound'
    },
    {
      id: 'youtube-2005',
      year: '2005',
      title: 'YouTube',
      description: `Chad Hurley, Steve Chen et Jawed Karim lancent YouTube. 
        La première vidéo 'Me at the zoo' change à jamais notre façon 
        de consommer du contenu.`,
      className: 'event-2005',
      component: YouTubeVintageGame,
      sound: 'youtube-intro'
    },
    {
      id: 'web2-2010',
      year: '2010',
      title: 'Web 2.0 et réseaux sociaux',
      description: `Facebook, Twitter, LinkedIn... Les réseaux sociaux 
        transforment Internet en plateforme interactive. Bienvenue 
        dans l'ère du partage !`,
      className: 'event-2010',
      component: SocialMediaDashboard,
      sound: 'notification'
    },
    {
      id: 'cloud-ai-2020',
      year: '2020',
      title: 'Cloud et Intelligence Artificielle',
      description: `L'avènement du cloud computing et de l'IA grand public. 
        ChatGPT, services cloud... l'internet devient intelligent !`,
      className: 'event-2020',
      component: AIChatGame,
      sound: 'ai-beep'
    }
  ];

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
