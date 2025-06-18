import { track } from '@vercel/analytics';

// Custom analytics tracking for user interactions
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  track(event, properties);
};

// Predefined tracking events
export const AnalyticsEvents = {
  // Onboarding events
  ONBOARDING_STARTED: 'onboarding_started',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  DESIGNER_TYPE_SELECTED: 'designer_type_selected',
  GOAL_SELECTED: 'goal_selected',
  SKILL_LEVEL_SELECTED: 'skill_level_selected',
  
  // Feature usage
  IMAGE_UPLOADED: 'image_uploaded',
  PALETTE_GENERATED: 'palette_generated',
  PALETTE_SAVED: 'palette_saved',
  PALETTE_EXPORTED: 'palette_exported',
  COLOR_SELECTED: 'color_selected',
  
  // AI features
  AI_COLOR_ASSISTANT_USED: 'ai_color_assistant_used',
  BRAND_INTELLIGENCE_USED: 'brand_intelligence_used',
  HARMONY_GENERATOR_USED: 'harmony_generator_used',
  
  // User engagement
  WELCOME_POPUP_CLOSED: 'welcome_popup_closed',
  FEATURE_EXPLORED: 'feature_explored',
  TUTORIAL_VIEWED: 'tutorial_viewed',
  
  // Export events
  EXPORT_FORMAT_SELECTED: 'export_format_selected',
  EXPORT_METHOD_USED: 'export_method_used',
  
  // Error tracking
  ERROR_OCCURRED: 'error_occurred',
  BUILD_FAILED: 'build_failed',
} as const;

// Helper functions for common tracking scenarios
export const trackOnboarding = {
  started: () => trackEvent(AnalyticsEvents.ONBOARDING_STARTED),
  completed: (data: { designerType: string; goal: string; skillLevel: string }) => 
    trackEvent(AnalyticsEvents.ONBOARDING_COMPLETED, data),
  designerTypeSelected: (type: string) => 
    trackEvent(AnalyticsEvents.DESIGNER_TYPE_SELECTED, { type }),
  goalSelected: (goal: string) => 
    trackEvent(AnalyticsEvents.GOAL_SELECTED, { goal }),
  skillLevelSelected: (level: string) => 
    trackEvent(AnalyticsEvents.SKILL_LEVEL_SELECTED, { level }),
};

export const trackFeatures = {
  imageUploaded: (fileSize: number, fileType: string) => 
    trackEvent(AnalyticsEvents.IMAGE_UPLOADED, { fileSize, fileType }),
  paletteGenerated: (method: string, colorCount: number) => 
    trackEvent(AnalyticsEvents.PALETTE_GENERATED, { method, colorCount }),
  paletteSaved: (paletteName: string, colorCount: number) => 
    trackEvent(AnalyticsEvents.PALETTE_SAVED, { paletteName, colorCount }),
  paletteExported: (format: string, method: string) => 
    trackEvent(AnalyticsEvents.PALETTE_EXPORTED, { format, method }),
  colorSelected: (color: string, context: string) => 
    trackEvent(AnalyticsEvents.COLOR_SELECTED, { color, context }),
};

export const trackAI = {
  colorAssistantUsed: (query: string) => 
    trackEvent(AnalyticsEvents.AI_COLOR_ASSISTANT_USED, { query }),
  brandIntelligenceUsed: (brandName?: string) => 
    trackEvent(AnalyticsEvents.BRAND_INTELLIGENCE_USED, { brandName }),
  harmonyGeneratorUsed: (harmonyType: string) => 
    trackEvent(AnalyticsEvents.HARMONY_GENERATOR_USED, { harmonyType }),
};

export const trackEngagement = {
  welcomePopupClosed: () => trackEvent(AnalyticsEvents.WELCOME_POPUP_CLOSED),
  featureExplored: (featureName: string) => 
    trackEvent(AnalyticsEvents.FEATURE_EXPLORED, { featureName }),
  tutorialViewed: (tutorialName: string) => 
    trackEvent(AnalyticsEvents.TUTORIAL_VIEWED, { tutorialName }),
};

export const trackErrors = {
  occurred: (error: string, context: string) => 
    trackEvent(AnalyticsEvents.ERROR_OCCURRED, { error, context }),
  buildFailed: (reason: string) => 
    trackEvent(AnalyticsEvents.BUILD_FAILED, { reason }),
}; 