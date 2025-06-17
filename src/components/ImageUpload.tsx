import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, MessageSquare, Lightbulb, Sparkles } from 'lucide-react';

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
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Inspire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger value="vision" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Describe Vision
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your image here, or click to browse
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-primary to-accent"
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </TabsContent>

          <TabsContent value="vision" className="mt-4">
            <div className="space-y-4">
              <div className="text-center mb-4">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Describe Your Vision</h3>
                <p className="text-muted-foreground">
                  Use natural language to describe the color palette you want to create
                </p>
              </div>
              
              <Textarea
                placeholder="e.g., 'Create a warm, professional color palette for a tech startup website that conveys trust and innovation. I want colors that work well for both light and dark modes.'"
                value={visionDescription}
                onChange={(e) => setVisionDescription(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Example prompts:</p>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    • "Earthy, organic palette for a sustainable fashion brand"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • "Bold, energetic colors for a fitness app that motivates users"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • "Sophisticated, minimalist palette for a luxury real estate website"
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleVisionSubmit}
                disabled={!visionDescription.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Processing Vision...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
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
