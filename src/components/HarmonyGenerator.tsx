import React, { useState } from 'react';
import { Palette, Shuffle, Sparkles, Wand2 } from 'lucide-react';
import { ColorInfo, generateColorHarmony } from '@/utils/colorUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ColorSwatch from './ColorSwatch';

interface HarmonyGeneratorProps {
  baseColor: ColorInfo | null;
  onHarmonyGenerated: (colors: ColorInfo[], harmony: string) => void;
}

const HarmonyGenerator: React.FC<HarmonyGeneratorProps> = ({ 
  baseColor, 
  onHarmonyGenerated 
}) => {
  const [selectedHarmony, setSelectedHarmony] = useState('complementary');

  const harmonyTypes = [
    { value: 'complementary', label: 'Complementary', description: '2 colors opposite on color wheel' },
    { value: 'triadic', label: 'Triadic', description: '3 colors evenly spaced' },
    { value: 'analogous', label: 'Analogous', description: '5 colors next to each other' },
    { value: 'monochromatic', label: 'Monochromatic', description: '5 shades of same hue' },
    { value: 'tetradic', label: 'Tetradic', description: '4 colors forming rectangle' }
  ];

  const generateHarmony = () => {
    if (!baseColor) return;

    const harmonizedColors = generateColorHarmony(baseColor, selectedHarmony);
    onHarmonyGenerated(harmonizedColors, selectedHarmony);
  };

  const generateRandomHarmony = () => {
    const randomHarmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];
    setSelectedHarmony(randomHarmony.value);
    
    if (baseColor) {
      const harmonizedColors = generateColorHarmony(baseColor, randomHarmony.value);
      onHarmonyGenerated(harmonizedColors, randomHarmony.value);
    }
  };

  return (
    <Card className="premium-glass hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-accent" />
          </div>
          Color Harmony Generator
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {baseColor && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Base Color</h4>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/30">
              <ColorSwatch color={baseColor} size="medium" />
              <div className="space-y-1">
                <p className="font-mono text-sm font-semibold">{baseColor.hex}</p>
                <p className="text-xs text-muted-foreground">
                  HSL({baseColor.hsl.h}°, {baseColor.hsl.s}%, {baseColor.hsl.l}%)
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              Harmony Type
            </label>
            <Select value={selectedHarmony} onValueChange={setSelectedHarmony}>
              <SelectTrigger className="rounded-xl border-border/50 focus:border-primary/50 transition-colors duration-200">
                <SelectValue placeholder="Select harmony type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {harmonyTypes.map((harmony) => (
                  <SelectItem key={harmony.value} value={harmony.value} className="rounded-lg">
                    <div className="py-1">
                      <div className="font-semibold">{harmony.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {harmony.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={generateHarmony}
              disabled={!baseColor}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Harmony
            </Button>

            <Button
              onClick={generateRandomHarmony}
              disabled={!baseColor}
              variant="outline"
              className="border-border/50 hover:border-primary/50 py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Shuffle className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {!baseColor && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-muted/20 to-secondary/20 flex items-center justify-center">
              <Palette className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2 gradient-text-secondary">No Base Color</h3>
            <p className="text-muted-foreground">
              Upload an image or select a color to generate harmonies
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HarmonyGenerator;
