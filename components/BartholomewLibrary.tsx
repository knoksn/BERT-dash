
import React, { useState } from 'react';
import { BartholomewStep, ResearchBrief } from '../types';
import ResearchBriefView from './ResearchBriefView';
import ArchiveIndexingView from './ArchiveIndexingView';
import HistoricalInquiryView from './HistoricalInquiryView';
import Stepper from './shared/Stepper';
import { RestartIcon, BookOpenIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'RESEARCH', name: 'Research Topic', icon: BookOpenIcon },
  { id: 'INDEXING', name: 'Index Archives', icon: BookOpenIcon },
  { id: 'INQUIRY', name: 'Historical Inquiry', icon: ChatBubbleIcon },
];

const BartholomewLibrary: React.FC = () => {
    const [step, setStep] = useState<BartholomewStep>('RESEARCH');
    const [researchBrief, setResearchBrief] = useState<ResearchBrief | null>(null);

    const handleBriefGenerated = (brief: ResearchBrief) => {
        setResearchBrief(brief);
        setStep('INDEXING');
    };

    const handleIndexingComplete = () => {
        setStep('INQUIRY');
    };

    const handleReset = () => {
        setStep('RESEARCH');
        setResearchBrief(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'RESEARCH':
                return <ResearchBriefView onBriefGenerated={handleBriefGenerated} />;
            case 'INDEXING':
                return <ArchiveIndexingView onIndexingComplete={handleIndexingComplete} />;
            case 'INQUIRY':
                return researchBrief ? <HistoricalInquiryView researchBrief={researchBrief} /> : <p>Error: Research brief is missing.</p>;
            default:
                return <ResearchBriefView onBriefGenerated={handleBriefGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'RESEARCH' && (
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

export default BartholomewLibrary;
