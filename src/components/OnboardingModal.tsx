import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

const DESIGNER_CATEGORIES = {
  'Digital & Interface Design': [
    'UI Designer (User Interface)',
    'UX Designer (User Experience)',
    'Web Designer',
    'Mobile App Designer',
    'Interaction Designer',
    'Information Architect',
    'Service Designer',
    'Digital Product Designer'
  ],
  'Game Design': [
    'Game Designer',
    'Level Designer',
    'Character Designer',
    'Environment Artist',
    'Game UI/UX Designer',
    'Narrative Designer',
    'Systems Designer'
  ],
  'Product Design': [
    'Industrial Designer',
    'Product Designer',
    'Furniture Designer',
    'Automotive Designer',
    'Toy Designer',
    'Packaging Designer',
    'Medical Device Designer'
  ],
  'Visual Arts & Graphics': [
    'Graphic Designer',
    'Visual Artist',
    'Illustrator',
    'Logo Designer',
    'Brand Designer',
    'Print Designer',
    'Motion Graphics Designer',
    'Typography Designer'
  ],
  'Fashion & Textiles': [
    'Fashion Designer',
    'Textile Designer',
    'Costume Designer',
    'Footwear Designer',
    'Accessory Designer',
    'Pattern Designer'
  ],
  'Architecture & Spatial': [
    'Architect',
    'Interior Designer',
    'Landscape Architect',
    'Urban Planner',
    'Exhibition Designer',
    'Set Designer',
    'Lighting Designer'
  ],
  'Specialized Fields': [
    'Brand Strategist',
    'Developer',
    'Hobbyist',
    'Sound Designer',
    'Video Editor',
    'Animator (2D/3D)',
    'VFX Artist',
    'Creative Director',
    'Art Director',
    'Design Researcher',
    'Design Strategist',
    'Design Systems Designer'
  ]
};

const GOALS = [
  'Website',
  'App',
  'Brand Identity',
  'Presentation',
  'Other',
];
const SKILL_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

const ONBOARDING_KEY = 'ai_palettegenius_onboarding_complete';

export default function OnboardingModal({ open, onComplete }: { open: boolean; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [designerType, setDesignerType] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [skill, setSkill] = useState<string | null>(null);
  const [trackProgress, setTrackProgress] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Filter roles based on search query
  const filteredCategories = Object.entries(DESIGNER_CATEGORIES).reduce((acc, [category, roles]) => {
    const filteredRoles = roles.filter(role => 
      role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredRoles.length > 0) {
      acc[category] = filteredRoles;
    }
    return acc;
  }, {} as Record<string, string[]>);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Auto-expand categories when searching
  useEffect(() => {
    if (searchQuery) {
      setExpandedCategories(Object.keys(filteredCategories));
    }
  }, [searchQuery, filteredCategories]);

  // Recommendations based on answers
  const recommendations = () => {
    if (!designerType || !goal || !skill) return [];
    const recs = [];
    
    // Designer type specific recommendations
    if (designerType.includes('UI') || designerType.includes('UX') || designerType.includes('Web') || designerType.includes('Mobile')) {
      recs.push('Try the AI Color Assistant and Accessibility tools for optimal user experience.');
    }
    if (designerType.includes('Brand') || designerType.includes('Logo') || designerType.includes('Graphic')) {
      recs.push('Explore Brand Intelligence and advanced palette generation for brand consistency.');
    }
    if (designerType.includes('Game') || designerType.includes('Character') || designerType.includes('Environment')) {
      recs.push('Use the AI Color Engine for thematic palette creation and mood setting.');
    }
    if (designerType.includes('Fashion') || designerType.includes('Textile')) {
      recs.push('Leverage seasonal color trends and textile-specific palette generation.');
    }
    if (designerType.includes('Architect') || designerType.includes('Interior')) {
      recs.push('Access spatial design color tools and environmental palette creation.');
    }
    
    // Goal specific recommendations
    if (goal === 'App' || goal === 'Website') {
      recs.push('Focus on accessibility-first color selection and responsive design palettes.');
    }
    if (goal === 'Brand Identity') {
      recs.push('Utilize brand personality analysis and competitor color research.');
    }
    if (goal === 'Presentation') {
      recs.push('Generate presentation-ready palettes with professional color harmony.');
    }
    
    // Skill level specific recommendations
    if (skill === 'Beginner') {
      recs.push('Start with guided workflows and step-by-step color tutorials.');
    }
    if (skill === 'Advanced') {
      recs.push('Unlock advanced palette editing, custom algorithms, and export options.');
    }
    
    return recs;
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  const handleFinish = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    onComplete();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl mx-auto max-h-[80vh] overflow-y-auto bg-gray-900/95 backdrop-blur-xl border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">Welcome to AI Palette Genius</DialogTitle>
        </DialogHeader>
        {step === 0 && (
          <div>
            <p className="mb-4 font-medium text-gray-200">What type of designer are you?</p>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for your role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Designer Categories */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.entries(filteredCategories).map(([category, roles]) => (
                <div key={category} className="border border-gray-700 rounded-lg bg-gray-800/30">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors text-gray-200"
                  >
                    <span className="font-medium">{category}</span>
                    {expandedCategories.includes(category) ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedCategories.includes(category) && (
                    <div className="px-3 pb-3 space-y-1">
                      {roles.map((role) => (
                        <Button
                          key={role}
                          variant={designerType === role ? 'default' : 'ghost'}
                          onClick={() => setDesignerType(role)}
                          className={`w-full justify-start text-sm ${
                            designerType === role 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                          }`}
                        >
                          {role}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {designerType && (
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                <p className="text-sm text-blue-300">
                  Selected: <span className="font-medium text-blue-200">{designerType}</span>
                </p>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button 
                disabled={!designerType} 
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <p className="mb-4 font-medium text-gray-200">What are you designing today?</p>
            <div className="flex flex-col gap-2">
              {GOALS.map((g) => (
                <Button 
                  key={g} 
                  variant={goal === g ? 'default' : 'outline'} 
                  onClick={() => setGoal(g)}
                  className={`${
                    goal === g 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {g}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white hover:bg-gray-700/50">Back</Button>
              <Button disabled={!goal} onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <p className="mb-4 font-medium text-gray-200">How experienced are you with color design?</p>
            <div className="flex flex-col gap-2">
              {SKILL_LEVELS.map((s) => (
                <Button 
                  key={s} 
                  variant={skill === s ? 'default' : 'outline'} 
                  onClick={() => setSkill(s)}
                  className={`${
                    skill === s 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {s}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white hover:bg-gray-700/50">Back</Button>
              <Button disabled={!skill} onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <p className="mb-4 font-medium text-gray-200">AI Recommendations for you:</p>
            <ul className="mb-4 space-y-2">
              {recommendations().map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white hover:bg-gray-700/50">Back</Button>
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <p className="mb-4 font-medium text-gray-200">Would you like to track your progress and improvement over time?</p>
            <div className="flex flex-col gap-2">
              <Button 
                variant={trackProgress === true ? 'default' : 'outline'} 
                onClick={() => setTrackProgress(true)}
                className={`${
                  trackProgress === true 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Yes
              </Button>
              <Button 
                variant={trackProgress === false ? 'default' : 'outline'} 
                onClick={() => setTrackProgress(false)}
                className={`${
                  trackProgress === false 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                No
              </Button>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white hover:bg-gray-700/50">Back</Button>
              <Button disabled={trackProgress === null} onClick={handleFinish} className="bg-blue-600 hover:bg-blue-700 text-white">Finish</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 