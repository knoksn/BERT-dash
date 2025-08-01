
import React, { useState } from 'react';
import { AppStep, FineTuningData } from '../types';
import DataPrepView from './DataPrepView';
import FineTuningView from './FineTuningView';
import ChatView from './ChatView';
import Stepper from './shared/Stepper';
import { RestartIcon, BrainCircuitIcon, RocketIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'PREP', name: 'Prepare Data', icon: BrainCircuitIcon },
  { id: 'TUNING', name: 'Fine-Tune', icon: RocketIcon },
  { id: 'CHAT', name: 'Chat', icon: ChatBubbleIcon },
];

const DarkbertStudio: React.FC = () => {
    const [step, setStep] = useState<AppStep>('PREP');
    const [fineTuningData, setFineTuningData] = useState<FineTuningData[]>([]);

    const handleDataPrepared = (data: FineTuningData[]) => {
        setFineTuningData(data);
        setStep('TUNING');
    };

    const handleTuningComplete = () => {
        setStep('CHAT');
    };

    const handleReset = () => {
        setStep('PREP');
        setFineTuningData([]);
    };

    const renderStep = () => {
        switch (step) {
            case 'PREP':
                return <DataPrepView onDataPrepared={handleDataPrepared} />;
            case 'TUNING':
                return <FineTuningView onTuningComplete={handleTuningComplete} dataPairCount={fineTuningData.length} />;
            case 'CHAT':
                return <ChatView fineTuningData={fineTuningData} />;
            default:
                return <DataPrepView onDataPrepared={handleDataPrepared} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'PREP' && (
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

export default DarkbertStudio;