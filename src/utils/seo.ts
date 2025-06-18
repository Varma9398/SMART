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
    title = "AI Colour Engine - Free Color Palette Generator | Create Beautiful Color Schemes",
    description = "AI Colour Engine: Free online color palette generator. Create beautiful color schemes, generate color combinations, and design stunning palettes with AI-powered color intelligence.",
    keywords = "color palette generator, color scheme generator, color combinations, AI color generator, free color palette",
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
    title: "AI Colour Engine - Free Color Palette Generator | Create Beautiful Color Schemes",
    description: "AI Colour Engine: Free online color palette generator. Create beautiful color schemes, generate color combinations, and design stunning palettes with AI-powered color intelligence. Perfect for designers, artists, and developers.",
    keywords: "color palette generator, color scheme generator, color combinations, AI color generator, free color palette, color picker, color wheel"
  },
  paletteGenerator: {
    title: "Color Palette Generator - Create Beautiful Color Schemes | AI Colour Engine",
    description: "Generate stunning color palettes with our AI-powered color palette generator. Create harmonious color schemes, explore color combinations, and design beautiful palettes for your projects.",
    keywords: "color palette generator, color scheme generator, color combinations, palette maker, color harmony, color theory"
  },
  brandIntelligence: {
    title: "Brand Color Intelligence - AI-Powered Brand Color Analysis | AI Colour Engine",
    description: "Analyze and generate brand colors with AI intelligence. Create consistent brand color palettes, analyze competitor colors, and build strong brand identities.",
    keywords: "brand colors, brand color palette, brand identity, color analysis, brand intelligence, competitor colors"
  },
  aiAssistant: {
    title: "AI Color Assistant - Get Smart Color Suggestions | AI Colour Engine",
    description: "Get AI-powered color suggestions and recommendations. Our intelligent color assistant helps you choose perfect colors for any design project.",
    keywords: "AI color assistant, color suggestions, color recommendations, smart color picker, AI color help"
  },
  harmonyTools: {
    title: "Color Harmony Tools - Create Harmonious Color Schemes | AI Colour Engine",
    description: "Create harmonious color schemes with our advanced color harmony tools. Explore complementary, analogous, triadic, and other color relationships.",
    keywords: "color harmony, color relationships, complementary colors, analogous colors, triadic colors, color theory"
  }
};

// Hook for easy SEO updates in components
export const useSEO = (config: keyof typeof SEOConfigs | typeof SEOConfigs[keyof typeof SEOConfigs]) => {
  const seoConfig = typeof config === 'string' ? SEOConfigs[config] : config;
  
  React.useEffect(() => {
    updateSEO(seoConfig);
  }, [seoConfig]);
}; 