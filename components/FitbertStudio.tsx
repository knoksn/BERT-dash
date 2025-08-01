
import React, { useState } from 'react';
import { FitBERTStep, WorkoutPlan } from '../types';
import WorkoutGoalsView from './WorkoutGoalsView';
import TrainingAdaptationView from './TrainingAdaptationView';
import FitnessCoachView from './FitnessCoachView';
import Stepper from './shared/Stepper';
import { RestartIcon, DumbbellIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'GOALS', name: 'Set Goals', icon: DumbbellIcon },
  { id: 'ADAPTATION', name: 'Adapt Plan', icon: DumbbellIcon },
  { id: 'COACHING', name: 'AI Coach', icon: ChatBubbleIcon },
];

const FitbertStudio: React.FC = () => {
    const [step, setStep] = useState<FitBERTStep>('GOALS');
    const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

    const handlePlanGenerated = (plan: WorkoutPlan) => {
        setWorkoutPlan(plan);
        setStep('ADAPTATION');
    };

    const handleAdaptationComplete = () => {
        setStep('COACHING');
    };

    const handleReset = () => {
        setStep('GOALS');
        setWorkoutPlan(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'GOALS':
                return <WorkoutGoalsView onPlanGenerated={handlePlanGenerated} />;
            case 'ADAPTATION':
                return <TrainingAdaptationView onAdaptationComplete={handleAdaptationComplete} />;
            case 'COACHING':
                return workoutPlan ? <FitnessCoachView workoutPlan={workoutPlan} /> : <p>Error: Workout plan is missing.</p>;
            default:
                return <WorkoutGoalsView onPlanGenerated={handlePlanGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'GOALS' && (
                    <button
                        onClick={handleReset}
                        title="Start Over"
                        className="absolute top-0 right-4 p-2 text-dark-text-secondary hover:text-accent transition-colors duration-200"
                        aria-label="Start Over"
                    >
                        <RestartIcon className="w-6 h-6" />
                    </button>
                 )}
            </div>
            {renderStep()}
        </div>
    );
};

export default FitbertStudio;
