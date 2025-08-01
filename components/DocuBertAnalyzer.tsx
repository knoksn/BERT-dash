
import React, { useState } from 'react';
import { DocuBERTStep, DocumentSummary } from '../types';
import UploadView from './UploadView';
import DocumentIndexingView from './DocumentIndexingView';
import DocumentQaView from './DocumentQaView';
import Stepper from './shared/Stepper';
import { RestartIcon, FileTextIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'UPLOAD', name: 'Upload Text', icon: FileTextIcon },
  { id: 'INDEXING', name: 'Index Document', icon: FileTextIcon },
  { id: 'QA', name: 'Q&A Session', icon: ChatBubbleIcon },
];

const DocuBertAnalyzer: React.FC = () => {
    const [step, setStep] = useState<DocuBERTStep>('UPLOAD');
    const [documentSummary, setDocumentSummary] = useState<DocumentSummary | null>(null);
    const [documentText, setDocumentText] = useState<string>('');

    const handleSummaryGenerated = (summary: DocumentSummary, text: string) => {
        setDocumentSummary(summary);
        setDocumentText(text);
        setStep('INDEXING');
    };

    const handleIndexingComplete = () => {
        setStep('QA');
    };

    const handleReset = () => {
        setStep('UPLOAD');
        setDocumentSummary(null);
        setDocumentText('');
    };

    const renderStep = () => {
        switch (step) {
            case 'UPLOAD':
                return <UploadView onSummaryGenerated={handleSummaryGenerated} />;
            case 'INDEXING':
                return <DocumentIndexingView onIndexingComplete={handleIndexingComplete} />;
            case 'QA':
                return documentSummary && documentText ? <DocumentQaView documentSummary={documentSummary} documentText={documentText} /> : <p>Error: Document data is missing.</p>;
            default:
                return <UploadView onSummaryGenerated={handleSummaryGenerated} />;
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

export default DocuBertAnalyzer;