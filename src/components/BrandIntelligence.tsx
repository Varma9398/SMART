import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { 
  Upload, 
  Palette, 
  Users, 
  TrendingUp, 
  FileText, 
  Settings, 
  History,
  Target,
  Zap,
  Shield,
  Eye,
  Brain,
  Sparkles
} from 'lucide-react';
import { 
  brandIntelligence, 
  BrandProfile, 
  LogoAnalysis, 
  CompetitorAnalysis,
  BrandGuidelines,
  BrandEvolution,
  INDUSTRY_COLOR_MAPPING
} from '../utils/brandIntelligence';

interface BrandIntelligenceProps {
  onBrandCreated?: (brand: BrandProfile) => void;
}

// Utility to generate complementary colors if industry mapping is missing
function generateSecondaryColors(primaryColors: string[]): string[] {
  // Simple complementary: shift hue by 180deg in HSL
  function hexToHsl(hex: string) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }
  function hslToHex(h: number, s: number, l: number) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  return primaryColors.map(hex => {
    const hsl = hexToHsl(hex);
    const compH = (hsl.h + 180) % 360;
    return hslToHex(compH, hsl.s, hsl.l);
  });
}

export const BrandIntelligence: React.FC<BrandIntelligenceProps> = ({ onBrandCreated }) => {
  const [currentBrand, setCurrentBrand] = useState<BrandProfile | null>(null);
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [logoAnalysis, setLogoAnalysis] = useState<LogoAnalysis | null>(null);
  const [competitors, setCompetitors] = useState<CompetitorAnalysis[]>([]);
  const [guidelines, setGuidelines] = useState<BrandGuidelines | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [brandName, setBrandName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => {
    const allBrands = brandIntelligence.getAllBrands();
    setBrands(allBrands);
    if (allBrands.length > 0 && !currentBrand) {
      setCurrentBrand(allBrands[0]);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const imageData = await getImageData(file);
      const analysis = await brandIntelligence.extractLogoColors(imageData);
      setLogoAnalysis(analysis);
      
      // Auto-create brand if name is provided
      if (brandName) {
        let secondaryColors: string[] = [];
        if (INDUSTRY_COLOR_MAPPING[selectedIndustry]?.secondary) {
          secondaryColors = [...INDUSTRY_COLOR_MAPPING[selectedIndustry].secondary];
        } else {
          secondaryColors = generateSecondaryColors(analysis.dominantColors);
        }
        const newBrand = brandIntelligence.createBrand({
          name: brandName,
          logo: URL.createObjectURL(file),
          primaryColors: analysis.dominantColors,
          secondaryColors,
          personality: analysis.brandPersonality,
          industry: selectedIndustry
        });
        
        setCurrentBrand(newBrand);
        setBrands(brandIntelligence.getAllBrands());
        onBrandCreated?.(newBrand);
      }
    } catch (error) {
      console.error('Error analyzing logo:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getImageData = (file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          resolve(imageData);
        } else {
          reject(new Error('Failed to get image data'));
        }
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const analyzeCompetitors = async () => {
    if (!currentBrand) return;
    
    setIsAnalyzing(true);
    try {
      const competitorAnalysis = await brandIntelligence.analyzeCompetitors(
        currentBrand.primaryColors,
        currentBrand.industry
      );
      setCompetitors(competitorAnalysis);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateGuidelines = () => {
    if (!currentBrand) return;
    
    const brandGuidelines = brandIntelligence.generateBrandGuidelines(currentBrand);
    setGuidelines(brandGuidelines);
  };

  const createNewBrand = () => {
    if (!brandName || !logoAnalysis) return;
    
    let secondaryColors: string[] = [];
    if (INDUSTRY_COLOR_MAPPING[selectedIndustry]?.secondary) {
      secondaryColors = [...INDUSTRY_COLOR_MAPPING[selectedIndustry].secondary];
    } else {
      secondaryColors = generateSecondaryColors(logoAnalysis.dominantColors);
    }
    const newBrand = brandIntelligence.createBrand({
      name: brandName,
      primaryColors: logoAnalysis.dominantColors,
      secondaryColors,
      personality: logoAnalysis.brandPersonality,
      industry: selectedIndustry
    });
    
    setCurrentBrand(newBrand);
    setBrands(brandIntelligence.getAllBrands());
    onBrandCreated?.(newBrand);
  };

  const switchBrand = (brandId: string) => {
    const brand = brandIntelligence.getBrand(brandId);
    if (brand) {
      setCurrentBrand(brand);
    }
  };

  const deleteBrand = (brandId: string) => {
    if (brandIntelligence.deleteBrand(brandId)) {
      setBrands(brandIntelligence.getAllBrands());
      if (currentBrand?.id === brandId) {
        const remainingBrands = brandIntelligence.getAllBrands();
        setCurrentBrand(remainingBrands.length > 0 ? remainingBrands[0] : null);
      }
    }
  };

  const getEvolutionData = (brandId: string): BrandEvolution[] => {
    return brandIntelligence.getBrandEvolution(brandId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Brand Intelligence System
        </h2>
        <p className="text-muted-foreground">
          AI-powered brand analysis, competitor insights, and automated guidelines
        </p>
      </div>

      <Tabs defaultValue="logo-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="logo-analysis" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Logo Analysis
          </TabsTrigger>
          <TabsTrigger value="personality" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Personality
          </TabsTrigger>
          <TabsTrigger value="competitors" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Competitors
          </TabsTrigger>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="brands" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Brands
          </TabsTrigger>
        </TabsList>

        {/* Logo Analysis Tab */}
        <TabsContent value="logo-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Logo Color Extraction
              </CardTitle>
              <CardDescription>
                Upload your logo to extract brand colors and analyze visual identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brand-name">Brand Name</Label>
                    <Input
                      id="brand-name"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="Enter your brand name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(INDUSTRY_COLOR_MAPPING).map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry.charAt(0).toUpperCase() + industry.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </>
                    )}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>

                {logoAnalysis && (
                  <div className="space-y-4">
                    <div>
                      <Label>Dominant Colors</Label>
                      <div className="flex gap-2 mt-2">
                        {logoAnalysis.dominantColors.map((color, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg border-2 border-border"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Complexity</span>
                        <span>{Math.round(logoAnalysis.complexity * 100)}%</span>
                      </div>
                      <Progress value={logoAnalysis.complexity * 100} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Readability</span>
                        <span>{Math.round(logoAnalysis.readability * 100)}%</span>
                      </div>
                      <Progress value={logoAnalysis.readability * 100} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Scalability</span>
                        <span>{Math.round(logoAnalysis.scalability * 100)}%</span>
                      </div>
                      <Progress value={logoAnalysis.scalability * 100} />
                    </div>
                  </div>
                )}
              </div>

              {logoAnalysis && brandName && (
                <Button onClick={createNewBrand} className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Brand Profile
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personality Analysis Tab */}
        <TabsContent value="personality" className="space-y-6">
          {currentBrand ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Brand Personality Analysis
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of your brand's personality and target audience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Brand Mood</Label>
                      <Badge variant="secondary" className="mt-2">
                        {currentBrand.personality.mood}
                      </Badge>
                    </div>

                    <div>
                      <Label>Personality Traits</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentBrand.personality.traits.map((trait, index) => (
                          <Badge key={index} variant="outline">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Target Audience</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentBrand.personality.targetAudience.map((audience, index) => (
                          <Badge key={index} variant="secondary">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Confidence Score</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={currentBrand.personality.confidence * 100} className="flex-1" />
                        <span className="text-sm font-medium">
                          {Math.round(currentBrand.personality.confidence * 100)}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <p className="text-sm text-muted-foreground mt-2">
                        {currentBrand.personality.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Upload a logo first to analyze brand personality
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Competitor Analysis Tab */}
        <TabsContent value="competitors" className="space-y-6">
          {currentBrand ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Competitor Analysis
                </CardTitle>
                <CardDescription>
                  Compare your brand colors against industry competitors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={analyzeCompetitors} 
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing Competitors...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analyze Competitors
                    </>
                  )}
                </Button>

                {competitors.length > 0 && (
                  <div className="space-y-4">
                    {competitors.map((competitor, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold">{competitor.competitor}</h4>
                              <p className="text-sm text-muted-foreground">
                                Similarity: {Math.round(competitor.similarity * 100)}%
                              </p>
                            </div>
                            <Badge variant={competitor.similarity > 0.7 ? "destructive" : "secondary"}>
                              {competitor.similarity > 0.7 ? "High Similarity" : "Different"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Differences</Label>
                              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                {competitor.differences.map((diff, i) => (
                                  <li key={i}>• {diff}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Opportunities</Label>
                              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                {competitor.opportunities.map((opp, i) => (
                                  <li key={i}>• {opp}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {competitor.threats.length > 0 && (
                            <Alert className="mt-4">
                              <Shield className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Threats:</strong> {competitor.threats.join(', ')}
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Create a brand profile first to analyze competitors
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Brand Guidelines Tab */}
        <TabsContent value="guidelines" className="space-y-6">
          {currentBrand ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Brand Guidelines Generator
                </CardTitle>
                <CardDescription>
                  AI-generated brand guidelines and usage rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={generateGuidelines} className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Guidelines
                </Button>

                {guidelines && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="primary-usage">
                      <AccordionTrigger>Primary Color Usage</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {guidelines.primaryUsage.map((rule, index) => (
                            <li key={index} className="text-sm">• {rule}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="secondary-usage">
                      <AccordionTrigger>Secondary Color Usage</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {guidelines.secondaryUsage.map((rule, index) => (
                            <li key={index} className="text-sm">• {rule}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="accessibility">
                      <AccordionTrigger>Accessibility Guidelines</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {guidelines.accessibility.map((rule, index) => (
                            <li key={index} className="text-sm">• {rule}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="combinations">
                      <AccordionTrigger>Color Combinations</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {guidelines.combinations.map((combo, index) => (
                            <div key={index} className="flex gap-2">
                              {combo.map((color, colorIndex) => (
                                <div
                                  key={colorIndex}
                                  className="w-8 h-8 rounded border"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="restrictions">
                      <AccordionTrigger>Usage Restrictions</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {guidelines.restrictions.map((restriction, index) => (
                            <li key={index} className="text-sm">• {restriction}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="examples">
                      <AccordionTrigger>Usage Examples</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {guidelines.examples.map((example, index) => (
                            <li key={index} className="text-sm">• {example}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Create a brand profile first to generate guidelines
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Multi-Brand Management Tab */}
        <TabsContent value="brands" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Multi-Brand Management
              </CardTitle>
              <CardDescription>
                Manage multiple client brands and track evolution over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Brand Selector */}
              <div>
                <Label>Select Brand</Label>
                <Select 
                  value={currentBrand?.id || ''} 
                  onValueChange={switchBrand}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Brand Info */}
              {currentBrand && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Brand Name</Label>
                      <p className="text-sm font-medium">{currentBrand.name}</p>
                    </div>
                    <div>
                      <Label>Industry</Label>
                      <p className="text-sm font-medium capitalize">{currentBrand.industry}</p>
                    </div>
                  </div>

                  <div>
                    <Label>Primary Colors</Label>
                    <div className="flex gap-2 mt-2">
                      {currentBrand.primaryColors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Secondary Colors</Label>
                    <div className="flex gap-2 mt-2">
                      {currentBrand.secondaryColors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Brand Evolution */}
                  <div>
                    <Label className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      Brand Evolution
                    </Label>
                    <div className="mt-2 space-y-2">
                      {getEvolutionData(currentBrand.id).map((evolution, index) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-sm font-medium">
                                  {evolution.date.toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Impact: {Math.round(evolution.impact * 100)}%
                                </p>
                              </div>
                              <Badge variant="outline">
                                {evolution.reason}
                              </Badge>
                            </div>
                            <div className="flex gap-2 mb-2">
                              {evolution.colors.map((color, colorIndex) => (
                                <div
                                  key={colorIndex}
                                  className="w-6 h-6 rounded border"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {evolution.changes.map((change, changeIndex) => (
                                <li key={changeIndex}>• {change}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Delete Brand */}
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteBrand(currentBrand.id)}
                    className="w-full"
                  >
                    Delete Brand
                  </Button>
                </div>
              )}

              {brands.length === 0 && (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No brands created yet. Upload a logo to create your first brand profile.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 