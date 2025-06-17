import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Target, Eye, MessageSquare, Workflow } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none">
        <div className="relative">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 animate-gradient" />
          
          {/* Glassmorphism content */}
          <div className="relative p-8 backdrop-blur-xl bg-background/30 border border-border/50">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                Welcome to AI PaletteGenius
              </h2>
              <p className="text-muted-foreground text-lg">
                AI-Powered Color Intelligence Platform
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Colors that don't just look good—they perform better
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-background/20">
                  <MessageSquare className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">AI Color Assistant</h3>
                    <p className="text-sm text-muted-foreground">
                      Natural language color queries
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg bg-background/20">
                  <Target className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Performance-Based</h3>
                    <p className="text-sm text-muted-foreground">
                      Colors optimized for conversion
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg bg-background/20">
                  <Palette className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Brand Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Logo-aware color generation
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg bg-background/20">
                  <Eye className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Accessibility-First</h3>
                    <p className="text-sm text-muted-foreground">
                      WCAG 2.1 AAA compliance built-in
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                  onClick={onClose}
                >
                  Start Creating
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup; 