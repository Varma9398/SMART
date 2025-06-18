import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, MessageSquare, Lightbulb, Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageData: ImageData, fileName: string, base64Data: string) => void;
  onImageChange: (file: File | null) => void;
  onVisionDescription?: (description: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  onImageChange,
  onVisionDescription 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [visionDescription, setVisionDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            onImageUpload(imageData, file.name, e.target?.result as string);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleVisionSubmit = () => {
    if (visionDescription.trim() && onVisionDescription) {
      setIsProcessing(true);
      // Simulate AI processing
      setTimeout(() => {
        onVisionDescription(visionDescription);
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <Card className="premium-glass hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          Inspire & Create
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-1 rounded-xl">
            <TabsTrigger 
              value="upload" 
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              <ImageIcon className="w-4 h-4" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger 
              value="vision" 
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              <Wand2 className="w-4 h-4" />
              Describe Vision
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 group ${
                dragActive 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Upload Your Image</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Drag and drop your image here, or click to browse
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-3 rounded-xl text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supports JPG, PNG, GIF, WebP up to 10MB
              </p>
            </div>
          </TabsContent>

          <TabsContent value="vision" className="mt-6">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <Wand2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 gradient-text">Describe Your Vision</h3>
                <p className="text-muted-foreground text-lg">
                  Use natural language to describe the color palette you want to create
                </p>
              </div>
              
              <Textarea
                placeholder="e.g., 'Create a warm, professional color palette for a tech startup website that conveys trust and innovation. I want colors that work well for both light and dark modes.'"
                value={visionDescription}
                onChange={(e) => setVisionDescription(e.target.value)}
                className="min-h-[140px] resize-none text-base p-4 rounded-xl border-border/50 focus:border-primary/50 transition-colors duration-200"
              />
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Example prompts:</p>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                    <p className="text-sm text-muted-foreground">
                      "Earthy, organic palette for a sustainable fashion brand"
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                    <p className="text-sm text-muted-foreground">
                      "Bold, energetic colors for a fitness app that motivates users"
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                    <p className="text-sm text-muted-foreground">
                      "Sophisticated, minimalist palette for a luxury real estate website"
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleVisionSubmit}
                disabled={!visionDescription.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-4 rounded-xl text-base transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Processing Vision...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate from Vision
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
