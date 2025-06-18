import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ChevronDown, ChevronRight, Sparkles, Target, Palette, Eye, MessageSquare, Workflow, CheckCircle } from 'lucide-react';
import { trackOnboarding } from '@/utils/analytics';

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

  const totalSteps = 5;

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

  // Handle designer type selection with tracking
  const handleDesignerTypeSelect = (role: string) => {
    setDesignerType(role);
    trackOnboarding.designerTypeSelected(role);
  };

  // Handle goal selection with tracking
  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);
    trackOnboarding.goalSelected(selectedGoal);
  };

  // Handle skill level selection with tracking
  const handleSkillSelect = (selectedSkill: string) => {
    setSkill(selectedSkill);
    trackOnboarding.skillLevelSelected(selectedSkill);
  };

  // Auto-expand categories when searching
  useEffect(() => {
    if (searchQuery) {
      setExpandedCategories(Object.keys(filteredCategories));
    }
  }, [searchQuery, filteredCategories]);

  // Enhanced recommendations based on answers
  const recommendations = () => {
    if (!designerType || !goal || !skill) return [];
    const recs = [];
    
    // Designer type specific recommendations
    if (designerType.includes('UI') || designerType.includes('UX') || designerType.includes('Web') || designerType.includes('Mobile')) {
      recs.push({
        icon: <Target className="w-4 h-4" />,
        title: 'Accessibility-First Design',
        description: 'Use the AI Color Assistant and Accessibility tools for optimal user experience and WCAG compliance.'
      });
    }
    if (designerType.includes('Brand') || designerType.includes('Logo') || designerType.includes('Graphic')) {
      recs.push({
        icon: <Palette className="w-4 h-4" />,
        title: 'Brand Intelligence',
        description: 'Explore Brand Intelligence and advanced palette generation for consistent brand identity.'
      });
    }
    if (designerType.includes('Game') || designerType.includes('Character') || designerType.includes('Environment')) {
      recs.push({
        icon: <Sparkles className="w-4 h-4" />,
        title: 'Thematic Color Creation',
        description: 'Use the AI Color Engine for thematic palette creation and immersive mood setting.'
      });
    }
    if (designerType.includes('Fashion') || designerType.includes('Textile')) {
      recs.push({
        icon: <Workflow className="w-4 h-4" />,
        title: 'Seasonal Color Trends',
        description: 'Leverage seasonal color trends and textile-specific palette generation for fashion design.'
      });
    }
    if (designerType.includes('Architect') || designerType.includes('Interior')) {
      recs.push({
        icon: <Eye className="w-4 h-4" />,
        title: 'Spatial Color Design',
        description: 'Access spatial design color tools and environmental palette creation for architectural projects.'
      });
    }
    
    // Goal specific recommendations
    if (goal === 'App' || goal === 'Website') {
      recs.push({
        icon: <MessageSquare className="w-4 h-4" />,
        title: 'Performance Optimization',
        description: 'Focus on accessibility-first color selection and responsive design palettes for digital products.'
      });
    }
    if (goal === 'Brand Identity') {
      recs.push({
        icon: <Palette className="w-4 h-4" />,
        title: 'Competitor Analysis',
        description: 'Utilize brand personality analysis and competitor color research for market differentiation.'
      });
    }
    if (goal === 'Presentation') {
      recs.push({
        icon: <Target className="w-4 h-4" />,
        title: 'Professional Harmony',
        description: 'Generate presentation-ready palettes with professional color harmony and visual impact.'
      });
    }
    
    // Skill level specific recommendations
    if (skill === 'Beginner') {
      recs.push({
        icon: <Workflow className="w-4 h-4" />,
        title: 'Guided Learning',
        description: 'Start with guided workflows and step-by-step color tutorials to build your foundation.'
      });
    }
    if (skill === 'Advanced') {
      recs.push({
        icon: <Sparkles className="w-4 h-4" />,
        title: 'Advanced Features',
        description: 'Unlock advanced palette editing, custom algorithms, and professional export options.'
      });
    }
    
    return recs;
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  const handleFinish = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    trackOnboarding.completed({
      designerType: designerType || '',
      goal: goal || '',
      skillLevel: skill || ''
    });
    onComplete();
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 0: return "What type of designer are you?";
      case 1: return "What are you designing today?";
      case 2: return "How experienced are you with color design?";
      case 3: return "Personalized Recommendations";
      case 4: return "Progress Tracking";
      default: return "";
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl mx-auto max-h-[80vh] overflow-y-auto bg-gray-900/95 backdrop-blur-xl border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Welcome to AI Palette Genius
          </DialogTitle>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{Math.round(((step + 1) / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">{getStepTitle(step)}</h3>
          
          {step === 0 && (
            <div>
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
                            onClick={() => handleDesignerTypeSelect(role)}
                            className={`w-full justify-start text-sm ${
                              designerType === role 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                            }`}
                          >
                            {designerType === role && <CheckCircle className="w-4 h-4 mr-2" />}
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
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 gap-3">
                {GOALS.map((g) => (
                  <Button 
                    key={g} 
                    variant={goal === g ? 'default' : 'outline'} 
                    onClick={() => handleGoalSelect(g)}
                    className={`h-12 text-left justify-start ${
                      goal === g 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {goal === g && <CheckCircle className="w-4 h-4 mr-2" />}
                    {g}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="grid grid-cols-1 gap-3">
                {SKILL_LEVELS.map((s) => (
                  <Button 
                    key={s} 
                    variant={skill === s ? 'default' : 'outline'} 
                    onClick={() => handleSkillSelect(s)}
                    className={`h-12 text-left justify-start ${
                      skill === s 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {skill === s && <CheckCircle className="w-4 h-4 mr-2" />}
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm text-gray-400 mb-4">Based on your profile, here are personalized recommendations:</p>
              <div className="space-y-3">
                {recommendations().map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div className="text-blue-400 mt-1">
                      {rec.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200 mb-1">{rec.title}</h4>
                      <p className="text-sm text-gray-400">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-sm text-gray-400 mb-4">Help us improve your experience by tracking your progress:</p>
              <div className="space-y-3">
                <Button 
                  variant={trackProgress === true ? 'default' : 'outline'} 
                  onClick={() => setTrackProgress(true)}
                  className={`w-full h-12 justify-start ${
                    trackProgress === true 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {trackProgress === true && <CheckCircle className="w-4 h-4 mr-2" />}
                  Yes, track my progress and improvement
                </Button>
                <Button 
                  variant={trackProgress === false ? 'default' : 'outline'} 
                  onClick={() => setTrackProgress(false)}
                  className={`w-full h-12 justify-start ${
                    trackProgress === false 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {trackProgress === false && <CheckCircle className="w-4 h-4 mr-2" />}
                  No, I prefer not to track progress
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={step === 0}
              className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              Back
            </Button>
            
            {step < totalSteps - 1 ? (
              <Button 
                disabled={
                  (step === 0 && !designerType) ||
                  (step === 1 && !goal) ||
                  (step === 2 && !skill)
                } 
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </Button>
            ) : (
              <Button 
                disabled={trackProgress === null} 
                onClick={handleFinish}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 