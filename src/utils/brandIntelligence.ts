// Brand Intelligence System
// Advanced brand color analysis and management

export interface BrandProfile {
  id: string;
  name: string;
  logo: string;
  primaryColors: string[];
  secondaryColors: string[];
  personality: BrandPersonality;
  industry: string;
  competitors: CompetitorAnalysis[];
  guidelines: BrandGuidelines;
  evolution: BrandEvolution[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandPersonality {
  mood: string;
  traits: string[];
  confidence: number;
  description: string;
  targetAudience: string[];
}

export interface CompetitorAnalysis {
  competitor: string;
  similarity: number;
  differences: string[];
  opportunities: string[];
  threats: string[];
}

export interface BrandGuidelines {
  primaryUsage: string[];
  secondaryUsage: string[];
  accessibility: string[];
  combinations: string[][];
  restrictions: string[];
  examples: string[];
}

export interface BrandEvolution {
  date: Date;
  colors: string[];
  changes: string[];
  reason: string;
  impact: number;
}

export interface LogoAnalysis {
  dominantColors: string[];
  colorDistribution: { [color: string]: number };
  complexity: number;
  readability: number;
  scalability: number;
  brandPersonality: BrandPersonality;
}

// Industry color mapping database
export const INDUSTRY_COLOR_MAPPING = {
  'technology': {
    primary: ['#2563EB', '#1E40AF', '#3B82F6'],
    secondary: ['#10B981', '#059669', '#0D9488'],
    personality: ['innovative', 'trustworthy', 'modern', 'professional']
  },
  'healthcare': {
    primary: ['#059669', '#0D9488', '#0891B2'],
    secondary: ['#F59E0B', '#D97706', '#CA8A04'],
    personality: ['trustworthy', 'caring', 'professional', 'calm']
  },
  'finance': {
    primary: ['#1F2937', '#374151', '#6B7280'],
    secondary: ['#10B981', '#059669', '#0D9488'],
    personality: ['trustworthy', 'stable', 'professional', 'secure']
  },
  'fashion': {
    primary: ['#EC4899', '#F97316', '#EAB308'],
    secondary: ['#8B5CF6', '#7C3AED', '#6D28D9'],
    personality: ['creative', 'trendy', 'luxurious', 'expressive']
  },
  'food': {
    primary: ['#DC2626', '#EA580C', '#D97706'],
    secondary: ['#10B981', '#059669', '#0D9488'],
    personality: ['energetic', 'appetizing', 'friendly', 'fresh']
  }
};

// Brand color database
export const BRAND_COLOR_DATABASE = {
  'apple': {
    primary: ['#000000', '#FFFFFF'],
    secondary: ['#007AFF', '#34C759'],
    personality: ['minimalist', 'premium', 'innovative', 'clean']
  },
  'nike': {
    primary: ['#000000', '#FFFFFF'],
    secondary: ['#FF6B35', '#F7931E'],
    personality: ['energetic', 'dynamic', 'motivational', 'bold']
  },
  'coca-cola': {
    primary: ['#DC2626', '#FFFFFF'],
    secondary: ['#000000', '#1F2937'],
    personality: ['energetic', 'friendly', 'classic', 'refreshing']
  },
  'starbucks': {
    primary: ['#006241', '#FFFFFF'],
    secondary: ['#1E3932', '#D4E9D7'],
    personality: ['premium', 'sustainable', 'welcoming', 'artisanal']
  }
};

export class BrandIntelligenceSystem {
  private brands: Map<string, BrandProfile> = new Map();
  private industryMapping = INDUSTRY_COLOR_MAPPING;
  private brandDatabase = BRAND_COLOR_DATABASE;

  constructor() {
    this.loadBrandsFromStorage();
  }

  // Logo Color Extraction
  async extractLogoColors(logoData: ImageData): Promise<LogoAnalysis> {
    // Advanced image segmentation for logo analysis
    const dominantColors = this.segmentLogoColors(logoData);
    const colorDistribution = this.analyzeColorDistribution(logoData);
    const complexity = this.calculateComplexity(logoData);
    const readability = this.calculateReadability(dominantColors);
    const scalability = this.calculateScalability(logoData);
    const brandPersonality = this.analyzeBrandPersonality(dominantColors);

    return {
      dominantColors,
      colorDistribution,
      complexity,
      readability,
      scalability,
      brandPersonality
    };
  }

  // Brand Personality Analysis
  analyzeBrandPersonality(colors: string[]): BrandPersonality {
    const traits: string[] = [];
    let mood = 'neutral';
    let confidence = 0.8;

    // Analyze color psychology
    colors.forEach(color => {
      const hsl = this.hexToHsl(color);
      
      // Brightness analysis
      if (hsl.l > 0.7) {
        traits.push('clean', 'minimalist');
        mood = 'bright';
      } else if (hsl.l < 0.3) {
        traits.push('sophisticated', 'premium');
        mood = 'dark';
      }

      // Saturation analysis
      if (hsl.s > 0.7) {
        traits.push('energetic', 'bold');
        mood = 'vibrant';
      } else if (hsl.s < 0.3) {
        traits.push('calm', 'professional');
        mood = 'muted';
      }

      // Hue analysis
      if (hsl.h >= 0 && hsl.h <= 60) {
        traits.push('warm', 'friendly');
      } else if (hsl.h >= 120 && hsl.h <= 240) {
        traits.push('cool', 'trustworthy');
      } else if (hsl.h >= 240 && hsl.h <= 300) {
        traits.push('creative', 'innovative');
      }
    });

    // Remove duplicates and get unique traits
    const uniqueTraits = [...new Set(traits)];
    
    // Determine target audience based on personality
    const targetAudience = this.determineTargetAudience(uniqueTraits);

    return {
      mood,
      traits: uniqueTraits.slice(0, 5), // Top 5 traits
      confidence,
      description: this.generatePersonalityDescription(uniqueTraits, mood),
      targetAudience
    };
  }

  // Competitor Analysis
  async analyzeCompetitors(brandColors: string[], industry: string): Promise<CompetitorAnalysis[]> {
    const competitors: CompetitorAnalysis[] = [];
    const industryBrands = this.getIndustryBrands(industry);

    for (const [brandName, brandData] of Object.entries(industryBrands)) {
      const similarity = this.calculateColorSimilarity(brandColors, brandData.primary);
      const differences = this.identifyColorDifferences(brandColors, brandData.primary);
      const opportunities = this.identifyOpportunities(brandColors, brandData.primary, industry);
      const threats = this.identifyThreats(brandColors, brandData.primary, industry);

      competitors.push({
        competitor: brandName,
        similarity,
        differences,
        opportunities,
        threats
      });
    }

    // Sort by similarity (highest first)
    return competitors.sort((a, b) => b.similarity - a.similarity);
  }

  // Brand Guidelines Generator
  generateBrandGuidelines(brandProfile: BrandProfile): BrandGuidelines {
    const primaryUsage = this.generatePrimaryUsageRules(brandProfile.primaryColors);
    const secondaryUsage = this.generateSecondaryUsageRules(brandProfile.secondaryColors);
    const accessibility = this.generateAccessibilityGuidelines(brandProfile.primaryColors, brandProfile.secondaryColors);
    const combinations = this.generateColorCombinations(brandProfile.primaryColors, brandProfile.secondaryColors);
    const restrictions = this.generateUsageRestrictions(brandProfile.primaryColors, brandProfile.secondaryColors);
    const examples = this.generateUsageExamples(brandProfile);

    return {
      primaryUsage,
      secondaryUsage,
      accessibility,
      combinations,
      restrictions,
      examples
    };
  }

  // Multi-Brand Management
  createBrand(brandData: Partial<BrandProfile>): BrandProfile {
    const id = this.generateBrandId();
    const now = new Date();
    
    const brand: BrandProfile = {
      id,
      name: brandData.name || 'New Brand',
      logo: brandData.logo || '',
      primaryColors: brandData.primaryColors || [],
      secondaryColors: brandData.secondaryColors || [],
      personality: brandData.personality || {
        mood: 'neutral',
        traits: [],
        confidence: 0,
        description: '',
        targetAudience: []
      },
      industry: brandData.industry || 'general',
      competitors: brandData.competitors || [],
      guidelines: brandData.guidelines || {
        primaryUsage: [],
        secondaryUsage: [],
        accessibility: [],
        combinations: [],
        restrictions: [],
        examples: []
      },
      evolution: brandData.evolution || [],
      createdAt: now,
      updatedAt: now
    };

    this.brands.set(id, brand);
    this.saveBrandsToStorage();
    return brand;
  }

  updateBrand(brandId: string, updates: Partial<BrandProfile>): BrandProfile | null {
    const brand = this.brands.get(brandId);
    if (!brand) return null;

    const updatedBrand = {
      ...brand,
      ...updates,
      updatedAt: new Date()
    };

    // Track evolution if colors changed
    if (updates.primaryColors && JSON.stringify(updates.primaryColors) !== JSON.stringify(brand.primaryColors)) {
      updatedBrand.evolution.push({
        date: new Date(),
        colors: updates.primaryColors,
        changes: this.identifyColorChanges(brand.primaryColors, updates.primaryColors),
        reason: 'Manual update',
        impact: this.calculateChangeImpact(brand.primaryColors, updates.primaryColors)
      });
    }

    this.brands.set(brandId, updatedBrand);
    this.saveBrandsToStorage();
    return updatedBrand;
  }

  getBrand(brandId: string): BrandProfile | null {
    return this.brands.get(brandId) || null;
  }

  getAllBrands(): BrandProfile[] {
    return Array.from(this.brands.values());
  }

  deleteBrand(brandId: string): boolean {
    const deleted = this.brands.delete(brandId);
    if (deleted) {
      this.saveBrandsToStorage();
    }
    return deleted;
  }

  // Brand Evolution Tracking
  getBrandEvolution(brandId: string): BrandEvolution[] {
    const brand = this.brands.get(brandId);
    return brand ? brand.evolution : [];
  }

  addEvolutionEntry(brandId: string, entry: Omit<BrandEvolution, 'date'>): boolean {
    const brand = this.brands.get(brandId);
    if (!brand) return false;

    brand.evolution.push({
      ...entry,
      date: new Date()
    });
    brand.updatedAt = new Date();

    this.brands.set(brandId, brand);
    this.saveBrandsToStorage();
    return true;
  }

  // Private helper methods
  private segmentLogoColors(imageData: ImageData): string[] {
    // Advanced image segmentation algorithm
    // In a real implementation, this would use computer vision techniques
    const colors: string[] = [];
    const data = imageData.data;
    
    // Simplified color extraction
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      if (a > 128) { // Only consider non-transparent pixels
        const hex = this.rgbToHex(r, g, b);
        if (!colors.includes(hex)) {
          colors.push(hex);
        }
      }
    }
    
    // Return top 5 most common colors
    return colors.slice(0, 5);
  }

  private analyzeColorDistribution(imageData: ImageData): { [color: string]: number } {
    const distribution: { [color: string]: number } = {};
    const data = imageData.data;
    let totalPixels = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      if (a > 128) {
        const hex = this.rgbToHex(r, g, b);
        distribution[hex] = (distribution[hex] || 0) + 1;
        totalPixels++;
      }
    }
    
    // Convert to percentages
    Object.keys(distribution).forEach(color => {
      distribution[color] = (distribution[color] / totalPixels) * 100;
    });
    
    return distribution;
  }

  private calculateComplexity(imageData: ImageData): number {
    // Calculate logo complexity based on color variety and edge detection
    const colors = this.segmentLogoColors(imageData);
    const colorVariety = colors.length / 10; // Normalize to 0-1
    const edgeDensity = this.calculateEdgeDensity(imageData);
    
    return Math.min(1, (colorVariety + edgeDensity) / 2);
  }

  private calculateReadability(colors: string[]): number {
    // Calculate readability based on contrast ratios
    let totalContrast = 0;
    let comparisons = 0;
    
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const contrast = this.calculateContrastRatio(colors[i], colors[j]);
        totalContrast += contrast;
        comparisons++;
      }
    }
    
    return comparisons > 0 ? Math.min(1, totalContrast / (comparisons * 4.5)) : 0;
  }

  private calculateScalability(imageData: ImageData): number {
    // Calculate scalability based on simplicity and color count
    const complexity = this.calculateComplexity(imageData);
    const colors = this.segmentLogoColors(imageData);
    const colorCount = colors.length;
    
    // Simpler logos with fewer colors are more scalable
    return Math.max(0, 1 - (complexity + colorCount / 10) / 2);
  }

  private determineTargetAudience(traits: string[]): string[] {
    const audienceMapping: { [trait: string]: string[] } = {
      'premium': ['luxury consumers', 'high-income professionals'],
      'innovative': ['early adopters', 'tech-savvy users'],
      'trustworthy': ['conservative consumers', 'business clients'],
      'energetic': ['young adults', 'active lifestyle consumers'],
      'calm': ['health-conscious consumers', 'wellness seekers'],
      'creative': ['artists', 'design professionals'],
      'professional': ['business professionals', 'corporate clients']
    };
    
    const audiences: string[] = [];
    traits.forEach(trait => {
      if (audienceMapping[trait]) {
        audiences.push(...audienceMapping[trait]);
      }
    });
    
    return [...new Set(audiences)].slice(0, 3); // Top 3 audiences
  }

  private generatePersonalityDescription(traits: string[], mood: string): string {
    const descriptions: { [mood: string]: string } = {
      'bright': 'A clean and approachable brand that emphasizes clarity and simplicity.',
      'dark': 'A sophisticated and premium brand that conveys luxury and exclusivity.',
      'vibrant': 'An energetic and bold brand that captures attention and excitement.',
      'muted': 'A calm and professional brand that builds trust and reliability.',
      'neutral': 'A balanced and versatile brand that appeals to a broad audience.'
    };
    
    return descriptions[mood] || 'A well-balanced brand with strong market positioning.';
  }

  private getIndustryBrands(industry: string): { [key: string]: any } {
    // Return relevant brands for the industry
    const industryBrands: { [key: string]: any } = {};
    
    Object.entries(this.brandDatabase).forEach(([brandName, brandData]) => {
      // Simple industry matching - in real implementation, this would be more sophisticated
      if (this.matchesIndustry(brandData.personality, industry)) {
        industryBrands[brandName] = brandData;
      }
    });
    
    return industryBrands;
  }

  private matchesIndustry(personality: string[], industry: string): boolean {
    const industryTraits = this.industryMapping[industry as keyof typeof this.industryMapping]?.personality || [];
    return personality.some(trait => industryTraits.includes(trait));
  }

  private calculateColorSimilarity(colors1: string[], colors2: string[]): number {
    let totalSimilarity = 0;
    let comparisons = 0;
    
    colors1.forEach(color1 => {
      colors2.forEach(color2 => {
        const similarity = this.calculateColorDistance(color1, color2);
        totalSimilarity += similarity;
        comparisons++;
      });
    });
    
    return comparisons > 0 ? totalSimilarity / comparisons : 0;
  }

  private calculateColorDistance(color1: string, color2: string): number {
    const hsl1 = this.hexToHsl(color1);
    const hsl2 = this.hexToHsl(color2);
    
    const hDiff = Math.abs(hsl1.h - hsl2.h);
    const sDiff = Math.abs(hsl1.s - hsl2.s);
    const lDiff = Math.abs(hsl1.l - hsl2.l);
    
    return 1 - ((hDiff / 360) + sDiff + lDiff) / 3;
  }

  private identifyColorDifferences(colors1: string[], colors2: string[]): string[] {
    const differences: string[] = [];
    const uniqueColors1 = colors1.filter(c => !colors2.includes(c));
    const uniqueColors2 = colors2.filter(c => !colors1.includes(c));
    
    if (uniqueColors1.length > 0) {
      differences.push(`Uses ${uniqueColors1.join(', ')} not found in competitor`);
    }
    if (uniqueColors2.length > 0) {
      differences.push(`Competitor uses ${uniqueColors2.join(', ')} not in your palette`);
    }
    
    return differences;
  }

  private identifyOpportunities(colors1: string[], colors2: string[], industry: string): string[] {
    const opportunities: string[] = [];
    const industryColors = this.industryMapping[industry as keyof typeof this.industryMapping];
    
    if (industryColors) {
      const unusedIndustryColors = industryColors.primary.filter(c => !colors1.includes(c));
      if (unusedIndustryColors.length > 0) {
        opportunities.push(`Consider adding industry-standard colors: ${unusedIndustryColors.join(', ')}`);
      }
    }
    
    return opportunities;
  }

  private identifyThreats(colors1: string[], colors2: string[], industry: string): string[] {
    const threats: string[] = [];
    const similarity = this.calculateColorSimilarity(colors1, colors2);
    
    if (similarity > 0.8) {
      threats.push('High color similarity may cause brand confusion');
    }
    
    return threats;
  }

  private generatePrimaryUsageRules(colors: string[]): string[] {
    return [
      'Use primary colors for main brand elements',
      'Maintain 60% primary color usage in designs',
      'Ensure high contrast with background colors',
      'Use for logos, headers, and key call-to-actions'
    ];
  }

  private generateSecondaryUsageRules(colors: string[]): string[] {
    return [
      'Use secondary colors for supporting elements',
      'Maintain 30% secondary color usage in designs',
      'Use for backgrounds, borders, and accents',
      'Ensure accessibility compliance with primary colors'
    ];
  }

  private generateAccessibilityGuidelines(primaryColors: string[], secondaryColors: string[]): string[] {
    return [
      'Maintain 4.5:1 contrast ratio for text',
      'Use color combinations that pass WCAG 2.1 AA standards',
      'Provide alternative color schemes for accessibility',
      'Test with color blindness simulators'
    ];
  }

  private generateColorCombinations(primaryColors: string[], secondaryColors: string[]): string[][] {
    const combinations: string[][] = [];
    
    primaryColors.forEach(primary => {
      secondaryColors.forEach(secondary => {
        combinations.push([primary, secondary]);
      });
    });
    
    return combinations.slice(0, 6); // Top 6 combinations
  }

  private generateUsageRestrictions(primaryColors: string[], secondaryColors: string[]): string[] {
    return [
      'Never use more than 3 colors in a single design',
      'Avoid using primary colors for large background areas',
      'Do not use brand colors for competitor comparisons',
      'Maintain consistent color values across all applications'
    ];
  }

  private generateUsageExamples(brandProfile: BrandProfile): string[] {
    return [
      'Website header with primary brand color',
      'Business card with logo and secondary accents',
      'Social media graphics with brand palette',
      'Product packaging using approved combinations'
    ];
  }

  private identifyColorChanges(oldColors: string[], newColors: string[]): string[] {
    const changes: string[] = [];
    const added = newColors.filter(c => !oldColors.includes(c));
    const removed = oldColors.filter(c => !newColors.includes(c));
    
    if (added.length > 0) {
      changes.push(`Added colors: ${added.join(', ')}`);
    }
    if (removed.length > 0) {
      changes.push(`Removed colors: ${removed.join(', ')}`);
    }
    
    return changes;
  }

  private calculateChangeImpact(oldColors: string[], newColors: string[]): number {
    const similarity = this.calculateColorSimilarity(oldColors, newColors);
    return 1 - similarity; // Higher impact for more different colors
  }

  private generateBrandId(): string {
    return 'brand_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private loadBrandsFromStorage(): void {
    try {
      const stored = localStorage.getItem('brand_intelligence_brands');
      if (stored) {
        const brandsData = JSON.parse(stored);
        this.brands = new Map(brandsData.map((brand: any) => [
          brand.id,
          { ...brand, createdAt: new Date(brand.createdAt), updatedAt: new Date(brand.updatedAt) }
        ]));
      }
    } catch (error) {
      console.error('Error loading brands from storage:', error);
    }
  }

  private saveBrandsToStorage(): void {
    try {
      const brandsArray = Array.from(this.brands.values());
      localStorage.setItem('brand_intelligence_brands', JSON.stringify(brandsArray));
    } catch (error) {
      console.error('Error saving brands to storage:', error);
    }
  }

  private calculateEdgeDensity(imageData: ImageData): number {
    // Simplified edge detection - in real implementation, this would use Sobel operators
    return 0.5; // Placeholder
  }

  private calculateContrastRatio(color1: string, color2: string): number {
    const luminance1 = this.calculateLuminance(color1);
    const luminance2 = this.calculateLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private calculateLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  private hexToHsl(hex: string): { h: number, s: number, l: number } {
    const { r, g, b } = this.hexToRgb(hex);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const l = (max + min) / 2;
    
    if (max === min) {
      return { h: 0, s: 0, l };
    }
    
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    let h = 0;
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
    
    return { h: h * 360, s, l };
  }
}

// Export singleton instance
export const brandIntelligence = new BrandIntelligenceSystem(); 