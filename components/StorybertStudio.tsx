
import React, { useState } from 'react';
import { StoryStep, StoryPremise } from '../types';
import PremiseView from './PremiseView';
import StyleTuningView from './StyleTuningView';
import WritingChatView from './WritingChatView';
import Stepper from './shared/Stepper';
import { RestartIcon, FeatherIcon, PaintBrushIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'PREMISE', name: 'Generate Premise', icon: FeatherIcon },
  { id: 'STYLE', name: 'Calibrate Style', icon: PaintBrushIcon },
  { id: 'WRITE', name: 'Write Story', icon: ChatBubbleIcon },
];

const StorybertStudio: React.FC = () => {
    const [step, setStep] = useState<StoryStep>('PREMISE');
    const [storyPremise, setStoryPremise] = useState<StoryPremise | null>(null);

    const handlePremiseGenerated = (premise: StoryPremise) => {
        setStoryPremise(premise);
        setStep('STYLE');
    };

    const handleStyleTuned = () => {
        setStep('WRITE');
    };

    const handleReset = () => {
        setStep('PREMISE');
        setStoryPremise(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'PREMISE':
                return <PremiseView onPremiseGenerated={handlePremiseGenerated} />;
            case 'STYLE':
                return <StyleTuningView onTuningComplete={handleStyleTuned} />;
            case 'WRITE':
                return storyPremise ? <WritingChatView storyPremise={storyPremise} /> : <p>Error: Story premise is missing.</p>;
            default:
                return <PremiseView onPremiseGenerated={handlePremiseGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'PREMISE' && (
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

export default StorybertStudio;
