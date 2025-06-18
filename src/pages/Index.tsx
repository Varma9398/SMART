import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Upload, Download, Save } from 'lucide-react';
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
    setShowWelcomePopup(true);
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
    // Instead of calling savePalette directly here, update the state
    setSavedPalettes(prevPalettes => {
      const existingIndex = prevPalettes.findIndex(p => p.id === palette.id);
      if (existingIndex > -1) {
        // Update existing palette
        const updated = [...prevPalettes];
        updated[existingIndex] = palette;
        return updated;
      } else {
        // Add new palette to the beginning
        return [palette, ...prevPalettes];
      }
    });
    console.log('Palette saved successfully (via state update):', palette.name); // Debug log
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
    <div className="min-h-screen gradient-bg p-4">
      {/* Welcome Popup */}
      <WelcomePopup 
        isOpen={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)} 
      />

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center glass-card">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Colour Engine
              </h1>
              <p className="text-sm text-muted-foreground">Professional Color Palette Generator & AI Color Scheme Creator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Brand Story Section */}
        <BrandStory onStartCreating={handleStartCreating} />

        {/* Workflow Steps */}
        <WorkflowSteps 
          currentStep={currentWorkflowStep} 
          onStepClick={handleWorkflowStepClick}
        />

        {/* Spacer to separate brand story from tools */}
        <div className="h-8"></div>

        {/* Brand Intelligence System - Now above upload sections */}
        <div className="glass-card p-6 brand-intelligence-section">
          <BrandIntelligence 
            onBrandCreated={(brand: BrandProfile) => {
              console.log('Brand created:', brand.name);
              // You can add additional logic here when a brand is created
            }}
          />
        </div>

        {/* Top row - Tools (Image Upload and Image History) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 upload-section">
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

        {/* AI Analysis Results - Now below upload sections */}
        {aiAnalysis && (
          <div className="my-6">
            <div className="glass-card p-6 mb-4">
              <h3 className="text-lg font-bold mb-2 text-primary">AI Color Intelligence Analysis</h3>
              {aiAnalysis.mood && <p><b>Mood:</b> {aiAnalysis.mood}</p>}
              {aiAnalysis.dominantEmotions && <p><b>Emotions:</b> {aiAnalysis.dominantEmotions.join(', ')}</p>}
              {aiAnalysis.colorHarmony && <p><b>Harmony:</b> {aiAnalysis.colorHarmony}</p>}
              {aiAnalysis.suggestedPalette && <p><b>Suggested Palette:</b> {aiAnalysis.suggestedPalette.join(', ')}</p>}
              {aiAnalysis.industry && <p><b>Industry:</b> {aiAnalysis.industry}</p>}
              {aiAnalysis.emotions && <p><b>Emotions:</b> {aiAnalysis.emotions.join(', ')}</p>}
              {aiAnalysis.context && <p><b>Context:</b> {aiAnalysis.context.join(', ')}</p>}
              {aiAnalysis.suggestedColors && <p><b>Suggested Colors:</b> {aiAnalysis.suggestedColors.join(', ')}</p>}
            </div>
            {aiTrends && (
              <div className="glass-card p-6 mb-4">
                <h3 className="text-lg font-bold mb-2 text-accent">AI Trend Analysis</h3>
                <p><b>Current Trends:</b> {aiTrends.currentTrends.join(', ')}</p>
                <p><b>Predicted Trends:</b> {aiTrends.predictedTrends.join(', ')}</p>
                <p><b>Seasonal Influences:</b> {aiTrends.seasonalInfluences.join(', ')}</p>
                <p><b>Market Factors:</b> {aiTrends.marketFactors.join(', ')}</p>
              </div>
            )}
            {aiPerformance && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-2 text-green-500">Performance Optimization</h3>
                <p><b>Conversion Rate:</b> {(aiPerformance.conversionRate * 100).toFixed(1)}%</p>
                <p><b>Accessibility Score:</b> {(aiPerformance.accessibilityScore * 100).toFixed(1)}%</p>
                <p><b>Brand Alignment:</b> {(aiPerformance.brandAlignment * 100).toFixed(1)}%</p>
                <p><b>Trend Relevance:</b> {(aiPerformance.trendRelevance * 100).toFixed(1)}%</p>
              </div>
            )}
          </div>
        )}

        {/* All Palettes Display - Shows when image is uploaded */}
        {hasImage && (
          <AllPalettesDisplay 
            palettes={allPalettes} 
            onPaletteSelect={handlePaletteSelect}
          />
        )}

        {/* Middle row (Current Palette and Harmony Generator) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Palette Display */}
          <PaletteDisplay 
            colors={currentPalette}
            harmony={currentHarmony}
            onSave={handlePaletteSave}
          />

          {/* Harmony Generator */}
          <HarmonyGenerator 
            baseColor={extractedColors[0] || null} 
            onHarmonyGenerated={handleHarmonyGenerated}
          />
        </div>

        {/* Saved Palettes moved here (bottom) */}
        <SavedPalettes 
          palettes={savedPalettes}
          onPaletteLoad={handlePaletteLoad} 
          onClearPalettes={handleClearSavedPalettes}
          onDeletePalette={(id) => setSavedPalettes(prev => prev.filter(p => p.id !== id))}
        />
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/20">
        <div className="text-center text-sm text-muted-foreground">
          <p className="text-lg font-semibold mb-2">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Colour Engine</span>
            {' '} - Free Professional Color Palette Generator with AI Intelligence
          </p>
          <p className="text-sm text-muted-foreground/70">
            Create hex color palettes, generate professional color schemes, and export color palettes for design. 
            Advanced color scheme tool for designers and artists.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
