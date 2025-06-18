import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Brain, Zap, MessageSquare, Target, Palette, Eye, Workflow, ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  onStartCreating?: () => void;
}

const BrandStory: React.FC<BrandStoryProps> = ({ onStartCreating }) => {
  return (
    <Card className="premium-glass overflow-hidden hover-lift">
      <CardHeader className="text-center pb-6">
        {/* Logo and Main Title Row */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold gradient-text text-left">
            Professional Color Palette Generator with AI Intelligence
          </CardTitle>
        </div>

        {/* AI Accuracy Badge with animated progress bar */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-lg font-bold overflow-hidden min-w-[1000px]" style={{ minWidth: '1000px' }}>
            {/* Animated Progress Bar */}
            <div className="absolute left-0 top-0 h-full w-full z-0">
              <div className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 animate-progressBar" style={{ width: '100%', animation: 'progressBarAnim 2.5s linear infinite' }}></div>
            </div>
            <span className="relative z-10 flex items-center gap-2 text-white font-extrabold glow-text">
              <Sparkles className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              99.99% AI Accuracy
            </span>
          </div>
        </div>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Free color palette generator for designers. Create hex color palettes, generate professional color schemes, 
          and export color palettes for design with AI-powered color intelligence that understands your brand.
        </p>
      </CardHeader>
      <CardContent className="space-y-12">
        {/* Core Story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Born from Frustration */}
          <div className="text-center space-y-4 group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-bold text-xl gradient-text">Born from Frustration</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tired of boring color tools that don't understand what designers actually need. 
              We built this because we were frustrated too.
            </p>
          </div>

          {/* Designed by Designers */}
          <div className="text-center space-y-4 group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-bold text-xl gradient-text">By Designers, For Designers</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every feature, every interaction, every detail crafted by designers who live 
              and breathe color psychology daily.
            </p>
          </div>

          {/* AI Understanding */}
          <div className="text-center space-y-4 group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="font-bold text-xl gradient-text">AI That Understands</h3>
            <p className="text-muted-foreground leading-relaxed">
              Powered by AI that actually understands design psychology, not just color theory. 
              It thinks like a designer.
            </p>
          </div>
        </div>

        {/* Unique Value Propositions */}
        <div className="border-t border-border/20 pt-8">
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">
            Advanced Color Scheme Tool Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* AI Color Assistant */}
            <div className="text-center space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold text-base">AI Color Assistant</h4>
              <p className="text-sm text-muted-foreground">Natural language color queries</p>
            </div>

            {/* Performance-Based Palettes */}
            <div className="text-center space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className="font-semibold text-base">Performance-Based</h4>
              <p className="text-sm text-muted-foreground">Colors optimized for conversion</p>
            </div>

            {/* Brand Intelligence */}
            <div className="text-center space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold text-base">Brand Intelligence</h4>
              <p className="text-sm text-muted-foreground">Logo-aware color generation</p>
            </div>

            {/* Accessibility-First */}
            <div className="text-center space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-semibold text-base">Accessibility-First</h4>
              <p className="text-sm text-muted-foreground">WCAG 2.1 AAA compliance</p>
            </div>

            {/* Designer Workflow */}
            <div className="text-center space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Workflow className="w-6 h-6 text-indigo-500" />
              </div>
              <h4 className="font-semibold text-base">Designer Workflow</h4>
              <p className="text-sm text-muted-foreground">Integrates with real processes</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8 border-t border-border/20">
          <p className="text-lg font-medium text-muted-foreground mb-6">
            Ready to experience AI-powered color intelligence?
          </p>
          <Button 
            onClick={onStartCreating}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start creating with AI Colour Engine</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandStory; 