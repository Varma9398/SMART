import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Target, Eye, MessageSquare, Workflow, Zap, Star, ArrowRight } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none">
        <div className="relative">
          {/* Enhanced animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tl from-green-600/10 via-yellow-600/10 to-orange-600/10 animate-pulse delay-1000" />
          
          {/* Glassmorphism content */}
          <div className="relative p-8 backdrop-blur-xl bg-background/40 border border-border/50">
            <div className="text-center mb-8">
              {/* Enhanced logo with animation */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6 animate-bounce">
                <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-pulse">
                Welcome to AI PaletteGenius
              </h2>
              
              <p className="text-muted-foreground text-xl font-medium mb-2">
                AI-Powered Color Intelligence Platform
              </p>
              
              <p className="text-sm text-muted-foreground/70 mb-4">
                Colors that don't just look good—they perform better
              </p>

              {/* New feature badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
                <Star className="w-3 h-3" />
                New: Enhanced AI Color Engine
              </div>
            </div>

            <div className="space-y-6">
              {/* Enhanced feature grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-blue-100">AI Color Assistant</h3>
                    <p className="text-sm text-blue-300/80">
                      Natural language color queries with intelligent suggestions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                    <Target className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-orange-100">Performance-Based</h3>
                    <p className="text-sm text-orange-300/80">
                      Colors optimized for conversion and user engagement
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Palette className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-purple-100">Brand Intelligence</h3>
                    <p className="text-sm text-purple-300/80">
                      Logo-aware color generation and brand consistency
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                    <Eye className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-green-100">Accessibility-First</h3>
                    <p className="text-sm text-green-300/80">
                      WCAG 2.1 AAA compliance built-in for inclusive design
                    </p>
                  </div>
                </div>
              </div>

              {/* New features section */}
              <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                <h4 className="font-semibold text-gray-200 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  What's New
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Enhanced AI Engine
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Brand Intelligence
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Advanced Export
                  </div>
                </div>
              </div>

              {/* Enhanced CTA */}
              <div className="text-center space-y-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold group transition-all duration-300 transform hover:scale-105"
                  onClick={onClose}
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-xs text-muted-foreground/60">
                  Join thousands of designers creating better color experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup; 