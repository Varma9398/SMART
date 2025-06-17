// AI Color Intelligence Engine
// Revolutionary core system for intelligent color generation

export interface ColorPsychology {
  emotion: string;
  colors: string[];
  intensity: number;
  useCases: string[];
}

export interface IndustryContext {
  industry: string;
  primaryColors: string[];
  secondaryColors: string[];
  psychology: string[];
  conversionFactors: string[];
}

export interface SceneAnalysis {
  mood: string;
  dominantEmotions: string[];
  colorHarmony: string;
  suggestedPalette: string[];
  confidence: number;
}

export interface TrendAnalysis {
  currentTrends: string[];
  predictedTrends: string[];
  seasonalInfluences: string[];
  marketFactors: string[];
}

export interface PerformanceMetrics {
  conversionRate: number;
  accessibilityScore: number;
  brandAlignment: number;
  trendRelevance: number;
}

// Pre-trained color psychology database
export const COLOR_PSYCHOLOGY_DB: ColorPsychology[] = [
  {
    emotion: 'trust',
    colors: ['#2563EB', '#1E40AF', '#1E3A8A', '#1F2937', '#374151'],
    intensity: 0.9,
    useCases: ['finance', 'healthcare', 'technology', 'education']
  },
  {
    emotion: 'luxury',
    colors: ['#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#2D1B69'],
    intensity: 0.95,
    useCases: ['fashion', 'automotive', 'real-estate', 'jewelry']
  },
  {
    emotion: 'energy',
    colors: ['#DC2626', '#EA580C', '#D97706', '#CA8A04', '#A3E635'],
    intensity: 0.85,
    useCases: ['fitness', 'sports', 'entertainment', 'food']
  },
  {
    emotion: 'calm',
    colors: ['#059669', '#0D9488', '#0891B2', '#0EA5E9', '#6366F1'],
    intensity: 0.8,
    useCases: ['wellness', 'spa', 'healthcare', 'nature']
  },
  {
    emotion: 'creativity',
    colors: ['#EC4899', '#F97316', '#EAB308', '#84CC16', '#10B981'],
    intensity: 0.9,
    useCases: ['design', 'art', 'marketing', 'education']
  }
];

// Industry-specific context database
export const INDUSTRY_CONTEXT_DB: IndustryContext[] = [
  {
    industry: 'luxury-spa',
    primaryColors: ['#7C3AED', '#6D28D9', '#5B21B6'],
    secondaryColors: ['#059669', '#0D9488', '#0891B2'],
    psychology: ['calm', 'luxury', 'wellness', 'trust'],
    conversionFactors: ['relaxation', 'premium-feel', 'professional-care']
  },
  {
    industry: 'tech-startup',
    primaryColors: ['#2563EB', '#1E40AF', '#1E3A8A'],
    secondaryColors: ['#10B981', '#059669', '#0D9488'],
    psychology: ['trust', 'innovation', 'energy', 'creativity'],
    conversionFactors: ['reliability', 'modern-tech', 'growth-potential']
  },
  {
    industry: 'fitness-app',
    primaryColors: ['#DC2626', '#EA580C', '#D97706'],
    secondaryColors: ['#10B981', '#059669', '#0D9488'],
    psychology: ['energy', 'motivation', 'strength', 'progress'],
    conversionFactors: ['motivation', 'results', 'community']
  },
  {
    industry: 'sustainable-fashion',
    primaryColors: ['#059669', '#0D9488', '#0891B2'],
    secondaryColors: ['#F59E0B', '#D97706', '#CA8A04'],
    psychology: ['calm', 'trust', 'nature', 'responsibility'],
    conversionFactors: ['eco-friendly', 'quality', 'ethical']
  }
];

// Natural Language Processing for color queries
export class AIColorIntelligenceEngine {
  private psychologyDB: ColorPsychology[];
  private industryDB: IndustryContext[];

  constructor() {
    this.psychologyDB = COLOR_PSYCHOLOGY_DB;
    this.industryDB = INDUSTRY_CONTEXT_DB;
  }

  // Natural Language Processing
  async processNaturalLanguageQuery(query: string): Promise<{
    industry: string;
    emotions: string[];
    context: string[];
    suggestedColors: string[];
  }> {
    const lowerQuery = query.toLowerCase();
    
    // Extract industry context
    const industry = this.extractIndustry(lowerQuery);
    
    // Extract emotional context
    const emotions = this.extractEmotions(lowerQuery);
    
    // Extract design context
    const context = this.extractContext(lowerQuery);
    
    // Generate color suggestions
    const suggestedColors = this.generateColorSuggestions(industry, emotions, context);
    
    return {
      industry,
      emotions,
      context,
      suggestedColors
    };
  }

  // Scene Understanding and Analysis
  async analyzeScene(imageData: ImageData): Promise<SceneAnalysis> {
    // Simulate AI scene analysis
    const dominantColors = this.extractDominantColors(imageData);
    const mood = this.analyzeMood(dominantColors);
    const emotions = this.mapColorsToEmotions(dominantColors);
    const harmony = this.analyzeColorHarmony(dominantColors);
    
    return {
      mood,
      dominantEmotions: emotions,
      colorHarmony: harmony,
      suggestedPalette: dominantColors,
      confidence: 0.87
    };
  }

  // Context Awareness
  getIndustryRecommendations(industry: string): IndustryContext | null {
    return this.industryDB.find(ctx => 
      ctx.industry.toLowerCase().includes(industry.toLowerCase())
    ) || null;
  }

  // Psychology Integration
  getEmotionToColorMapping(emotions: string[]): ColorPsychology[] {
    return this.psychologyDB.filter(psych => 
      emotions.some(emotion => 
        psych.emotion.toLowerCase().includes(emotion.toLowerCase())
      )
    );
  }

  // Trend Prediction
  async predictColorTrends(industry: string): Promise<TrendAnalysis> {
    // Simulate AI trend prediction
    const currentTrends = this.getCurrentTrends(industry);
    const predictedTrends = this.predictFutureTrends(industry);
    
    return {
      currentTrends,
      predictedTrends,
      seasonalInfluences: this.getSeasonalInfluences(),
      marketFactors: this.getMarketFactors(industry)
    };
  }

  // Performance Optimization
  async optimizeForConversion(
    colors: string[], 
    industry: string, 
    targetAudience: string
  ): Promise<PerformanceMetrics> {
    const conversionRate = this.calculateConversionRate(colors, industry);
    const accessibilityScore = this.calculateAccessibilityScore(colors);
    const brandAlignment = this.calculateBrandAlignment(colors, industry);
    const trendRelevance = this.calculateTrendRelevance(colors, industry);
    
    return {
      conversionRate,
      accessibilityScore,
      brandAlignment,
      trendRelevance
    };
  }

  // Rule-based intelligent suggestions
  generateIntelligentSuggestions(
    baseColors: string[], 
    context: string
  ): string[] {
    const suggestions: string[] = [];
    
    // Add complementary colors
    suggestions.push(...this.generateComplementaryColors(baseColors));
    
    // Add analogous colors
    suggestions.push(...this.generateAnalogousColors(baseColors));
    
    // Add triadic colors
    suggestions.push(...this.generateTriadicColors(baseColors));
    
    // Add context-specific variations
    suggestions.push(...this.generateContextVariations(baseColors, context));
    
    return [...new Set(suggestions)]; // Remove duplicates
  }

  // Pattern recognition for design trends
  analyzeDesignPatterns(colors: string[]): {
    pattern: string;
    confidence: number;
    recommendations: string[];
  } {
    const patterns = this.identifyColorPatterns(colors);
    const dominantPattern = patterns.reduce((prev, current) => 
      prev.confidence > current.confidence ? prev : current
    );
    
    return {
      pattern: dominantPattern.name,
      confidence: dominantPattern.confidence,
      recommendations: this.generatePatternRecommendations(dominantPattern.name)
    };
  }

  // Private helper methods
  private extractIndustry(query: string): string {
    const industryKeywords = {
      'luxury': 'luxury-spa',
      'spa': 'luxury-spa',
      'wellness': 'luxury-spa',
      'tech': 'tech-startup',
      'startup': 'tech-startup',
      'technology': 'tech-startup',
      'fitness': 'fitness-app',
      'gym': 'fitness-app',
      'workout': 'fitness-app',
      'fashion': 'sustainable-fashion',
      'sustainable': 'sustainable-fashion',
      'eco': 'sustainable-fashion'
    };

    for (const [keyword, industry] of Object.entries(industryKeywords)) {
      if (query.includes(keyword)) {
        return industry;
      }
    }
    
    return 'general';
  }

  private extractEmotions(query: string): string[] {
    const emotions: string[] = [];
    const emotionKeywords = {
      'trust': 'trust',
      'reliable': 'trust',
      'professional': 'trust',
      'luxury': 'luxury',
      'premium': 'luxury',
      'elegant': 'luxury',
      'energy': 'energy',
      'vibrant': 'energy',
      'dynamic': 'energy',
      'calm': 'calm',
      'peaceful': 'calm',
      'relaxing': 'calm',
      'creative': 'creativity',
      'innovative': 'creativity',
      'artistic': 'creativity'
    };

    for (const [keyword, emotion] of Object.entries(emotionKeywords)) {
      if (query.includes(keyword)) {
        emotions.push(emotion);
      }
    }
    
    return emotions;
  }

  private extractContext(query: string): string[] {
    const context: string[] = [];
    
    if (query.includes('website')) context.push('web-design');
    if (query.includes('app')) context.push('mobile-app');
    if (query.includes('brand')) context.push('branding');
    if (query.includes('marketing')) context.push('marketing');
    if (query.includes('logo')) context.push('logo-design');
    
    return context;
  }

  private generateColorSuggestions(
    industry: string, 
    emotions: string[], 
    context: string[]
  ): string[] {
    const suggestions: string[] = [];
    
    // Get industry-specific colors
    const industryContext = this.getIndustryRecommendations(industry);
    if (industryContext) {
      suggestions.push(...industryContext.primaryColors);
      suggestions.push(...industryContext.secondaryColors);
    }
    
    // Get emotion-based colors
    const emotionColors = this.getEmotionToColorMapping(emotions);
    emotionColors.forEach(psych => {
      suggestions.push(...psych.colors);
    });
    
    return [...new Set(suggestions)];
  }

  private extractDominantColors(imageData: ImageData): string[] {
    // Simplified color extraction - in real implementation, this would use
    // advanced computer vision algorithms
    return ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  }

  private analyzeMood(colors: string[]): string {
    // Simplified mood analysis
    const warmColors = colors.filter(color => 
      ['red', 'orange', 'yellow'].some(warm => 
        this.hexToHsl(color).h >= 0 && this.hexToHsl(color).h <= 60
      )
    );
    
    return warmColors.length > colors.length / 2 ? 'warm' : 'cool';
  }

  private mapColorsToEmotions(colors: string[]): string[] {
    const emotions: string[] = [];
    
    colors.forEach(color => {
      const hsl = this.hexToHsl(color);
      if (hsl.s > 70 && hsl.l > 50) {
        emotions.push('energy');
      } else if (hsl.l < 30) {
        emotions.push('luxury');
      } else if (hsl.h >= 120 && hsl.h <= 240) {
        emotions.push('calm');
      }
    });
    
    return [...new Set(emotions)];
  }

  private analyzeColorHarmony(colors: string[]): string {
    // Simplified harmony analysis
    return 'complementary';
  }

  private getCurrentTrends(industry: string): string[] {
    const trends: { [key: string]: string[] } = {
      'luxury-spa': ['Neutral Tones', 'Sage Green', 'Soft Lavender'],
      'tech-startup': ['Electric Blue', 'Neon Green', 'Dark Mode'],
      'fitness-app': ['High Contrast', 'Bold Reds', 'Energetic Oranges'],
      'sustainable-fashion': ['Earth Tones', 'Recycled Colors', 'Natural Greens']
    };
    
    return trends[industry] || ['Minimalist', 'Bold Contrast', 'Gradient'];
  }

  private predictFutureTrends(industry: string): string[] {
    // Simulate trend prediction
    return ['AI-Generated Colors', 'Dynamic Palettes', 'Context-Aware Themes'];
  }

  private getSeasonalInfluences(): string[] {
    return ['Spring Pastels', 'Summer Vibrancy', 'Autumn Warmth', 'Winter Cool'];
  }

  private getMarketFactors(industry: string): string[] {
    return ['Consumer Preferences', 'Competitor Analysis', 'Cultural Shifts'];
  }

  private calculateConversionRate(colors: string[], industry: string): number {
    // Simulate conversion rate calculation
    return 0.85 + Math.random() * 0.1;
  }

  private calculateAccessibilityScore(colors: string[]): number {
    // Simulate accessibility calculation
    return 0.92 + Math.random() * 0.05;
  }

  private calculateBrandAlignment(colors: string[], industry: string): number {
    // Simulate brand alignment calculation
    return 0.88 + Math.random() * 0.08;
  }

  private calculateTrendRelevance(colors: string[], industry: string): number {
    // Simulate trend relevance calculation
    return 0.90 + Math.random() * 0.07;
  }

  private generateComplementaryColors(colors: string[]): string[] {
    return colors.map(color => {
      const hsl = this.hexToHsl(color);
      return this.hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
    });
  }

  private generateAnalogousColors(colors: string[]): string[] {
    const analogous: string[] = [];
    colors.forEach(color => {
      const hsl = this.hexToHsl(color);
      for (let i = 1; i <= 2; i++) {
        analogous.push(this.hslToHex((hsl.h + i * 30) % 360, hsl.s, hsl.l));
        analogous.push(this.hslToHex((hsl.h - i * 30 + 360) % 360, hsl.s, hsl.l));
      }
    });
    return analogous;
  }

  private generateTriadicColors(colors: string[]): string[] {
    return colors.map(color => {
      const hsl = this.hexToHsl(color);
      return this.hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
    });
  }

  private generateContextVariations(colors: string[], context: string): string[] {
    // Generate context-specific variations
    return colors.map(color => {
      const hsl = this.hexToHsl(color);
      if (context.includes('dark')) {
        return this.hslToHex(hsl.h, hsl.s, Math.max(0.1, hsl.l - 0.3));
      } else if (context.includes('light')) {
        return this.hslToHex(hsl.h, hsl.s, Math.min(0.9, hsl.l + 0.3));
      }
      return color;
    });
  }

  private identifyColorPatterns(colors: string[]): Array<{name: string, confidence: number}> {
    return [
      { name: 'Monochromatic', confidence: 0.75 },
      { name: 'Complementary', confidence: 0.85 },
      { name: 'Triadic', confidence: 0.60 },
      { name: 'Analogous', confidence: 0.70 }
    ];
  }

  private generatePatternRecommendations(pattern: string): string[] {
    const recommendations: { [key: string]: string[] } = {
      'Monochromatic': ['Add accent colors', 'Vary saturation levels', 'Consider texture'],
      'Complementary': ['Balance color usage', 'Use neutrals as buffers', 'Consider split-complementary'],
      'Triadic': ['Use one color as dominant', 'Add neutral tones', 'Consider tetradic variation'],
      'Analogous': ['Add complementary accent', 'Vary value and saturation', 'Consider monochromatic variation']
    };
    
    return recommendations[pattern] || ['Experiment with different harmonies', 'Consider accessibility', 'Test with your audience'];
  }

  private hexToHsl(hex: string): {h: number, s: number, l: number} {
    // Simplified hex to HSL conversion
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    
    if (max === min) {
      return { h: 0, s: 0, l };
    }
    
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    let h = 0;
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
    
    return { h: h * 360, s, l };
  }

  private hslToHex(h: number, s: number, l: number): string {
    // Simplified HSL to hex conversion
    const hue = h / 360;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    const hueToRgb = (t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const r = Math.round(hueToRgb(hue) * 255);
    const g = Math.round(hueToRgb(hue + 1/3) * 255);
    const b = Math.round(hueToRgb(hue + 2/3) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}

// Export singleton instance
export const aiColorEngine = new AIColorIntelligenceEngine(); 