import React, { useState } from 'react';
import { Download, Save, Trash2, Eye, EyeOff, Palette, Sparkles } from 'lucide-react';
import { ColorInfo, ColorPalette, exportPalette, savePalette } from '@/utils/colorUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import ColorSwatch from './ColorSwatch';
import ExportModal from './ExportModal';

interface PaletteDisplayProps {
  colors: ColorInfo[];
  harmony: string;
  onSave?: (palette: ColorPalette) => void;
  onDelete?: (paletteId: string) => void;
  isEditable?: boolean;
  paletteId?: string;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({
  colors,
  harmony,
  onSave,
  onDelete,
  isEditable = true,
  paletteId
}) => {
  const [exportFormat, setExportFormat] = useState('css');
  const [paletteName, setPaletteName] = useState(`${harmony} Palette`);
  const [showDetails, setShowDetails] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = async (format: string) => {
    if (colors.length === 0) {
      toast({
        title: "No colors to export",
        description: "Please generate or select colors first",
        variant: "destructive"
      });
      return;
    }

    const palette: ColorPalette = {
      id: paletteId || Date.now().toString(),
      name: paletteName || `${harmony} Palette`,
      colors,
      harmony,
      createdAt: new Date().toISOString()
    };

    try {
      const exportedData = await exportPalette(palette, format);
    
      let mimeType = 'text/plain';
      let filenameExtension = format.toLowerCase().replace(/\s/g, '-');

      if (format === 'Adobe ASE') {
        mimeType = 'application/octet-stream';
        filenameExtension = 'ase';
      } else if (format.includes('JSON')) {
        mimeType = 'application/json';
        filenameExtension = 'json';
      } else if (format.includes('CSS') || format.includes('SCSS') || format.includes('Tailwind') || format.includes('Bootstrap')) {
        mimeType = 'text/css';
        filenameExtension = format.toLowerCase().includes('scss') ? 'scss' : 'css';
        if (format.includes('Tailwind')) filenameExtension = 'js';
      } else if (format.includes('XML')) {
        mimeType = 'application/xml';
        filenameExtension = 'xml';
      } else if (format.includes('CSV') || format.includes('Excel')) {
        mimeType = 'text/csv';
        filenameExtension = 'csv';
      } else if (format.includes('JavaScript Array')) {
        mimeType = 'application/javascript';
        filenameExtension = 'js';
      } else if (format.includes('Python Dictionary')) {
        mimeType = 'text/x-python';
        filenameExtension = 'py';
      } else if (format.includes('GIMP GPL')) {
        mimeType = 'application/x-gimp-palette';
        filenameExtension = 'gpl';
      } else if (format.includes('Sketch Palette')) {
        mimeType = 'application/json';
        filenameExtension = 'sketchpalette';
      } else if (format.includes('Plain Text')) {
        mimeType = 'text/plain';
        filenameExtension = 'txt';
      } else if (format.includes('PNG Image')) {
        mimeType = 'image/png';
        filenameExtension = 'png';
      } else if (format.includes('JPEG Image')) {
        mimeType = 'image/jpeg';
        filenameExtension = 'jpeg';
      } else if (format.includes('SVG Image')) {
        mimeType = 'image/svg+xml';
        filenameExtension = 'svg';
      }
      
      const blob = new Blob([exportedData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
      a.download = `${paletteName.replace(/\s+/g, '-').toLowerCase()}.${filenameExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported!",
        description: `Palette exported as ${format.toUpperCase()}`,
    });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: `Failed to export palette as ${format}. Please try again.`, 
        variant: "destructive",
      });
    }
    setShowExportModal(false);
  };

  const handleSave = () => {
    console.log('Save button clicked'); // Debug log
    
    if (colors.length === 0) {
      console.log('No colors to save'); // Debug log
      toast({
        title: "No colors to save",
        description: "Please generate or select colors first",
        variant: "destructive"
      });
      return;
    }

    const palette: ColorPalette = {
      id: paletteId || `palette_${Date.now()}`,
      name: paletteName.trim() || `${harmony} Palette`,
      colors: [...colors], // Create a copy of the colors array
      harmony,
      createdAt: new Date().toISOString()
    };

    console.log('Saving palette:', palette); // Debug log

    try {
      savePalette(palette);
      onSave?.(palette);

      toast({
        title: "Saved!",
        description: `"${palette.name}" saved to your collection`,
      });
      
      console.log('Palette saved successfully'); // Debug log
    } catch (error) {
      console.error('Error saving palette:', error); // Debug log
      toast({
        title: "Save failed",
        description: "There was an error saving your palette",
        variant: "destructive"
      });
    }
  };

  const handleDelete = () => {
    if (paletteId) {
      onDelete?.(paletteId);
      toast({
        title: "Deleted!",
        description: "Palette removed from your collection",
      });
    }
  };

  if (colors.length === 0) {
    return (
      <Card className="premium-glass hover-lift">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-muted/20 to-secondary/20 flex items-center justify-center">
            <Palette className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2 gradient-text-secondary">No Colors to Display</h3>
          <p className="text-muted-foreground">
            Upload an image or generate a harmony to see colors here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="premium-glass hover-lift">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold gradient-text">
                {harmony.charAt(0).toUpperCase() + harmony.slice(1)} Palette
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {colors.length} color{colors.length !== 1 ? 's' : ''} • {harmony} harmony
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="hover:bg-secondary/50 rounded-xl"
          >
            {showDetails ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Color Swatches */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {colors.map((color, index) => (
            <ColorSwatch
              key={`${color.hex}-${index}`}
              color={color}
              size="large"
              showDetails={showDetails}
            />
          ))}
        </div>

        {/* Color Values as Text */}
        <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-2xl p-6 border border-border/30">
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Color Values
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono">
            {colors.map((color, index) => (
              <div key={`${color.hex}-${index}`} className="flex items-center space-x-3 p-2 rounded-lg bg-background/50">
                <div
                  className="w-6 h-6 rounded-lg border-2 border-border/30 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-semibold">{color.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {isEditable && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Palette Name</label>
              <Input
                placeholder="Enter palette name"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                className="w-full rounded-xl border-border/50 focus:border-primary/50 transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleSave} 
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                disabled={colors.length === 0}
              >
                <Save className="w-5 h-5 mr-2" />
                Save Palette
              </Button>

              <Button 
                onClick={() => setShowExportModal(true)} 
                variant="outline" 
                className="flex-1 border-border/50 hover:border-primary/50 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                disabled={colors.length === 0}
              >
                <Download className="w-5 h-5 mr-2" />
                Export
              </Button>

              {paletteId && onDelete && (
                <Button 
                  onClick={handleDelete} 
                  variant="destructive"
                  className="px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {showExportModal && (
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      )}
    </Card>
  );
};

export default PaletteDisplay;
