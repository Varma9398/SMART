import React from 'react';

// SEO utility for dynamic meta tag management
export const updateSEO = (options: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}) => {
  const {
    title = "AI Colour Engine - Free Color Palette Generator | Professional Color Scheme Creator",
    description = "AI Colour Engine: Free professional color palette generator with 22,000+ monthly users. Create beautiful color schemes, generate hex color palettes, and design stunning professional color palettes with AI-powered color intelligence.",
    keywords = "color palette generator, color scheme generator, professional color palettes, AI color generator, hex color palette, free color palette generator for designers, professional color scheme creator online, AI powered color palette tool, export color palettes for design, color theory generator for artists, smart color palette generator, professional color palette pro, advanced color scheme tool, color palette generator with export",
    image = "https://varma9398.github.io/SMART/og-image.png",
    url = "https://varma9398.github.io/SMART/",
    type = "website"
  } = options;

  // Update document title
  document.title = title;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);

  // Update meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', keywords);

  // Update Open Graph tags
  updateOpenGraph({
    title,
    description,
    image,
    url,
    type
  });

  // Update Twitter Card tags
  updateTwitterCard({
    title,
    description,
    image
  });

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

const updateOpenGraph = (options: {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}) => {
  const { title, description, image, url, type } = options;

  const ogTags = {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
};

const updateTwitterCard = (options: {
  title: string;
  description: string;
  image: string;
}) => {
  const { title, description, image } = options;

  const twitterTags = {
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
};

// Predefined SEO configurations for different pages
export const SEOConfigs = {
  home: {
    title: "AI Colour Engine - Free Color Palette Generator | Professional Color Scheme Creator",
    description: "AI Colour Engine: Free professional color palette generator with 22,000+ monthly users. Create beautiful color schemes, generate hex color palettes, and design stunning professional color palettes with AI-powered color intelligence. Perfect for designers, artists, and developers.",
    keywords: "color palette generator, color scheme generator, professional color palettes, AI color generator, hex color palette, free color palette generator for designers, professional color scheme creator online, AI powered color palette tool, export color palettes for design, color theory generator for artists, smart color palette generator, professional color palette pro, advanced color scheme tool, color palette generator with export"
  },
  paletteGenerator: {
    title: "Professional Color Palette Generator - Create Beautiful Color Schemes | AI Colour Engine",
    description: "Generate stunning professional color palettes with our AI-powered color palette generator. Create harmonious color schemes, explore hex color combinations, and design beautiful palettes for your projects. Free professional color palette generator for designers.",
    keywords: "professional color palette generator, color scheme generator, hex color palette, AI color generator, free color palette generator for designers, professional color scheme creator online, color palette generator with export, advanced color scheme tool"
  },
  brandIntelligence: {
    title: "Brand Color Intelligence - AI-Powered Professional Brand Color Analysis | AI Colour Engine",
    description: "Analyze and generate professional brand colors with AI intelligence. Create consistent brand color palettes, analyze competitor colors, and build strong brand identities. Professional color scheme creator online.",
    keywords: "brand colors, brand color palette, brand identity, color analysis, brand intelligence, competitor colors, professional color scheme creator online, AI powered color palette tool"
  },
  aiAssistant: {
    title: "AI Color Assistant - Smart Color Suggestions for Professional Design | AI Colour Engine",
    description: "Get AI-powered color suggestions and recommendations for professional design projects. Our intelligent color assistant helps you choose perfect colors for any design project. Color theory generator for artists.",
    keywords: "AI color assistant, color suggestions, color recommendations, smart color picker, AI color help, color theory generator for artists, AI powered color palette tool"
  },
  harmonyTools: {
    title: "Color Harmony Tools - Create Professional Harmonious Color Schemes | AI Colour Engine",
    description: "Create harmonious professional color schemes with our advanced color harmony tools. Explore complementary, analogous, triadic, and other color relationships. Professional color scheme creator online.",
    keywords: "color harmony, color relationships, complementary colors, analogous colors, triadic colors, color theory, professional color scheme creator online, advanced color scheme tool"
  }
};

// Hook for easy SEO updates in components
export const useSEO = (config: keyof typeof SEOConfigs | typeof SEOConfigs[keyof typeof SEOConfigs]) => {
  const seoConfig = typeof config === 'string' ? SEOConfigs[config] : config;
  
  React.useEffect(() => {
    updateSEO(seoConfig);
  }, [seoConfig]);
}; 