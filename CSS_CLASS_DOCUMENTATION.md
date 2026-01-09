# CSS Class Documentation - main.min.css

## Global Elements

### Body
```css
body                    /* Base styles, light mode (off-white bg) */
body.dark-mode         /* Dark mode variant (dark bg) */
```

### Containers & Layout
```css
.container             /* Max-width 1200px, auto margin, padding 0 20px */
.header                /* Fixed navbar, top 0, z-index 1000 */
.header-content        /* Flex container for logo, nav, buttons */
```

## Navigation

### Header Components
```css
.header                /* Fixed positioning, backdrop blur, shadow */
.header-content        /* Inner flex container, max-width 1200px */
.logo                  /* Logo with icon + text, flex display */
.logo i                /* Icon styling, color secondary */
```

### Navigation Menu
```css
.nav-menu              /* Flex row, gap 2rem, hidden on mobile */
.nav-link              /* Navigation links with hover underline */
.nav-link:hover        /* Color change to primary */
.nav-link.active       /* Underline bar after active link */
.nav-link.active::after/* Gradient underline for active link */
```

### Theme Toggle
```css
.theme-toggle          /* Flex container for theme button */
.theme-btn             /* Circular button, border with primary color */
.theme-btn:hover       /* Slight background on hover */
```

### Mobile Menu
```css
.menu-toggle           /* Hidden on desktop, 3-line hamburger */
.menu-toggle span      /* Individual hamburger lines */
.menu-toggle span:hover /* Hover effect on lines */
.nav-menu.active       /* Show menu on mobile when active */
```

## Hero Section

### Structure
```css
.hero                  /* Padding 80px 20px 40px, gradient background */
.hero-content          /* Max-width 800px, centered */
.hero-title            /* Font-size clamp(2rem, 5vw, 3.5rem) */
.glow-text             /* Gradient text effect, smooth text rendering */
.hero-subtitle         /* Font-size clamp(1rem, 2.5vw, 1.3rem), opacity 0.9 */
```

### Buttons
```css
.hero-buttons          /* Flex row, gap 1rem, centered, flex-wrap */
.btn                   /* Base button: padding 12px 30px, rounded, transition */
.btn:hover             /* Lift effect: transform translateY(-2px) */
.btn:active            /* Press effect: translateY(0) */

.btn-primary           /* Red gradient background, white text, shadow */
.btn-primary:hover     /* Enhanced shadow, lift animation */

.btn-secondary         /* Transparent, white border, white text */
.btn-secondary:hover   /* White background, red text */

.btn-large             /* Padding 15px 50px, font-size 1.1rem */
```

## Features Section

### Section Structure
```css
.features-section      /* Padding 60px 20px, light background */
.features-container    /* Max-width 1200px, auto margins */
.section-title         /* Font-size clamp(1.75rem, 4vw, 2.5rem) */
.section-subtitle      /* Font-size 1.1rem, centered, text color */
```

### Feature Cards
```css
.features-grid         /* Grid with auto-fit, minmax(280px, 1fr), gap 2rem */
.feature-card          /* White bg, padding 2rem, border-radius 8px, shadow */
.feature-card:hover    /* translateY(-10px), red border, enhanced shadow */
.feature-icon          /* Font-size 3rem, color red, margin-bottom 1rem */
.feature-card:hover .feature-icon /* scale(1.2) rotate(-10deg) */
.feature-card h3       /* Color #2c3e50, margin-bottom 0.5rem */
.feature-card p        /* Color #7f8c8d */
```

## CTA Section

### Call-to-Action
```css
.cta-section           /* Gradient background, white text, padding 60px 20px */
.cta-container         /* Max-width 600px, centered */
.cta-section h2        /* Font-size clamp(1.75rem, 4vw, 2.5rem) */
.cta-section p         /* Font-size 1.1rem, opacity 0.9 */
```

## Footer

### Footer Structure
```css
.footer                /* Dark bg #2a2a2a, padding 3rem 0 1rem, margin-top 4rem */
.footer-content        /* Grid auto-fit, minmax(250px, 1fr), gap 2rem */
.footer-section        /* Column in footer grid */
.footer-section h3     /* Font-size 1.2rem, margin-bottom 1rem */
.footer-section p      /* Line-height 1.6, smaller font */
```

### Footer Links
```css
.footer-section ul     /* List-style none */
.footer-section ul li  /* Margin-bottom 0.5rem */
.footer-section ul li a /* Dark text, transition color */
.footer-section ul li a:hover /* Color change to primary */
```

### Social Links
```css
.social-links          /* Flex row, gap 1rem, centered */
.social-links a        /* Font-size 1.5rem, 40px × 40px container */
.social-links a:hover  /* Color primary, transform translateY(-3px) */
```

### Footer Bottom
```css
.footer-bottom         /* Text center, padding-top 2rem, border-top */
.footer-bottom p       /* Smaller font 0.9rem, color gray */
```

## Dark Mode Variants

Apply class `dark-mode` to `<body>` for dark theme:

```css
body.dark-mode                    /* Dark background, light text */
body.dark-mode .header            /* Darker header, adjusted shadow */
body.dark-mode .logo              /* Light color text */
body.dark-mode .nav-link          /* Light text color */
body.dark-mode .feature-card      /* Dark card background */
body.dark-mode .feature-card h3   /* Light text in cards */
body.dark-mode .section-title     /* Light text titles */
body.dark-mode ::-webkit-scrollbar-track /* Dark scrollbar track */
```

## Responsive Classes

### Tablet (< 768px)
```css
@media(max-width: 768px) {
    .nav-menu              /* Hidden, absolute positioned */
    .menu-toggle           /* Visible flex */
    .hero                  /* Reduced padding */
    .hero-title            /* Smaller size */
    .features-grid         /* Single column */
    .btn                   /* Full width */
    .footer-content        /* Single column grid */
}
```

### Mobile (< 480px)
```css
@media(max-width: 480px) {
    .header-content        /* Reduced padding */
    .logo                  /* Smaller font */
    .nav-link              /* Adjusted padding */
    .hero-title            /* Even smaller */
    .feature-card          /* Reduced padding */
    .feature-icon          /* Smaller icon */
    .footer-content        /* Centered text */
}
```

## Utility Classes

### Performance
```css
.dark-mode             /* Dark theme applied to body */
.slow-connection       /* Applied when on 2G/3G */
.fast-connection       /* Applied when on 4G */
.keyboard-nav          /* Applied when using keyboard navigation */
```

### Content Visibility
```css
content-visibility: auto  /* Used on cards for performance */
will-change: auto         /* Selective GPU acceleration */
contain: layout style paint /* Improve rendering performance */
```

## CSS Variables (Custom Properties)

```css
--primary              #D4845C        /* Main brand color */
--primary-dark         #B8623D        /* Darker variant */
--primary-light        #E8A876        /* Lighter variant */
--secondary            #067e66        /* Secondary brand color */
--accent               #E8C547        /* Accent color */
--white                #FFFFFF        /* White */
--off-white            #F8F7F2        /* Off-white bg */
--gray-dark            #6B6966        /* Dark gray text */
--gray-light           #E8E6E1        /* Light gray */
--black                #2F2D2A        /* Black text */
--base-transition      0.3s ease      /* Standard transition duration */
--base-radius          8px            /* Border radius */
--shadow-sm            0 2px 8px...   /* Small shadow */
--shadow-md            0 5px 15px...  /* Medium shadow */
--shadow-lg            0 10px 30px... /* Large shadow */
```

## Animation & Effects

### Hover Effects
```css
/* Buttons */
transform: translateY(-2px)     /* Lift on hover */
box-shadow: enhanced            /* Shadow increase */

/* Cards */
transform: translateY(-10px)    /* Card lift */
border-color: primary           /* Highlight border */
box-shadow: enhanced            /* Enhanced shadow */

/* Icons */
transform: scale(1.2)           /* Scale up */
transform: rotate(-10deg)       /* Slight rotation */

/* Links */
transform: translateY(-3px)     /* Social links lift */
```

### Transitions
```css
transition: color 0.3s ease     /* Smooth color changes */
transition: all 0.3s ease       /* All properties */
transition: transform 0.3s ease /* Smooth transforms */
```

## Accessibility Classes

### Keyboard Navigation
```css
body.keyboard-nav               /* Applied when using Tab key */
/* Can be used to add outline on focusable elements */
```

### Reduced Motion
```css
@media(prefers-reduced-motion: reduce) {
    /* All animations disabled */
    animation-duration: 0.01ms !important
    transition-duration: 0.01ms !important
}
```

### High Contrast
```css
/* Dark mode provides built-in high contrast */
body.dark-mode {
    --black: #FFFFFF        /* White text */
    --off-white: #1a1a18    /* Dark background */
}
```

## Custom Properties Usage

```css
/* In your own CSS, use: */
color: var(--primary);
background: var(--off-white);
border-radius: var(--base-radius);
box-shadow: var(--shadow-md);
transition: all var(--base-transition);

/* Dark mode automatically applies variants */
body.dark-mode {
    color: var(--off-white);
    background: var(--black);
}
```

## Common Patterns

### Button with Icon
```html
<a href="#" class="btn btn-primary">
    <i class="fas fa-icon"></i> Button Text
</a>
```

### Card with Hover
```html
<div class="feature-card">
    <i class="feature-icon fas fa-icon"></i>
    <h3>Title</h3>
    <p>Description</p>
</div>
```

### Responsive Container
```html
<div class="container">
    <div class="features-grid">
        <div class="feature-card">...</div>
    </div>
</div>
```

### Navigation with Mobile Menu
```html
<header class="header">
    <div class="header-content">
        <a href="/" class="logo">Logo</a>
        <nav class="nav-menu">
            <a href="#" class="nav-link">Link</a>
        </nav>
        <div class="theme-toggle">
            <button class="theme-btn">🌙</button>
        </div>
        <button class="menu-toggle">☰</button>
    </div>
</header>
```

## Breakpoint Reference

```
Mobile: 0px - 480px
Tablet: 481px - 768px
Desktop: 769px - 1920px+

Use with:
@media(max-width: 480px)   { /* Mobile */ }
@media(max-width: 768px)   { /* Tablet */ }
@media(min-width: 769px)   { /* Desktop */ }
```

---

**Note:** This is the complete CSS documentation for `main.min.css`. All styles have been consolidated from 20 separate CSS files into this single, optimized file.
