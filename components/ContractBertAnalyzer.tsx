
import React, { useState } from 'react';
import { ContractBERTStep, ContractAnalysis } from '../types';
import ContractUploadView from './ContractUploadView';
import ContractAnalysisView from './ContractAnalysisView';
import ContractQaView from './ContractQaView';
import Stepper from './shared/Stepper';
import { RestartIcon, FileCheckIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'UPLOAD', name: 'Upload Contract', icon: FileCheckIcon },
  { id: 'ANALYSIS', name: 'Analyze', icon: FileCheckIcon },
  { id: 'QA', name: 'Q&A Session', icon: ChatBubbleIcon },
];

const ContractBertAnalyzer: React.FC = () => {
    const [step, setStep] = useState<ContractBERTStep>('UPLOAD');
    const [contractAnalysis, setContractAnalysis] = useState<ContractAnalysis | null>(null);
    const [contractText, setContractText] = useState<string>('');

    const handleAnalysisGenerated = (analysis: ContractAnalysis, text: string) => {
        setContractAnalysis(analysis);
        setContractText(text);
        setStep('ANALYSIS');
    };

    const handleAnalysisComplete = () => {
        setStep('QA');
    };

    const handleReset = () => {
        setStep('UPLOAD');
        setContractAnalysis(null);
        setContractText('');
    };

    const renderStep = () => {
        switch (step) {
            case 'UPLOAD':
                return <ContractUploadView onAnalysisGenerated={handleAnalysisGenerated} />;
            case 'ANALYSIS':
                return <ContractAnalysisView onAnalysisComplete={handleAnalysisComplete} />;
            case 'QA':
                return contractAnalysis && contractText ? <ContractQaView contractAnalysis={contractAnalysis} contractText={contractText} /> : <p>Error: Contract data is missing.</p>;
            default:
                return <ContractUploadView onAnalysisGenerated={handleAnalysisGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'UPLOAD' && (
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

export default ContractBertAnalyzer;