import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Search, 
  Sparkles, 
  Target, 
  Users, 
  Rocket,
  CheckCircle,
  Circle,
  Clock,
  Brain,
  ArrowRight
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
  features: string[];
}

interface WorkflowStepsProps {
  currentStep: string;
  onStepClick?: (stepId: string) => void;
}

const WorkflowSteps: React.FC<WorkflowStepsProps> = ({ currentStep, onStepClick }) => {
  const steps: WorkflowStep[] = [
    {
      id: 'inspire',
      title: 'Inspire',
      description: 'Upload image OR describe vision in natural language',
      icon: <Lightbulb className="w-5 h-5" />,
      status: currentStep === 'inspire' ? 'active' : currentStep === 'inspire' ? 'completed' : 'pending',
      features: ['Image Upload', 'Natural Language Input', 'Vision Description']
    },
    {
      id: 'analyze',
      title: 'Analyze',
      description: 'AI scene analysis + color psychology assessment',
      icon: <Search className="w-5 h-5" />,
      status: currentStep === 'analyze' ? 'active' : ['inspire', 'analyze'].includes(currentStep) ? 'completed' : 'pending',
      features: ['Scene Analysis', 'Color Psychology', 'Context Understanding']
    },
    {
      id: 'brand-intelligence',
      title: 'Brand Intelligence',
      description: 'Logo analysis + competitor insights + brand guidelines',
      icon: <Brain className="w-5 h-5" />,
      status: currentStep === 'brand-intelligence' ? 'active' : ['inspire', 'analyze', 'brand-intelligence'].includes(currentStep) ? 'completed' : 'pending',
      features: ['Logo Analysis', 'Competitor Analysis', 'Brand Guidelines']
    },
    {
      id: 'generate',
      title: 'Intelligently Generate',
      description: 'Context-aware palette creation',
      icon: <Sparkles className="w-5 h-5" />,
      status: currentStep === 'generate' ? 'active' : ['inspire', 'analyze', 'brand-intelligence', 'generate'].includes(currentStep) ? 'completed' : 'pending',
      features: ['AI Generation', 'Context Awareness', 'Smart Palettes']
    },
    {
      id: 'optimize',
      title: 'Optimize',
      description: 'Accessibility testing + performance optimization',
      icon: <Target className="w-5 h-5" />,
      status: currentStep === 'optimize' ? 'active' : ['inspire', 'analyze', 'brand-intelligence', 'generate', 'optimize'].includes(currentStep) ? 'completed' : 'pending',
      features: ['WCAG Compliance', 'Performance Testing', 'Conversion Optimization']
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Team feedback + approval workflows',
      icon: <Users className="w-5 h-5" />,
      status: currentStep === 'collaborate' ? 'active' : ['inspire', 'analyze', 'brand-intelligence', 'generate', 'optimize', 'collaborate'].includes(currentStep) ? 'completed' : 'pending',
      features: ['Team Feedback', 'Approval Workflows', 'Version Control']
    },
    {
      id: 'deploy',
      title: 'Deploy',
      description: 'Export to design tools + live CSS integration',
      icon: <Rocket className="w-5 h-5" />,
      status: currentStep === 'deploy' ? 'active' : ['inspire', 'analyze', 'brand-intelligence', 'generate', 'optimize', 'collaborate', 'deploy'].includes(currentStep) ? 'completed' : 'pending',
      features: ['Design Tool Export', 'Live CSS', 'Integration APIs']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'active':
        return <Clock className="w-5 h-5 text-primary" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStepClasses = (status: string, isActive: boolean) => {
    const baseClasses = "relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer group hover-lift";
    
    if (status === 'completed') {
      return `${baseClasses} bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 hover:from-green-500/20 hover:to-emerald-500/20`;
    } else if (status === 'active') {
      return `${baseClasses} bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 ring-2 ring-primary/20 shadow-lg`;
    } else {
      return `${baseClasses} bg-gradient-to-br from-background/50 to-secondary/30 border-border/30 hover:from-background/80 hover:to-secondary/50`;
    }
  };

  return (
    <Card className="premium-glass hover-lift">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          Enhanced AI Workflow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={getStepClasses(step.status, currentStep === step.id)}
              onClick={() => onStepClick?.(step.id)}
            >
              <div className="flex items-start gap-6">
                <div className="flex items-center gap-3">
                  {getStatusIcon(step.status)}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                    step.status === 'completed' 
                      ? 'bg-green-500/20 text-green-500' 
                      : step.status === 'active'
                      ? 'bg-gradient-to-br from-primary/20 to-accent/20 text-primary'
                      : 'bg-secondary/50 text-muted-foreground'
                  }`}>
                    {step.icon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-bold text-lg transition-colors duration-300 ${
                      step.status === 'active' ? 'gradient-text' : 'text-foreground'
                    }`}>
                      {step.title}
                    </h3>
                    {step.status === 'active' && (
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </Badge>
                    )}
                    {step.status === 'completed' && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1 rounded-full text-xs font-semibold">
                        Complete
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex} 
                        variant="outline" 
                        className={`text-xs px-3 py-1 rounded-lg border-border/50 ${
                          step.status === 'active' ? 'border-primary/30 text-primary' :
                          step.status === 'completed' ? 'border-green-500/30 text-green-500' :
                          'text-muted-foreground'
                        }`}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {step.status === 'active' && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent text-white">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowSteps; 