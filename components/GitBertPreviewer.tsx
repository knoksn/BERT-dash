
import React, { useState } from 'react';
import { GitBERTStep, ReadmeContent } from '../types';
import RepoDetailsView from './RepoDetailsView';
import AssetGenerationView from './AssetGenerationView';
import ReadmeEditorView from './ReadmeEditorView';
import Stepper from './shared/Stepper';
import { RestartIcon, GithubIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'DETAILS', name: 'Repo Details', icon: GithubIcon },
  { id: 'ASSETS', name: 'Generate README', icon: GithubIcon },
  { id: 'EDITOR', name: 'Edit & Refine', icon: ChatBubbleIcon },
];

const GitBertPreviewer: React.FC = () => {
    const [step, setStep] = useState<GitBERTStep>('DETAILS');
    const [readmeContent, setReadmeContent] = useState<ReadmeContent | null>(null);

    const handleReadmeGenerated = (content: ReadmeContent) => {
        setReadmeContent(content);
        setStep('ASSETS');
    };

    const handleAssetGenerationComplete = () => {
        setStep('EDITOR');
    };

    const handleReset = () => {
        setStep('DETAILS');
        setReadmeContent(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'DETAILS':
                return <RepoDetailsView onReadmeGenerated={handleReadmeGenerated} />;
            case 'ASSETS':
                return <AssetGenerationView onGenerationComplete={handleAssetGenerationComplete} />;
            case 'EDITOR':
                return readmeContent ? <ReadmeEditorView readmeContent={readmeContent} /> : <p>Error: README content is missing.</p>;
            default:
                return <RepoDetailsView onReadmeGenerated={handleReadmeGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'DETAILS' && (
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

export default GitBertPreviewer;