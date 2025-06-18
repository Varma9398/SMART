import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { ColorInfo } from '@/utils/colorUtils';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ColorSwatchProps {
  color: ColorInfo;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  onClick?: () => void;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  color, 
  size = 'medium', 
  showDetails = false,
  onClick 
}) => {
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-28 h-28'
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: `${type} value copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const getContrastColor = (hex: string) => {
    const rgb = color.rgb;
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="group">
      <div
        className={`${sizeClasses[size]} rounded-2xl border-2 border-border/30 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-xl relative overflow-hidden bg-gradient-to-br from-white/10 to-black/10`}
        style={{ backgroundColor: color.hex }}
        onClick={onClick}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Copy button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(color.hex, 'HEX');
            }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        {size === 'large' && (
          <div
            className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            style={{ 
              color: getContrastColor(color.hex),
              backgroundColor: `${color.hex}dd`
            }}
          >
            {color.hex}
          </div>
        )}
      </div>

      {showDetails && (
        <div className="mt-4 space-y-4 p-4 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Color Details</span>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">HEX</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => copyToClipboard(color.hex, 'HEX')}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <p className="text-sm font-mono bg-background/50 p-2 rounded-lg border border-border/30">{color.hex}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">RGB</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, 'RGB')}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <p className="text-sm font-mono bg-background/50 p-2 rounded-lg border border-border/30">
                {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">HSL</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, 'HSL')}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <p className="text-sm font-mono bg-background/50 p-2 rounded-lg border border-border/30">
                {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;
