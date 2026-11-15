# 💍 Premium Animated Wedding Invitation Website

A luxury, fully animated, responsive wedding invitation website designed with the emotional depth of an interactive romantic wedding film and the refinement of bespoke fine-art wedding stationery.

Built entirely with **HTML5, CSS3, Vanilla JavaScript (ES6+), and SVG illustrations** — zero frameworks, zero dependencies, zero build steps, and 100% ready for **GitHub Pages**.

---

## ✨ Design & Aesthetic Highlights

- **Luxury Stationery Color Palette**:
  - **Warm Ivory** (`#FAF7F0`) — Base stationery paper texture
  - **Champagne Gold** (`#C6A56B`) — Monogram, borders, and foil shimmer
  - **Deep Forest Green** (`#35483A`) — Rich high-contrast text and midnight foliage
  - **Soft Sage** (`#A7B19A`) — Botanical accents and subtle badges
  - **Warm Charcoal** (`#292823`) — Crisp editorial typography
  - **Muted Blush** (`#E8D3CC`) — Soft highlights and petal hues
- **Refined Editorial Typography**:
  - **Cormorant Garamond** & **Playfair Display** paired with **Montserrat**, with elegant serif fallbacks (`Georgia`, `serif`).
- **Bespoke Botanical Illustrations**:
  - Hand-crafted SVG olive/eucalyptus laurel wreaths, corner flourishes, decorative dividers, and 3D wax seal medallion.
- **Cinematic Motion System**:
  - Interactive 3D invitation envelope opening with breaking wax seal.
  - Ambient floating petals canvas with organic wind drift and flutter physics.
  - Subtle Ken Burns hero photo zoom and gentle crest float.
  - Scroll-triggered reveals via `IntersectionObserver`.
  - Respects `prefers-reduced-motion` and pauses animations when the browser tab is hidden to preserve battery and CPU.

---

## 🏛️ Website Features & Architecture

### 1. Animated Invitation Opening (The Envelope)
- Fullscreen greeting screen styled like a luxury physical card envelope.
- Features a wedding monogram crest, custom invitation wording, and a 3D gold wax seal.
- Guests tap the seal or click **"Open Invitation"** to trigger a 3D flap unfold, card slide-out, and smooth crossfade into the hero section.
- Includes a discreet **"Skip to Details"** button and saves opening state to `sessionStorage`.
- Guests can reopen the envelope anytime via the header envelope button.

### 2. Cinematic Hero Section
- High-resolution editorial photography crop with gradient vignette for maximum readability.
- Couple names displayed prominently with fluid typography (`clamp()`).
- Date and location pills with icons.
- **"Save the Date"** button that dynamically generates and downloads an `.ics` calendar file.
- Animated golden scroll indicator.

### 3. Timezone-Aware Live Countdown Timer
- Accurately counts down days, hours, minutes, and seconds until the celebration.
- **Accurate across all visitor timezones**: Configured with a standard IANA timezone (e.g., `America/Los_Angeles`, `Asia/Kolkata`, `Europe/London`).
- Displays a celebratory banner (*"Today is the Day! Happily Ever After Begins Now."*) when zero is reached.

### 4. Our Story (Editorial Milestones)
- Magazine-style asymmetric photo layouts with gold frames and offset shadow backdrops.
- Milestones include *How We Met*, *Our Journey*, and *The Proposal*.
- Scroll-triggered reveal animations.

### 5. Wedding Events Schedule (Multi-Event Timeline)
- Supports Western, Indian, Multicultural, and Destination weddings (e.g., Haldi, Sangeet, Ceremony, Reception).
- Vertical alternating timeline on desktop with floral node markers; clean vertical cards on mobile.
- Displays event name, date, time, venue, address, dress code, thumbnail, and an individual **"Add to Calendar"** button for each event.

### 6. Venue & Directions (Google Maps & Apple Maps)
- Venue photograph framed with gold corners.
- Detailed address, valet parking notes, and shuttle schedules.
- **"Get Directions"** button opens Google Maps navigation with exact coordinates/address.
- **"Copy Address"** button copies the address to the guest's clipboard with instant toast feedback.

### 7. Curated Photo Gallery & Lightbox
- Responsive grid adapting seamlessly across mobile, tablet, and widescreen.
- Hover zoom with subtle foil overlay.
- Accessible lightbox modal featuring:
  - Previous / Next buttons and photo counter (`3 of 8`).
  - Full keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
  - Mobile touch swipe gestures (swipe left/right to browse).
  - Traps focus and restores focus upon exit.

### 8. Additional Guest Details & FAQ
- **Attire & Dress Code**: Guidance with interactive color palette swatches.
- **Accommodations**: Hotel blocks with distance notes, booking links, and discount codes.
- **Travel & Airports**: Drive times and closest airports.
- **Gifts & Registry**: Warm note on presence and wishing well.
- **FAQ Accordion**: Common questions with smooth height transitions.

### 9. Interactive RSVP
- Guest name, attendance selection (Accept / Decline), event checkboxes, dietary restrictions, and song requests.
- Instant submission feedback with celebratory toast notification.

### 10. Ambient Background Music
- Floating gold music button with animated soundwave visualizer.
- Plays an optimized AAC/M4A audio track (`assets/audio/romantic-melody.m4a`, 188 KB) with WAV fallback.
- **Zero-Dependency Web Audio Synth Fallback**: If audio files fail to load or the guest is offline, the site seamlessly synthesizes a gentle romantic acoustic harp arpeggio in C/D Major using the Web Audio API!
- Audio starts only after explicit user interaction, complying with all modern browser autoplay policies.

---

## 📁 Project Structure

```
wedding-website/
├── index.html               # Main semantic HTML5 markup
├── css/
│   └── styles.css           # Luxury design system, typography, animations, responsive grid
├── js/
│   ├── config.js            # Centralized wedding settings & text placeholders
│   └── main.js              # Vanilla JS engine (envelope, countdown, canvas, audio, lightbox)
├── assets/
│   ├── audio/
│   │   ├── romantic-melody.m4a   # Lightweight 188KB compressed romantic melody
│   │   └── romantic-melody.wav   # High-fidelity uncompressed audio backup
│   ├── icons/
│   │   ├── rings.svg, calendar.svg, clock.svg, map-pin.svg, ... (17 total)
│   └── images/
│       ├── botanical-wreath.svg  # Gold laurel monogram crest
│       ├── wax-seal-graphic.svg  # 3D embossed wax seal medallion
│       ├── botanical-divider.svg # Ornamental separator flourish
│       ├── floral-corner.svg     # Corner floral flourishes
│       ├── hero-wedding.jpg      # Cinematic romantic hero photograph
│       ├── venue-estate.jpg      # Manor estate photograph
│       ├── event-*.jpg           # Event thumbnails (ceremony, reception, haldi, etc.)
│       └── gallery-*.jpg         # Editorial portrait gallery (1 to 8)
└── README.md                # Documentation & customization guide
```

---

## ⚙️ How to Customize for Your Wedding

All wedding-specific information is centralized in **`js/config.js`**. A non-technical user can easily customize names, dates, events, and venues without touching HTML or CSS.

### 1. Change Partner Names & Monogram
Open `js/config.js` and edit the first section:

```javascript
partner1: {
  firstName: "Diksha",
  lastName: "",
  fullName: "Diksha",
},
partner2: {
  firstName: "Khiraj",
  lastName: "",
  fullName: "Khiraj",
},
coupleTitle: "Khiraj & Diksha",
monogram: "K & D", // Appears on the seal, header, and crest
```

### 2. Set Wedding Date & Timezone
Specify your date in ISO format (`YYYY-MM-DDTHH:MM:SS`) and your official IANA timezone:

```javascript
weddingDate: "2027-10-18T16:00:00",
timezone: "America/Los_Angeles", // e.g. "America/New_York", "Asia/Kolkata", "Europe/London"
displayDate: "October 18, 2027",
displayTime: "4:00 PM PDT",
locationCity: "Sonoma Valley, California",
```

### 3. Add or Edit Wedding Events
Edit the `events` array in `js/config.js`. You can add as many events as needed:

```javascript
events: [
  {
    id: "wedding-ceremony",
    name: "The Wedding Ceremony",
    type: "Main Celebration",
    date: "Saturday, October 18, 2027",
    time: "4:00 PM – 5:30 PM",
    venue: "Botanical Rose Lawn & Pavilion",
    address: "1248 Oak Knoll Avenue, Sonoma Valley, CA",
    dressCode: "Formal Garden Elegance / Black Tie Optional",
    description: "The sacred nuptial vows. Please be seated by 3:45 PM.",
    image: "./assets/images/event-ceremony.jpg",
  },
  // Add additional events here...
]
```

### 4. Replace Photos with Your Own
Place your photos in `assets/images/` and update the paths in `js/config.js`:
- **Hero Image**: `hero.backgroundImage`
- **Venue Image**: `venue.image`
- **Milestone Images**: `story.milestones[i].image`
- **Gallery Images**: `gallery.items[i].src`

> **Tip**: You can also use direct external image URLs (e.g. from Cloudinary, Imgur, or Unsplash) directly in `js/config.js`!

### 5. Change or Toggle Background Music
In `js/config.js`:

```javascript
music: {
  enabled: true,
  audioSrc: "./assets/audio/your-song.mp3",
  fallbackAudioSrc: "./assets/audio/romantic-melody.m4a",
  enableWebAudioSynthFallback: true,
}
```

---

## 🚀 Deployment to GitHub Pages

Hosting this website on GitHub Pages takes under two minutes:

1. **Create a GitHub Repository**:
   - Create a new public or private repository on GitHub (e.g., `our-wedding`).
2. **Push the Files**:
   ```bash
   cd wedding-website
   git init
   git add .
   git commit -m "Initial commit of luxury wedding website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub (`Settings` > `Pages`).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Choose `main` branch and `/ (root)` folder, then click **Save**.
4. **Your Live Website**:
   - Within 60 seconds, your site will be live at:
     `https://<your-username>.github.io/<your-repo-name>/`

> **Note on Asset Paths**: All paths in this project use relative links (`./css/...`, `./assets/...`, `./js/...`), guaranteeing that the website renders perfectly whether deployed at a custom domain root (`wedding.com`) or a GitHub Pages repository subpath (`username.github.io/wedding/`).

---

## 📱 Mobile & Desktop Responsiveness

The site is tested across modern display environments:
- **Mobile Phones**: Compact screens down to 320px, iPhone 12/13/14/15/16 Pro, Samsung Galaxy, Pixel.
- **Tablets**: iPad, iPad Pro, portrait & landscape.
- **Laptops & Monitors**: 1080p, 1440p, 4K Retina displays.
- **Touch Ergonomics**: All interactive touch targets are at least 44×44px. Safe-area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`) are respected for edge-to-edge mobile viewing.

---

## ♿ Accessibility & Performance

- **Semantic HTML5**: Native landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<dialog role="dialog">`).
- **Screen Reader Support**: Descriptive `aria-label`, `aria-live`, and alt text attributes on all interactive components.
- **Visible Focus States**: Custom gold focus rings (`:focus-visible`) for keyboard users.
- **WCAG AA Color Contrast**: All text elements maintain high contrast against backgrounds.
- **Optimized Assets**: Local image files average 15–35 KB each; audio track is 188 KB; CSS and JS are zero-dependency and load in under 20ms.
