import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Upload, Download, Save, Sparkles, Brain, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageUpload from '@/components/ImageUpload';
import PaletteDisplay from '@/components/PaletteDisplay';
import HarmonyGenerator from '@/components/HarmonyGenerator';
import SavedPalettes from '@/components/SavedPalettes';
import AllPalettesDisplay from '@/components/AllPalettesDisplay';
import ImageHistory from '@/components/ImageHistory';
import WelcomePopup from '@/components/WelcomePopup';
import BrandStory from '@/components/BrandStory';
import WorkflowSteps from '@/components/WorkflowSteps';
import { BrandIntelligence } from '@/components/BrandIntelligence';
import { ColorInfo, ColorPalette, extractColorsFromImage, extractAllColorPalettes, clearAllPalettes, savePalette, getSavedPalettes } from '@/utils/colorUtils';
import { ImageHistoryItem, saveImageToHistory, getImageHistory, removeImageFromHistory } from '@/utils/imageHistoryUtils';
import { aiColorEngine } from '@/utils/aiColorEngine';
import { BrandProfile } from '@/utils/brandIntelligence';

const Index = () => {
  const [extractedColors, setExtractedColors] = useState<ColorInfo[]>([]);
  const [allPalettes, setAllPalettes] = useState<{
    dominant: ColorInfo[];
    vibrant: ColorInfo[];
    muted: ColorInfo[];
    light: ColorInfo[];
    dark: ColorInfo[];
  }>({
    dominant: [],
    vibrant: [],
    muted: [],
    light: [],
    dark: []
  });
  const [currentPalette, setCurrentPalette] = useState<ColorInfo[]>([]);
  const [currentHarmony, setCurrentHarmony] = useState<string>('extracted');
  const [hasImage, setHasImage] = useState(false);
  const [imageHistory, setImageHistory] = useState<ImageHistoryItem[]>([]);
  const [currentDisplayedImageId, setCurrentDisplayedImageId] = useState<string | null>(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState<string>('inspire');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [aiTrends, setAiTrends] = useState<any>(null);
  const [aiPerformance, setAiPerformance] = useState<any>(null);

  // Check if user is new on component mount
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('ai_colour_engine_welcome_shown') === 'true';
    if (!hasSeenWelcome) {
      setShowWelcomePopup(true);
    }
  }, []);

  // Load image history and saved palettes on component mount
  useEffect(() => {
    const history = getImageHistory();
    setImageHistory(history);
    console.log('Initial image history loaded:', history);

    const palettes = getSavedPalettes();
    setSavedPalettes(palettes);
    console.log('Initial saved palettes loaded:', palettes);
  }, []);

  // Synchronize saved palettes with localStorage whenever savedPalettes state changes
  useEffect(() => {
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const handleStartCreating = () => {
    // Scroll to the upload sections
    const uploadSection = document.querySelector('.upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleImageUpload = async (imageData: ImageData, fileName: string, base64Data: string) => {
    setCurrentWorkflowStep('analyze');
    setAiAnalysis(null);
    setAiTrends(null);
    setAiPerformance(null);
    // AI scene analysis
    const scene = await aiColorEngine.analyzeScene(imageData);
    setAiAnalysis(scene);
    setCurrentWorkflowStep('brand-intelligence');
    // Simulate palette extraction
    const colors = extractColorsFromImage(imageData);
    const palettes = extractAllColorPalettes(imageData);
    setExtractedColors(colors);
    setAllPalettes(palettes);
    setCurrentPalette(palettes.dominant);
    setCurrentHarmony('dominant');
    setHasImage(true);
    // Save to history
    const dominantColors = palettes.dominant.map(color => color.hex);
    const historyItem = saveImageToHistory(
      fileName,
      Object.keys(palettes).length,
      dominantColors,
      base64Data
    );
    setImageHistory(prev => [historyItem, ...prev]);
    setCurrentDisplayedImageId(historyItem.id);
    // AI trend prediction
    const trends = await aiColorEngine.predictColorTrends(scene.mood || 'general');
    setAiTrends(trends);
    // AI performance optimization
    const perf = await aiColorEngine.optimizeForConversion(dominantColors, scene.mood || 'general', 'general');
    setAiPerformance(perf);
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setExtractedColors([]);
      setAllPalettes({
        dominant: [],
        vibrant: [],
        muted: [],
        light: [],
        dark: []
      });
      setCurrentPalette([]);
      setHasImage(false);
      setCurrentDisplayedImageId(null);
      console.log('Image cleared, current displayed ID set to null.');
    }
  };

  const handleHistoryImageSelect = (imageId: string) => {
    console.log('Attempting to select image from history with ID:', imageId);
    const selectedImage = imageHistory.find(item => item.id === imageId);
    if (selectedImage) {
      console.log('Image found in history:', selectedImage.name);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const colors = extractColorsFromImage(imageData);
          const palettes = extractAllColorPalettes(imageData);
          
          setExtractedColors(colors);
          setAllPalettes(palettes);
          setCurrentPalette(palettes.dominant);
          setCurrentHarmony('dominant');
          setHasImage(true);
          setCurrentDisplayedImageId(selectedImage.id);
          console.log('Successfully loaded and re-processed image from history.');
          console.log('Current displayed image ID after history selection:', selectedImage.id);
        }
      };
      img.src = selectedImage.imageData;
    } else {
      console.log('Image with ID', imageId, 'not found in history.');
    }
  };

  const handleDeleteImage = (imageId: string) => {
    console.log('Attempting to delete image with ID:', imageId);
    removeImageFromHistory(imageId);
    const updatedHistory = getImageHistory();
    setImageHistory(updatedHistory); // Refresh history after deletion
    console.log('Image history after deletion:', updatedHistory);

    if (currentDisplayedImageId === imageId) {
      console.log('Deleted image was currently displayed. Clearing current palette.');
      setExtractedColors([]);
      setAllPalettes({
        dominant: [], vibrant: [], muted: [], light: [], dark: []
      });
      setCurrentPalette([]);
      setHasImage(false);
      setCurrentDisplayedImageId(null);
    }
  };

  const handleClearSavedPalettes = () => {
    clearAllPalettes();
    setSavedPalettes([]); // Update local state after clearing
    console.log('All saved palettes cleared.');
  };

  const handleHarmonyGenerated = (colors: ColorInfo[], harmony: string) => {
    console.log('Harmony generated:', harmony, colors.length); // Debug log
    setCurrentPalette(colors);
    setCurrentHarmony(harmony);
  };

  const handlePaletteLoad = (colors: ColorInfo[], harmony: string) => {
    console.log('Palette loaded:', harmony, colors.length); // Debug log
    setCurrentPalette(colors);
    setCurrentHarmony(harmony);
  };

  const handlePaletteSelect = (colors: ColorInfo[], type: string) => {
    console.log('Palette selected:', type, colors.length); // Debug log
    setCurrentPalette(colors);
    setCurrentHarmony(type);
  };

  const handlePaletteSave = (palette: ColorPalette) => {
    console.log('Saving palette:', palette.name); // Debug log
    const updatedPalettes = [...savedPalettes, palette];
    setSavedPalettes(updatedPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedPalettes));
    console.log('Palette saved successfully. Total saved palettes:', updatedPalettes.length);
  };

  const handleVisionDescription = async (description: string) => {
    setCurrentWorkflowStep('analyze');
    setAiAnalysis(null);
    setAiTrends(null);
    setAiPerformance(null);
    // AI NLP
    const nlp = await aiColorEngine.processNaturalLanguageQuery(description);
    setAiAnalysis(nlp);
    setCurrentWorkflowStep('brand-intelligence');
    // Use suggested colors as mock palette
    const mockPalettes = {
      dominant: nlp.suggestedColors.map(hex => ({ hex, rgb: { r: 0, g: 0, b: 0 }, hsl: { h: 0, s: 0, l: 0 }, name: hex })),
      vibrant: [],
      muted: [],
      light: [],
      dark: []
    };
    setExtractedColors(mockPalettes.dominant);
    setAllPalettes(mockPalettes);
    setCurrentPalette(mockPalettes.dominant);
    setCurrentHarmony('dominant');
    setHasImage(true);
    // AI trend prediction
    const trends = await aiColorEngine.predictColorTrends(nlp.industry || 'general');
    setAiTrends(trends);
    // AI performance optimization
    const perf = await aiColorEngine.optimizeForConversion(nlp.suggestedColors, nlp.industry || 'general', 'general');
    setAiPerformance(perf);
  };

  const handleWorkflowStepClick = (stepId: string) => {
    setCurrentWorkflowStep(stepId);
    
    // Scroll to relevant section based on step
    if (stepId === 'brand-intelligence') {
      const brandSection = document.querySelector('.brand-intelligence-section');
      if (brandSection) {
        brandSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    } else if (stepId === 'inspire') {
      const uploadSection = document.querySelector('.upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Welcome Popup */}
      <WelcomePopup 
        isOpen={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)} 
      />

      {/* Enhanced Header */}
      <header className="relative z-10 py-8 pl-4">
        <div>
          <div className="flex items-center justify-start">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center premium-glass glow">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  AI Colour Engine
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Professional Color Palette Generator with AI Intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Bar - Unique Value Propositions */}
      <section className="w-full flex justify-center mb-8">
        <div className="w-full max-w-7xl px-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 bg-gradient-to-r from-background/60 to-accent/10 rounded-2xl shadow-lg border border-border/30 py-4 px-2 md:px-6 premium-glass">
            {/* AI Color Assistant (Button) */}
            <button
              type="button"
              className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-[160px] transition hover:bg-primary/10 active:scale-95 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => {
                const el = document.getElementById('creative-tools');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="font-bold text-base md:text-lg gradient-text">AI Color Assistant</span>
              <span className="text-xs md:text-sm text-muted-foreground">Natural language color queries</span>
            </button>
            {/* Performance-Based (not clickable) */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-[160px]">
              <span className="font-bold text-base md:text-lg gradient-text">Performance-Based</span>
              <span className="text-xs md:text-sm text-muted-foreground">Colors optimized for conversion</span>
            </div>
            {/* Brand Intelligence (Button) */}
            <button
              type="button"
              className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-[160px] transition hover:bg-primary/10 active:scale-95 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => {
                const el = document.getElementById('ai-intelligence-hub');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="font-bold text-base md:text-lg gradient-text">Brand Intelligence</span>
              <span className="text-xs md:text-sm text-muted-foreground">Logo-aware color generation</span>
            </button>
            {/* Accessibility-First (not clickable) */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-[160px]">
              <span className="font-bold text-base md:text-lg gradient-text">Accessibility-First</span>
              <span className="text-xs md:text-sm text-muted-foreground">WCAG 2.1 AAA compliance</span>
            </div>
            {/* Designer Workflow (not clickable) */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-[160px]">
              <span className="font-bold text-base md:text-lg gradient-text">Designer Workflow</span>
              <span className="text-xs md:text-sm text-muted-foreground">Integrates with real processes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-full mx-auto px-8 pb-12 space-y-8">
        {/* Hero Section with Brand Story */}
        <section className="relative">
          <BrandStory onStartCreating={handleStartCreating} />
        </section>

        {/* Feature Panels */}
        {/* Workflow Steps Panel */}
        <section className="relative">
          <WorkflowSteps 
            currentStep={currentWorkflowStep} 
            onStepClick={handleWorkflowStepClick}
          />
        </section>

        {/* AI Intelligence Hub Panel */}
        <section id="ai-intelligence-hub" className="premium-glass rounded-3xl p-8 brand-intelligence-section">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-2">
              AI Intelligence Hub
            </h2>
            <p className="text-muted-foreground">
              Let AI understand your brand and create intelligent color strategies
            </p>
          </div>
          <BrandIntelligence 
            onBrandCreated={(brand: BrandProfile) => {
              console.log('Brand created:', brand.name);
            }}
          />
        </section>

        {/* Creative Tools Panel */}
        <section id="creative-tools" className="relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 mb-4">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Creative Tools
            </h2>
            <p className="text-muted-foreground">
              Upload images or describe your vision to generate professional color palettes
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImageUpload 
              onImageUpload={handleImageUpload} 
              onImageChange={handleImageChange}
              onVisionDescription={handleVisionDescription}
            />
            <ImageHistory
              key={JSON.stringify(imageHistory)}
              history={imageHistory}
              onSelectImage={handleHistoryImageSelect}
              onDeleteImage={handleDeleteImage}
              currentDisplayedImageId={currentDisplayedImageId}
            />
          </div>
        </section>

        {/* AI Analysis Results */}
        {aiAnalysis && (
          <section className="space-y-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 mb-4">
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold gradient-text mb-2">
                AI Analysis Results
              </h2>
              <p className="text-muted-foreground">
                Intelligent insights and recommendations for your color strategy
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="premium-glass hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Color Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiAnalysis.mood && <p><span className="font-medium">Mood:</span> {aiAnalysis.mood}</p>}
                  {aiAnalysis.dominantEmotions && <p><span className="font-medium">Emotions:</span> {aiAnalysis.dominantEmotions.join(', ')}</p>}
                  {aiAnalysis.colorHarmony && <p><span className="font-medium">Harmony:</span> {aiAnalysis.colorHarmony}</p>}
                  {aiAnalysis.industry && <p><span className="font-medium">Industry:</span> {aiAnalysis.industry}</p>}
                </CardContent>
              </Card>

              {aiTrends && (
                <Card className="premium-glass hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Trend Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p><span className="font-medium">Current Trends:</span> {aiTrends.currentTrends.join(', ')}</p>
                    <p><span className="font-medium">Predicted Trends:</span> {aiTrends.predictedTrends.join(', ')}</p>
                    <p><span className="font-medium">Seasonal Influences:</span> {aiTrends.seasonalInfluences.join(', ')}</p>
                  </CardContent>
                </Card>
              )}

              {aiPerformance && (
                <Card className="premium-glass hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p><span className="font-medium">Conversion Rate:</span> {(aiPerformance.conversionRate * 100).toFixed(1)}%</p>
                    <p><span className="font-medium">Accessibility Score:</span> {(aiPerformance.accessibilityScore * 100).toFixed(1)}%</p>
                    <p><span className="font-medium">Brand Alignment:</span> {(aiPerformance.brandAlignment * 100).toFixed(1)}%</p>
                    <p><span className="font-medium">Trend Relevance:</span> {(aiPerformance.trendRelevance * 100).toFixed(1)}%</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* All Palettes Display */}
        {hasImage && (
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold gradient-text mb-2">
                Generated Palettes
              </h2>
              <p className="text-muted-foreground">
                Multiple palette variations extracted from your image
              </p>
            </div>
            <AllPalettesDisplay 
              palettes={allPalettes} 
              onPaletteSelect={handlePaletteSelect}
            />
          </section>
        )}

        {/* Palette Workspace */}
        {hasImage && (
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold gradient-text mb-2">
                Palette Workspace
              </h2>
              <p className="text-muted-foreground">
                Refine and customize your selected color palette
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PaletteDisplay 
                colors={currentPalette}
                harmony={currentHarmony}
                onSave={handlePaletteSave}
              />
              <HarmonyGenerator 
                baseColor={extractedColors[0] || null} 
                onHarmonyGenerated={handleHarmonyGenerated}
              />
            </div>
          </section>
        )}

        {/* Saved Palettes */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Your Collection
            </h2>
            <p className="text-muted-foreground">
              Access and manage your saved color palettes
            </p>
          </div>
          <SavedPalettes 
            palettes={savedPalettes}
            onPaletteLoad={handlePaletteLoad} 
            onClearPalettes={handleClearSavedPalettes}
            onDeletePalette={(id) => setSavedPalettes(prev => prev.filter(p => p.id !== id))}
          />
        </section>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative mt-16 py-12 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold gradient-text">
                AI Colour Engine
              </h3>
            </div>
            <p className="text-lg font-semibold mb-2 gradient-text-secondary">
              Free Professional Color Palette Generator with AI Intelligence
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto">
              Create hex color palettes, generate professional color schemes, and export color palettes for design. 
              Advanced color scheme tool for designers and artists powered by cutting-edge AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
