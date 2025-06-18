import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Target, Eye, MessageSquare, Workflow, Zap, Star, ArrowRight } from 'lucide-react';
import { trackEngagement } from '@/utils/analytics';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    // Mark as seen in localStorage
    localStorage.setItem('ai_colour_engine_welcome_shown', 'true');
    trackEngagement.welcomePopupClosed();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none">
        <div className="relative">
          {/* Enhanced animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tl from-green-600/10 via-yellow-600/10 to-orange-600/10 animate-pulse delay-1000" />
          
          {/* Glassmorphism content */}
          <div className="relative p-6 backdrop-blur-xl bg-background/40 border border-border/50">
            <div className="text-center mb-6">
              {/* Enhanced logo with animation */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4 animate-bounce">
                <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
                Welcome to AI Colour Engine
              </h2>
              
              <p className="text-muted-foreground text-lg font-medium mb-2">
                AI-Powered Color Intelligence Platform
              </p>
              
              <p className="text-sm text-muted-foreground/70 mb-3">
                Colors that don't just look good—they perform better
              </p>

              {/* New feature badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
                <Star className="w-3 h-3" />
                New: Enhanced AI Color Engine
              </div>
            </div>

            <div className="space-y-4">
              {/* Enhanced feature grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-blue-100 text-sm">AI Color Assistant</h3>
                    <p className="text-xs text-blue-300/80">
                      Natural language color queries
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                    <Target className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-orange-100 text-sm">Performance-Based</h3>
                    <p className="text-xs text-orange-300/80">
                      Colors optimized for conversion
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Palette className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-purple-100 text-sm">Brand Intelligence</h3>
                    <p className="text-xs text-purple-300/80">
                      Logo-aware color generation
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                    <Eye className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-green-100 text-sm">Accessibility-First</h3>
                    <p className="text-xs text-green-300/80">
                      WCAG 2.1 AAA compliance
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 group">
                  <div className="p-2 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                    <Workflow className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-indigo-100 text-sm">Designer Workflow</h3>
                    <p className="text-xs text-indigo-300/80">
                      Integrates with real processes
                    </p>
                  </div>
                </div>
              </div>

              {/* New features section */}
              <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2 text-sm">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  What's New
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    Enhanced AI Engine
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    Brand Intelligence
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Advanced Export
                  </div>
                </div>
              </div>

              {/* Enhanced CTA */}
              <div className="text-center space-y-3">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 text-base font-semibold group transition-all duration-300 transform hover:scale-105"
                  onClick={handleClose}
                >
                  Start Creating
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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