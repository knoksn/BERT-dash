
import React, { useState } from 'react';
import { LaBERTStep, CaseBrief } from '../types';
import CaseBriefView from './CaseBriefView';
import LegalResearchView from './LegalResearchView';
import LegalQaView from './LegalQaView';
import Stepper from './shared/Stepper';
import { RestartIcon, ScaleIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'BRIEF', name: 'Case Intake', icon: ScaleIcon },
  { id: 'RESEARCH', name: 'Legal Research', icon: ScaleIcon },
  { id: 'QA', name: 'Legal Q&A', icon: ChatBubbleIcon },
];

const LaBertAssistant: React.FC = () => {
    const [step, setStep] = useState<LaBERTStep>('BRIEF');
    const [caseBrief, setCaseBrief] = useState<CaseBrief | null>(null);

    const handleBriefGenerated = (brief: CaseBrief) => {
        setCaseBrief(brief);
        setStep('RESEARCH');
    };

    const handleResearchComplete = () => {
        setStep('QA');
    };

    const handleReset = () => {
        setStep('BRIEF');
        setCaseBrief(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'BRIEF':
                return <CaseBriefView onBriefGenerated={handleBriefGenerated} />;
            case 'RESEARCH':
                return <LegalResearchView onResearchComplete={handleResearchComplete} />;
            case 'QA':
                return caseBrief ? <LegalQaView caseBrief={caseBrief} /> : <p>Error: Case brief is missing.</p>;
            default:
                return <CaseBriefView onBriefGenerated={handleBriefGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'BRIEF' && (
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

export default LaBertAssistant;
