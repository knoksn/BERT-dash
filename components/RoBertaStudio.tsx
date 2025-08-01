
import React, { useState } from 'react';
import { RoBERTaStep, ResumeProfile } from '../types';
import ResumeIntakeView from './ResumeIntakeView';
import OptimizationAnalysisView from './OptimizationAnalysisView';
import InterviewPrepView from './InterviewPrepView';
import Stepper from './shared/Stepper';
import { RestartIcon, BriefcaseIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'INTAKE', name: 'Resume Intake', icon: BriefcaseIcon },
  { id: 'OPTIMIZATION', name: 'Optimize', icon: BriefcaseIcon },
  { id: 'INTERVIEW_PREP', name: 'Interview Prep', icon: ChatBubbleIcon },
];

const RoBertaStudio: React.FC = () => {
    const [step, setStep] = useState<RoBERTaStep>('INTAKE');
    const [resumeProfile, setResumeProfile] = useState<ResumeProfile | null>(null);

    const handleProfileGenerated = (profile: ResumeProfile) => {
        setResumeProfile(profile);
        setStep('OPTIMIZATION');
    };

    const handleOptimizationComplete = () => {
        setStep('INTERVIEW_PREP');
    };

    const handleReset = () => {
        setStep('INTAKE');
        setResumeProfile(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'INTAKE':
                return <ResumeIntakeView onProfileGenerated={handleProfileGenerated} />;
            case 'OPTIMIZATION':
                return <OptimizationAnalysisView onAnalysisComplete={handleOptimizationComplete} />;
            case 'INTERVIEW_PREP':
                return resumeProfile ? <InterviewPrepView resumeProfile={resumeProfile} /> : <p>Error: Resume profile is missing.</p>;
            default:
                return <ResumeIntakeView onProfileGenerated={handleProfileGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'INTAKE' && (
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

export default RoBertaStudio;
