'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface WizardFormProps {
  steps: Step[];
  children: ReactNode[];
  onComplete: () => void;
  onStepChange?: (stepIndex: number) => void;
  className?: string;
}

export function WizardForm({
  steps,
  children,
  onComplete,
  onStepChange,
  className,
}: WizardFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const newCompletedSteps = [...completedSteps];
      if (!newCompletedSteps.includes(currentStep)) {
        newCompletedSteps.push(currentStep);
        setCompletedSteps(newCompletedSteps);
      }
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex - 1)) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Progress Stepper */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <button
              type="button"
              onClick={() => goToStep(index)}
              disabled={index > currentStep && !completedSteps.includes(index - 1)}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                index < currentStep || completedSteps.includes(index)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : index === currentStep
                    ? 'bg-white dark:bg-gray-800 border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
              )}
              aria-label={`Step ${index + 1}: ${step.title}`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              {index < currentStep || completedSteps.includes(index) ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="font-semibold">{index + 1}</span>
              )}
            </button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2 transition-colors',
                  index < currentStep || completedSteps.includes(index)
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={`label-${step.id}`}
            className={cn(
              'flex flex-col items-center text-center flex-1 px-2',
              index === currentStep ? 'opacity-100' : 'opacity-60'
            )}
          >
            <h3
              className={cn(
                'text-sm font-medium',
                index === currentStep
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              {step.title}
            </h3>
            {step.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">{children[currentStep]}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={cn(
            'px-6 py-2 rounded-lg font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
            currentStep === 0
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
          )}
        >
          Previous
        </button>

        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          Step {currentStep + 1} of {steps.length}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// Example usage component
interface StepContentProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function StepContent({ children, title, description }: StepContentProps) {
  return (
    <div className="space-y-6">
      {title && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
