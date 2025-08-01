
import React, { useState } from 'react';
import { DreamBERTStep, DreamInterpretation } from '../types';
import DreamInputView from './DreamInputView';
import SubconsciousAnalysisView from './SubconsciousAnalysisView';
import DreamInterpretationView from './DreamInterpretationView';
import Stepper from './shared/Stepper';
import { RestartIcon, MoonIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'DREAM_INPUT', name: 'Enter Dream', icon: MoonIcon },
  { id: 'ANALYSIS', name: 'Analysis', icon: MoonIcon },
  { id: 'INTERPRETATION', name: 'Interpretation', icon: ChatBubbleIcon },
];

const DreamBertAnalyzer: React.FC = () => {
    const [step, setStep] = useState<DreamBERTStep>('DREAM_INPUT');
    const [dreamInterpretation, setDreamInterpretation] = useState<DreamInterpretation | null>(null);

    const handleInterpretationGenerated = (interpretation: DreamInterpretation) => {
        setDreamInterpretation(interpretation);
        setStep('ANALYSIS');
    };

    const handleAnalysisComplete = () => {
        setStep('INTERPRETATION');
    };

    const handleReset = () => {
        setStep('DREAM_INPUT');
        setDreamInterpretation(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'DREAM_INPUT':
                return <DreamInputView onInterpretationGenerated={handleInterpretationGenerated} />;
            case 'ANALYSIS':
                return <SubconsciousAnalysisView onAnalysisComplete={handleAnalysisComplete} />;
            case 'INTERPRETATION':
                return dreamInterpretation ? <DreamInterpretationView dreamInterpretation={dreamInterpretation} /> : <p>Error: Dream interpretation is missing.</p>;
            default:
                return <DreamInputView onInterpretationGenerated={handleInterpretationGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'DREAM_INPUT' && (
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

export default DreamBertAnalyzer;
