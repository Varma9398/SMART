import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Palette, Sparkles, Volume2, Sun, Moon, ArrowRight } from 'lucide-react';
import { ColorInfo } from '@/utils/colorUtils';
import ColorSwatch from './ColorSwatch';

interface AllPalettesDisplayProps {
  palettes: {
    dominant: ColorInfo[];
    vibrant: ColorInfo[];
    muted: ColorInfo[];
    light: ColorInfo[];
    dark: ColorInfo[];
  };
  onPaletteSelect: (colors: ColorInfo[], type: string) => void;
}

const AllPalettesDisplay: React.FC<AllPalettesDisplayProps> = ({ palettes, onPaletteSelect }) => {
  const [selectedTab, setSelectedTab] = useState('dominant');

  const paletteTypes = [
    { key: 'dominant', label: 'Dominant', icon: Palette, description: 'Most frequent colors', color: 'text-blue-500' },
    { key: 'vibrant', label: 'Vibrant', icon: Sparkles, description: 'High saturation colors', color: 'text-purple-500' },
    { key: 'muted', label: 'Muted', icon: Volume2, description: 'Low saturation colors', color: 'text-gray-500' },
    { key: 'light', label: 'Light', icon: Sun, description: 'Bright tones', color: 'text-yellow-500' },
    { key: 'dark', label: 'Dark', icon: Moon, description: 'Deep tones', color: 'text-indigo-500' }
  ];

  return (
    <Card className="premium-glass hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Eye className="w-6 h-6 text-primary" />
          </div>
          All Color Palettes
        </CardTitle>
        <p className="text-muted-foreground">
          Explore all color palettes extracted from your image
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 bg-secondary/50 p-1 rounded-2xl">
            {paletteTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TabsTrigger 
                  key={type.key} 
                  value={type.key}
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-${type.color.split('-')[1]}-500/20 to-${type.color.split('-')[1]}-600/20 flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${type.color}`} />
                  </div>
                  <span className="text-xs font-semibold">{type.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {paletteTypes.map((type) => (
            <TabsContent key={type.key} value={type.key} className="space-y-6 mt-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/30">
                <div>
                  <h3 className="text-lg font-bold gradient-text">{type.label} Colors</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
                <Button
                  onClick={() => onPaletteSelect(palettes[type.key as keyof typeof palettes], type.key)}
                  variant="outline"
                  className="border-border/50 hover:border-primary/50 px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Use Palette
                </Button>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {palettes[type.key as keyof typeof palettes].map((color, index) => (
                  <ColorSwatch
                    key={`${type.key}-${index}`}
                    color={color}
                    size="medium"
                    showDetails={false}
                  />
                ))}
              </div>

              {palettes[type.key as keyof typeof palettes].length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-muted/20 to-secondary/20 flex items-center justify-center">
                    <Palette className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 gradient-text-secondary">No {type.label} Colors</h3>
                  <p className="text-muted-foreground">
                    No {type.label.toLowerCase()} colors found in this image
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AllPalettesDisplay;
