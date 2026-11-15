/**
 * ====================================================================
 * WEDDING CELEBRATION — KHIRAJ & DIKSHA
 * ====================================================================
 * Ultra-lightweight, high-performance vanilla JavaScript (ES6+).
 * Zero frameworks, zero dependencies.
 */

(function () {
  'use strict';

  const config = window.WEDDING_CONFIG || {};

  const dom = {
    siteHeader: document.getElementById('site-header'),
    scrollProgressBar: document.getElementById('scroll-progress-bar'),
    navMonogram: document.getElementById('nav-monogram'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileDrawer: document.getElementById('mobile-drawer'),

    // Hero elements
    heroAuspiciousHeader: document.getElementById('hero-auspicious-header'),
    heroTagline: document.getElementById('hero-tagline'),
    heroP1: document.getElementById('hero-p1'),
    heroP2: document.getElementById('hero-p2'),
    heroSubtitle: document.getElementById('hero-subtitle'),
    heroDisplayDate: document.getElementById('hero-display-date'),
    heroLocationCity: document.getElementById('hero-location-city'),
    btnHeroGoogleCal: document.getElementById('btn-hero-google-cal'),
    btnHeroSaveCal: document.getElementById('btn-hero-save-cal'),

    // Countdown elements
    countdownTitle: document.getElementById('countdown-title'),
    countdownSubtitle: document.getElementById('countdown-subtitle'),
    countDays: document.getElementById('count-days'),
    countHours: document.getElementById('count-hours'),
    countMinutes: document.getElementById('count-minutes'),
    countSeconds: document.getElementById('count-seconds'),
    countdownGrid: document.getElementById('countdown-grid'),
    countdownCelebration: document.getElementById('countdown-celebration'),
    countdownCelebrationText: document.getElementById('countdown-celebration-text'),
    countdownTzLabel: document.getElementById('countdown-tz-label'),

    // Events
    eventsTimelineContainer: document.getElementById('events-timeline-container'),

    // Audio & Toast
    bgAudio: document.getElementById('bg-audio'),
    musicToggle: document.getElementById('music-toggle'),
    musicStatusText: document.getElementById('music-status-text'),
    toastNotification: document.getElementById('toast-notification'),
    toastMessage: document.getElementById('toast-message'),
    btnBackToTop: document.getElementById('btn-back-to-top'),
    petalsCanvas: document.getElementById('petals-canvas'),
  };

  const state = {
    musicPlaying: false,
    toastTimer: null,
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(message) {
    if (!dom.toastNotification || !dom.toastMessage) return;
    dom.toastMessage.textContent = message;
    dom.toastNotification.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      dom.toastNotification.classList.remove('show');
    }, 3200);
  }

  // Google Calendar URL Generator
  function getGoogleCalendarUrl(event) {
    const couple = config.coupleTitle || 'Khiraj & Diksha';
    const title = encodeURIComponent(event.calendarTitle || `${couple}'s Wedding Event`);
    const mapLink = event.mapUrl || 'https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6';
    const details = encodeURIComponent(
      `॥ श्री गणेशाय नमः ॥\n\n` +
      `${event.name || 'Wedding Event'}\n` +
      `Date & Time: ${event.date || config.displayDate} • ${event.time || config.displayTime}\n` +
      `Venue: ${event.venue || ''}\n` +
      `Address: ${event.address || ''}\n\n` +
      `Google Maps Navigation: ${mapLink}\n\n` +
      `${event.description || ''}`
    );
    const location = encodeURIComponent(`${event.venue || ''}, ${event.address || ''}`);

    let dtStart = '20261211T070000Z';
    let dtEnd = '20261211T120000Z';

    if (event.id === 'haldi') {
      dtStart = '20261210T043000Z'; // Dec 10, 10:00 AM IST
      dtEnd = '20261210T073000Z';
    } else if (event.id === 'lagna-sohala') {
      dtStart = '20261211T070000Z'; // Dec 11, 12:30 PM IST
      dtEnd = '20261211T120000Z';
    } else if (event.id === 'reception') {
      dtStart = '20261213T133000Z'; // Dec 13, 7:00 PM IST
      dtEnd = '20261213T173000Z';
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dtStart}/${dtEnd}&details=${details}&location=${location}`;
  }

  // .ics File Generator
  function downloadEventIcs(event) {
    const couple = config.coupleTitle || 'Khiraj & Diksha';
    const summary = event.calendarTitle || `${couple} - ${event.name}`;
    const mapLink = event.mapUrl || '';
    const description = `${event.name}\\nVenue: ${event.venue}\\nAddress: ${event.address}\\nMap: ${mapLink}\\n${event.description || ''}`;
    const location = `${event.venue}, ${event.address}`;

    let dtStart = '20261211T070000Z';
    let dtEnd = '20261211T120000Z';

    if (event.id === 'haldi') {
      dtStart = '20261210T043000Z';
      dtEnd = '20261210T073000Z';
    } else if (event.id === 'lagna-sohala') {
      dtStart = '20261211T070000Z';
      dtEnd = '20261211T120000Z';
    } else if (event.id === 'reception') {
      dtStart = '20261213T133000Z';
      dtEnd = '20261213T173000Z';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Khiraj and Diksha Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${event.id || 'event'}-${Date.now()}@khirajdiksha.wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${(event.id || 'wedding-event')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Saved to calendar!`);
  }

  // Populate Page Content from Config
  function populateContent() {
    const coupleName = config.coupleTitle || `${config.partner1?.firstName || 'Khiraj'} & ${config.partner2?.firstName || 'Diksha'}`;
    const p1 = config.partner1?.fullName || config.partner1?.firstName || 'Khiraj';
    const p2 = config.partner2?.fullName || config.partner2?.firstName || 'Diksha';

    document.title = `${coupleName} — Maharashtrian Wedding Celebration`;

    if (dom.navMonogram && config.monogram) dom.navMonogram.textContent = config.monogram;
    if (dom.heroAuspiciousHeader) dom.heroAuspiciousHeader.textContent = config.auspiciousHeader || '॥ श्री गणेशाय नमः ॥';
    if (dom.heroP1) dom.heroP1.textContent = p1;
    if (dom.heroP2) dom.heroP2.textContent = p2;
    if (dom.heroSubtitle && config.hero?.subtitle) dom.heroSubtitle.textContent = config.hero.subtitle;
    if (dom.heroDisplayDate && config.displayDate) dom.heroDisplayDate.textContent = config.displayDate;
    if (dom.heroLocationCity && config.locationCity) dom.heroLocationCity.textContent = config.locationCity;

    if (dom.btnHeroGoogleCal) {
      dom.btnHeroGoogleCal.href = getGoogleCalendarUrl({
        id: 'lagna-sohala',
        name: 'The Lagna Sohala (शुभविवाह)',
        calendarTitle: `${coupleName}'s Wedding Ceremony (Lagna Sohala)`,
        venue: 'New Charkha Ghar Hall / Charkha Gruha',
        address: 'Wardha - Sevagram Rd, MLK Colony, Warud, Wardha 442102',
        mapUrl: 'https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6',
        date: 'Friday, December 11, 2026',
        time: '12:30 PM IST (शुभ मुहूर्त)',
        description: 'The sacred Maharashtrian wedding celebration of Khiraj & Diksha.'
      });
    }

    if (dom.btnHeroSaveCal) {
      dom.btnHeroSaveCal.addEventListener('click', () => {
        downloadEventIcs({
          id: 'lagna-sohala',
          name: 'The Lagna Sohala (शुभविवाह)',
          calendarTitle: `${coupleName}'s Wedding Ceremony`,
          venue: 'New Charkha Ghar Hall, Wardha',
          address: 'Wardha - Sevagram Rd, Wardha 442102',
          mapUrl: 'https://maps.app.goo.gl/WdgeZRBRgTag9Y8R6',
        });
      });
    }

    if (dom.countdownTitle && config.countdown?.title) dom.countdownTitle.textContent = config.countdown.title;
    if (dom.countdownSubtitle && config.countdown?.subtitle) dom.countdownSubtitle.textContent = config.countdown.subtitle;
    if (dom.countdownCelebrationText && config.countdown?.completedMessage) {
      dom.countdownCelebrationText.textContent = config.countdown.completedMessage;
    }
    if (dom.countdownTzLabel && config.timezone) {
      dom.countdownTzLabel.textContent = `Calculated for ${config.timezone} (${config.displayTime || ''})`;
    }

    if (config.events && config.events.length) {
      renderEvents(config.events);
    }
  }

  // Render Event Timeline Cards with Integrated Venue Blocks
  function renderEvents(events) {
    if (!dom.eventsTimelineContainer) return;
    dom.eventsTimelineContainer.innerHTML = '';

    const dayBadges = [
      { marathi: 'दिवस १ • हळद सोहळा', english: 'Day 1 • Haldi Ceremony', pillClass: 'badge-day-1', icon: '🌼' },
      { marathi: 'शुभविवाह (शुभ मुहूर्त)', english: 'The Sacred Wedding', pillClass: 'badge-day-main', icon: '🪔' },
      { marathi: 'स्वागत समारंभ व स्नेहभोजन', english: 'Grand Reception', pillClass: 'badge-day-2', icon: '✨' },
    ];

    events.forEach((event, index) => {
      const card = document.createElement('div');
      card.className = `timeline-event-card reveal-on-scroll ${index === 1 ? 'timeline-main-event' : ''}`;

      const googleCalUrl = getGoogleCalendarUrl(event);
      const day = dayBadges[index] || { marathi: `सोहळा ${index + 1}`, english: `Day ${index + 1}`, pillClass: 'badge-day-generic', icon: '✦' };

      card.innerHTML = `
        <div class="timeline-node" aria-hidden="true"></div>
        <div class="event-card-inner ${index === 1 ? 'featured-lagna-card shimmer-foil' : ''}">
          <div class="event-header-badge-row">
            <span class="event-day-pill ${day.pillClass}">
              <span class="day-pill-icon" aria-hidden="true">${day.icon}</span>
              <span>${day.marathi} • ${day.english}</span>
            </span>
            ${event.type ? `<span class="event-type-badge">${escapeHtml(event.type)}</span>` : ''}
          </div>

          <h3 class="event-name">${escapeHtml(event.name)}</h3>

          <div class="event-meta-list">
            <div class="event-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span><strong>${escapeHtml(event.date)}</strong></span>
            </div>
            <div class="event-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${escapeHtml(event.time)}</span>
            </div>
          </div>

          ${event.dressCode ? `<div class="event-dress-code">Dress Code: ${escapeHtml(event.dressCode)}</div>` : ''}
          ${event.description ? `<p class="event-desc">${escapeHtml(event.description)}</p>` : ''}

          <!-- Integrated Venue & Location Block -->
          <div class="event-venue-block">
            <div class="event-venue-info-box">
              <div class="venue-title-row">
                <svg class="venue-marker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div class="venue-name-addr-wrap">
                  <h4 class="event-venue-title">${escapeHtml(event.venue)}</h4>
                  <p class="event-venue-address-text">${escapeHtml(event.address)}</p>
                </div>
              </div>

              ${event.image ? `
                <div class="event-venue-photo-wrapper">
                  <img src="${event.image}" alt="${escapeHtml(event.venue)}" class="event-venue-photo" loading="lazy">
                </div>
              ` : ''}

              <div class="event-venue-actions-row">
                ${event.mapUrl ? `
                  <a class="btn-venue-action btn-map-link" href="${event.mapUrl}" target="_blank" rel="noopener noreferrer">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    <span>Open in Google Maps</span>
                  </a>
                ` : ''}

                <button class="btn-venue-action btn-copy-event-address" type="button" data-address="${escapeHtml(event.address || event.venue)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span>Copy Address</span>
                </button>

                <a class="btn-venue-action btn-calendar-link" href="${googleCalUrl}" target="_blank" rel="noopener noreferrer" title="Add to Google Calendar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                  </svg>
                  <span>Google Calendar</span>
                </a>

                <button class="btn-venue-action btn-add-cal" type="button" data-event-id="${escapeHtml(event.id || String(index))}" title="Download Apple / Outlook .ics calendar file">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>.ics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      dom.eventsTimelineContainer.appendChild(card);
    });

    // Calendar download handler
    dom.eventsTimelineContainer.querySelectorAll('.btn-add-cal').forEach((btn) => {
      btn.addEventListener('click', () => {
        const eventId = btn.getAttribute('data-event-id');
        const eventObj = events.find((ev, i) => (ev.id || String(i)) === eventId) || events[0];
        downloadEventIcs(eventObj);
      });
    });

    // Copy address handler
    dom.eventsTimelineContainer.querySelectorAll('.btn-copy-event-address').forEach((btn) => {
      btn.addEventListener('click', () => {
        const addr = btn.getAttribute('data-address');
        if (addr) {
          navigator.clipboard.writeText(addr).then(() => {
            showToast('Address copied to clipboard!');
          }).catch(() => {
            showToast('Address: ' + addr);
          });
        }
      });
    });
  }

  // Timezone-Aware Live Countdown Timer
  function initCountdown() {
    if (!dom.countDays) return;

    // Wedding timestamp: Dec 11, 2026, 12:30 PM IST (UTC 07:00:00)
    const targetTimestamp = new Date('2026-12-11T07:00:00Z').getTime();

    function update() {
      const now = Date.now();
      const distance = targetTimestamp - now;

      if (distance <= 0) {
        if (dom.countdownGrid) dom.countdownGrid.style.display = 'none';
        if (dom.countdownCelebration) dom.countdownCelebration.classList.add('active');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      dom.countDays.textContent = String(days).padStart(2, '0');
      dom.countHours.textContent = String(hours).padStart(2, '0');
      dom.countMinutes.textContent = String(minutes).padStart(2, '0');
      dom.countSeconds.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // Lightweight Petals Animation (Paused when hidden / prefers-reduced-motion)
  function initPetals() {
    const canvas = dom.petalsCanvas;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationFrameId = null;
    let isVisible = true;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Only 16 ultra-light particles
    const petals = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 5 + 4,
      speedX: Math.random() * 0.8 - 0.4,
      speedY: Math.random() * 0.6 + 0.4,
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.02 - 0.01,
      color: Math.random() > 0.4 ? 'rgba(196, 161, 90, 0.45)' : 'rgba(121, 46, 56, 0.35)',
    }));

    function loop() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.spin;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    // Pause when tab is inactive to save battery
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) {
        loop();
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    loop();
  }

  // Audio Toggle (Native HTML5 Audio, zero extra libraries)
  function initAudio() {
    const btn = dom.musicToggle;
    const audio = dom.bgAudio;
    if (!btn || !audio) return;

    if (config.music?.audioSrc) {
      audio.src = config.music.audioSrc;
    }

    btn.addEventListener('click', () => {
      if (state.musicPlaying) {
        audio.pause();
        state.musicPlaying = false;
        btn.classList.remove('playing');
        if (dom.musicStatusText) dom.musicStatusText.textContent = 'Music';
      } else {
        audio.play().then(() => {
          state.musicPlaying = true;
          btn.classList.add('playing');
          if (dom.musicStatusText) dom.musicStatusText.textContent = 'Pause';
        }).catch(() => {
          showToast('Tap to allow audio playback');
        });
      }
    });
  }

  // Navigation, Scroll Progress & Mobile Menu
  function initNavigation() {
    window.addEventListener('scroll', () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

      if (dom.scrollProgressBar) {
        dom.scrollProgressBar.style.width = `${scrolled}%`;
      }

      if (dom.siteHeader) {
        if (winScroll > 30) {
          dom.siteHeader.classList.add('scrolled');
        } else {
          dom.siteHeader.classList.remove('scrolled');
        }
      }
    }, { passive: true });

    // Mobile drawer toggle
    if (dom.mobileMenuBtn && dom.mobileDrawer) {
      dom.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = dom.mobileDrawer.classList.toggle('open');
        dom.mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      });

      dom.mobileDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          dom.mobileDrawer.classList.remove('open');
          dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Back to top
    if (dom.btnBackToTop) {
      dom.btnBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Scroll-Triggered Reveal Animation (Lightweight IntersectionObserver)
  function initScrollReveals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    populateContent();
    initCountdown();
    initPetals();
    initAudio();
    initNavigation();
    initScrollReveals();
  });
})();