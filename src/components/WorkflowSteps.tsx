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
  Brain
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
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStepClasses = (status: string, isActive: boolean) => {
    const baseClasses = "relative p-4 rounded-lg border transition-all duration-300 cursor-pointer";
    
    if (status === 'completed') {
      return `${baseClasses} bg-green-500/10 border-green-500/30 hover:bg-green-500/20`;
    } else if (status === 'active') {
      return `${baseClasses} bg-blue-500/10 border-blue-500/30 ring-2 ring-blue-500/20`;
    } else {
      return `${baseClasses} bg-background/50 border-border/30 hover:bg-background/80`;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Enhanced Workflow
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
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(step.status)}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    {step.icon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    {step.status === 'active' && (
                      <Badge variant="secondary" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {step.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowSteps; 