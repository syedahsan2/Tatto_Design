🖋️ Custom Tattoo Lab

Premium Digital Tattoo Design Studio

[![Website](https://img.shields.io/badge/Website-CustomTattooLab-gold?style=for-the-badge&logo=google-chrome)](https://customtattoolab.com)
[![License](https://img.shields.io/badge/License-MIT-darkred?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

📌 Overview

**Custom Tattoo Lab** is a sophisticated, modern web presence for a digital tattoo design studio. The website showcases premium custom tattoo designs with a dark, artistic aesthetic featuring gold accents, custom cursor effects, and smooth interactive elements.

✨ Key Features

- **🎨 Custom Ink Cursor** — A unique brush-tip cursor with trailing ink effect that responds to speed
- **🖼️ Dynamic Carousels** — Smooth portfolio and testimonial sliders with elegant transitions
- **📱 Fully Responsive** — Optimized for all devices from desktop to mobile
- **⚡ Smooth Animations** — CSS animations with cubic-bezier easing for buttery-smooth interactions
- **🎯 Filterable Portfolio** — Category-based filtering system for artwork browsing
- **📋 Interactive FAQ** — Accordion-style FAQ section with smooth expand/collapse
- **📧 Contact Forms** — Modern, styled contact forms with floating labels and focus states
- **🏷️ Gold Accent Theme** — Consistent luxury branding with gold (#d4963c) as primary accent
- **🔮 Custom Scrollbar** — Styled scrollbar matching the brand aesthetic

---

📁 Project Structure

```
custom-tattoo-lab/
├── index.html              # Homepage
├── about.html              # About Us page
├── portfolio.html          # Portfolio gallery
├── contact.html            # Contact form
├── faq.html               # FAQ accordion
├── privacy-policy.html    # Privacy policy
├── cookie-policy.html     # Cookie policy
├── cookie-settings.html   # Cookie preferences
├── style.css              # Main stylesheet
├── script.js              # JavaScript functionality
├── header.html            # Reusable header partial
├── footer.html            # Reusable footer partial
├── Home/                  # Homepage assets
│   ├── main.jpg           # Hero background
│   ├── image_Home.gif     # CTA background
│   ├── img.jpg            # Portfolio section bg
│   ├── side.jpg           # Testimonials bg
│   ├── LOGO.png           # Main logo
│   ├── Unique.png         # Feature icon
│   ├── Delivered.png      # Feature icon
│   ├── Speed.png          # Feature icon
│   └── Revisions.png      # Feature icon
├── About/                 # About page assets
│   ├── side.jpg           # Section background
│   ├── bg.jpg             # Founders section bg
│   └── founder_photo.jpg  # Founder image
├── Portfolio/             # Portfolio assets
│   ├── bg.jpg             # Background
│   ├── image.jpg          # Testimonials bg
│   ├── random/            # Random category
│   ├── gothic/            # Gothic category
│   ├── character/         # Character category
│   └── animal/            # Animal category
└── README.md              # This file
```

---

🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup structure |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript (ES6)** | Interactivity, DOM manipulation, carousels |
| **Google Fonts** | Montserrat & Playfair Display typography |
| **Canvas API** | Custom ink trail effect |
| **Fetch API** | Loading header/footer partials |

---

🚀 Getting Started

Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local server (for proper partial loading)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/custom-tattoo-lab.git
   cd custom-tattoo-lab
   ```

2. Run a local server (required for partial includes)
   ```bash
   # Using Python
   python -m http.server 5500
   
   # Using Node.js (live-server)
   npx live-server
   
   # Using VS Code Live Server extension
   # Right-click index.html → Open with Live Server
   ```

3. Open in browser
   ```
   http://localhost:5500
   ```

---

🎨 Design System

Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Gold Primary** | `#d4963c` | Buttons, accents, highlights |
| **Gold Dark** | `#bfa15f` | Hover states, secondary accents |
| **Black** | `#070707` | Main background |
| **Dark** | `#0a0a0a` | Card backgrounds, sections |
| **Text Light** | `#ffffff` | Headings, primary text |
| **Text Muted** | `#aaaaaa` | Body text |
| **Text Dark** | `#888888` | Meta text, subtitles |

Typography

| Font | Weight | Usage |
|------|--------|-------|
| **Montserrat** | 400, 600, 700, 800 | Body text, headings, buttons |
| **Playfair Display** | 700 (italic) | Script-style gold text accents |

Key CSS Variables
```css
:root {
    --gold: #bfa15f;
    --gold-light: #d4a84a;
    --gold-dark: #a38446;
    --gold-glow: rgba(212, 150, 60, 0.3);
    --text-muted: #a5a5a5;
    --text-dark: #666;
}
```

---

📄 Page Breakdown

🏠 Home (`index.html`)
- Hero section with animated title and CTA
- Feature stats bar (100% custom, 5000+ designs, 24-48h delivery, unlimited revisions)
- Portfolio carousel
- Testimonial carousel
- CTA banner

ℹ️ About (`about.html`)
- Legacy hero section
- Artistic vision with image overlay
- Founders story
- CTA banner

🖼️ Portfolio (`portfolio.html`)
- Filterable gallery (ALL, RANDOM, GOTHIC, CHARACTER, ANIMAL)
- 16+ portfolio items with hover effects
- Testimonials grid
- CTA banner

📧 Contact (`contact.html`)
- Contact form with:
  - Name, Phone, Email fields
  - Services dropdown
  - Note textarea
- Styled submit button

❓ FAQ (`faq.html`)
- Accordion-style FAQ
- 4 pre-populated questions
- Smooth expand/collapse

📜 Legal Pages
- Privacy Policy
- Cookie Policy (implied)
- Cookie Settings (implied)

---

🧩 JavaScript Features

### Carousel System
```javascript
setupCarousel("works-track", "works-next", "works-prev");
setupCarousel("review-track", "review-next", "review-prev");
```
- Smooth sliding with cubic-bezier easing
- Responsive card sizing
- Wrap-around functionality

Custom Ink Cursor
- **Brush tip**: Gold dot with glow
- **Trail**: Canvas-drawn ink trail that responds to mouse speed
- **Hover**: Expands on interactive elements
- **Performance**: Throttled rendering, point limiting

Accordion
- Single-expand behavior
- Smooth height transitions
- Icon toggles (+ / −)

Portfolio Filter
- Category-based filtering
- Active state styling
- Smooth show/hide

---

📱 Responsive Breakpoints

| Breakpoint | Target | Changes |
|------------|--------|---------|
| **1024px** | Tablet/Laptop | Grid adjustments, smaller text |
| **768px** | Mobile | Stack layout, smaller navigation, reduced padding |
| **480px** | Small Mobile | Minimal padding, smallest text, compact layout |

---

🔧 Configuration

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --gold: #bfa15f;        /* Change to your brand color */
    --gold-light: #d4a84a;
    --gold-dark: #a38446;
}
```

Adding Portfolio Items
Add new cards in `portfolio.html`:
```html
<div class="portfolio-card" data-category="CATEGORY">
    <div class="card-img-placeholder" style="background-image: url('./path/to/image.jpg');"></div>
</div>
```

Adding FAQ Items
Add new accordion items in `faq.html`:
```html
<div class="accordion-item">
    <button class="accordion-header">
        <span>YOUR QUESTION HERE</span>
        <span class="icon">+</span>
    </button>
    <div class="accordion-content">
        <p>Your answer here.</p>
    </div>
</div>
```

---

🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Opera | ✅ Full |
| iOS Safari | ✅ (partial cursor features) |
| Android Chrome | ✅ (partial cursor features) |

---

🐛 Known Issues & Fixes

| Issue | Solution |
|-------|----------|
| **Custom cursor shows on mobile** | Hidden via `@media (pointer: coarse)` |
| **Background-attachment: fixed breaks on iOS** | Overridden to `scroll` on mobile |
| **Partial loading requires server** | Use live-server or Python HTTP server |
| **Ink trail performance on slow devices** | Point limiting and throttling implemented |

---

📈 Performance Tips

1. **Image Optimization**: Compress images in the `/Home`, `/About`, `/Portfolio` folders
2. **Lazy Loading**: Add `loading="lazy"` to images
3. **CDN Fonts**: Google Fonts are already CDN-hosted
4. **Minimize Canvas Operations**: Render loop is optimized with point limiting

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

👨‍🎨 Credits

- **Design**: Custom Tattoo Lab Team
- **Fonts**: [Google Fonts](https://fonts.google.com) - Montserrat & Playfair Display
- **Images**: Proprietary assets of Custom Tattoo Lab
- **Icons**: Custom SVG icons

---

📞 Contact

- **Website**: [customtattoolab.com](https://customtattoolab.com)
- **Email**: info@customtattoolab.com
- **Studio**: Digital Studio · Worldwide

---

<div align="center">

✦ DIGITAL INK SINCE 2026 ✦

Made with 🖤 by the Custom Tattoo Lab Team

</div>
