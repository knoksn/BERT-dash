
import React, { useState } from 'react';
import { QuestBERTStep, Quest } from '../types';
import QuestOutlineView from './QuestOutlineView';
import WorldBuildingView from './WorldBuildingView';
import DungeonMasterChatView from './DungeonMasterChatView';
import Stepper from './shared/Stepper';
import { RestartIcon, ScrollIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'OUTLINE', name: 'Quest Outline', icon: ScrollIcon },
  { id: 'WORLD_BUILDING', name: 'World-Building', icon: ScrollIcon },
  { id: 'DM_CHAT', name: 'DM Chat', icon: ChatBubbleIcon },
];

const QuestBertGenerator: React.FC = () => {
    const [step, setStep] = useState<QuestBERTStep>('OUTLINE');
    const [quest, setQuest] = useState<Quest | null>(null);

    const handleQuestGenerated = (generatedQuest: Quest) => {
        setQuest(generatedQuest);
        setStep('WORLD_BUILDING');
    };

    const handleWorldBuildingComplete = () => {
        setStep('DM_CHAT');
    };

    const handleReset = () => {
        setStep('OUTLINE');
        setQuest(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'OUTLINE':
                return <QuestOutlineView onQuestGenerated={handleQuestGenerated} />;
            case 'WORLD_BUILDING':
                return <WorldBuildingView onBuildingComplete={handleWorldBuildingComplete} />;
            case 'DM_CHAT':
                return quest ? <DungeonMasterChatView quest={quest} /> : <p>Error: Quest data is missing.</p>;
            default:
                return <QuestOutlineView onQuestGenerated={handleQuestGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'OUTLINE' && (
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

export default QuestBertGenerator;
