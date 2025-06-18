import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Heart, Brain, Zap, MessageSquare, Target, Palette, Eye, Workflow } from 'lucide-react';

interface BrandStoryProps {
  onStartCreating?: () => void;
}

const BrandStory: React.FC<BrandStoryProps> = ({ onStartCreating }) => {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Professional Color Palette Generator with AI Intelligence
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Free color palette generator for designers. Create hex color palettes, generate professional color schemes, and export color palettes for design with AI-powered color intelligence.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Core Story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Born from Frustration */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-3">
              <Zap className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-semibold text-lg">Born from Frustration</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tired of boring color tools that don't understand what designers actually need. We built this because we were frustrated too.
            </p>
          </div>

          {/* Designed by Designers */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-3">
              <Heart className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg">By Designers, For Designers</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every feature, every interaction, every detail crafted by designers who live and breathe color psychology daily.
            </p>
          </div>

          {/* AI Understanding */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 mb-3">
              <Brain className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-lg">AI That Understands</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Powered by AI that actually understands design psychology, not just color theory. It thinks like a designer.
            </p>
          </div>
        </div>

        {/* Unique Value Propositions */}
        <div className="border-t border-border/20 pt-6">
          <h3 className="text-lg font-semibold text-center mb-6">Advanced Color Scheme Tool Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* AI Color Assistant */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                <MessageSquare className="w-5 h-5 text-green-500" />
              </div>
              <h4 className="font-medium text-sm">Smart Color Palette Generator</h4>
              <p className="text-xs text-muted-foreground">AI-powered color suggestions</p>
            </div>

            {/* Performance-Based Palettes */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/10">
                <Target className="w-5 h-5 text-orange-500" />
              </div>
              <h4 className="font-medium text-sm">Professional Color Palettes</h4>
              <p className="text-xs text-muted-foreground">Hex color palette creation</p>
            </div>

            {/* Brand Intelligence */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                <Palette className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="font-medium text-sm">Professional Color Scheme Creator</h4>
              <p className="text-xs text-muted-foreground">Brand-aware color generation</p>
            </div>

            {/* Accessibility-First */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/10">
                <Eye className="w-5 h-5 text-purple-500" />
              </div>
              <h4 className="font-medium text-sm">Color Theory Generator for Artists</h4>
              <p className="text-xs text-muted-foreground">Educational color insights</p>
            </div>

            {/* Designer Workflow */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10">
                <Workflow className="w-5 h-5 text-indigo-500" />
              </div>
              <h4 className="font-medium text-sm">Export Color Palettes for Design</h4>
              <p className="text-xs text-muted-foreground">Multiple format support</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-4 border-t border-border/20">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Ready to experience AI-powered color intelligence?
          </p>
          <button 
            onClick={onStartCreating}
            className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start creating with AI Colour Engine</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandStory; 