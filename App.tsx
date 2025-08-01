
import React, { useState } from 'react';
import { AppMode } from './types';
import { TOOL_COSTS } from './constants';
import DarkbertStudio from './components/DarkbertStudio';
import ArtistScamDetectorView from './components/ArtistScamDetectorView';
import ModeSelectionView from './components/ModeSelectionView';
import StorybertStudio from './components/StorybertStudio';
import CarbertGarage from './components/CarbertGarage';
import AnniBertPlanner from './components/AnniBertPlanner';
import BartholomewLibrary from './components/BartholomewLibrary';
import LaBertAssistant from './components/LaBertAssistant';
import LiveBertProducer from './components/LiveBertProducer';
import RoBertaStudio from './components/RoBertaStudio';
import RoBertoKitchen from './components/RoBertoKitchen';
import FitbertStudio from './components/FitbertStudio';
import DocuBertAnalyzer from './components/DocuBertAnalyzer';
import TravelBertPlanner from './components/TravelBertPlanner';
import FinanceBertGateway from './components/FinanceBertGateway';
import QuestBertGenerator from './components/QuestBertGenerator';
import DreamBertAnalyzer from './components/DreamBertAnalyzer';
import ContractBertAnalyzer from './components/ContractBertAnalyzer';
import GitBertPreviewer from './components/GitBertPreviewer';
import LaunchBertLauncher from './components/LaunchBertLauncher';
import { CreditProvider, useCredits } from './contexts/CreditContext';
import { ArrowLeftIcon, CoinsIcon, PlusIcon, CreditCardIcon } from './components/shared/IconComponents';

const Header: React.FC<{ mode: AppMode, onBack: () => void }> = ({ mode, onBack }) => {
    const { credits, showPaywall } = useCredits();

    const titles = {
        TOOL_SUITE: 'AI Tool Suite',
        DARKBERT: 'DarkBERT Studio',
        ARTIST: 'Artist Scam Detector',
        STORYBERT: 'StoryBERT Studio',
        CARBERT: 'CarBERT Garage',
        ANNIBERT: 'AnniBERT Planner',
        BARTHOLOMEW: "BERTholomew's Library",
        LABERT: 'LaBERT Legal Assistant',
        LIVEBERT: 'LiveBERT Stagehand',
        ROBERTA: "RoBERTa's Career Clinic",
        ROBERTO: "RoBERTo's Kitchen",
        FITBERT: 'FitBERT Coach',
        DOCUBERT: 'DocuBERT Analyzer',
        TRAVELBERT: 'TravelBERT Planner',
        FINANCEBERT: 'FinanceBERT Gateway',
        QUESTBERT: 'QuestBERT Generator',
        DREAMBERT: 'DreamBERT Analyzer',
        CONTRACTBERT: 'ContractBERT Analyzer',
        GITBERT: 'GitBERT Previewer',
        LAUNCHBERT: 'LaunchBERT Quick Launcher',
    };
    const subtitles = {
        TOOL_SUITE: 'Select a tool to get started',
        DARKBERT: 'Fine-Tuning & Interaction Simulator',
        ARTIST: 'Analyze communications for scams',
        STORYBERT: 'Creative Writing Assistant',
        CARBERT: 'Automotive Profiling & Technical Q&A',
        ANNIBERT: 'Special Occasion & Gift Planner',
        BARTHOLOMEW: 'Historical Topic Research & Inquiry',
        LABERT: 'Legal Situation Analysis & Q&A',
        LIVEBERT: 'Live Event Production Assistant',
        ROBERTA: 'Resume Optimization & Interview Prep',
        ROBERTO: 'AI Recipe Generator & Culinary Assistant',
        FITBERT: 'AI Fitness Planner & Coach',
        DOCUBERT: 'Summarize and Chat with Your Documents',
        TRAVELBERT: 'AI Itinerary Generator & Travel Concierge',
        FINANCEBERT: 'Generate Code for Payment Integrations',
        QUESTBERT: 'Generate RPG quests and chat with an AI Dungeon Master',
        DREAMBERT: 'Get an AI-powered interpretation of your dreams',
        CONTRACTBERT: 'Analyze legal documents and ask clarifying questions',
        GITBERT: 'Generate professional GitHub README files',
        LAUNCHBERT: 'Generate marketing assets for your product launch',
    }

    return (
        <header className="p-4 text-center relative">
            {mode !== 'TOOL_SUITE' ? (
                <button
                    onClick={onBack}
                    title="Back to selection"
                    className="absolute top-1/2 left-4 -translate-y-1/2 p-2 text-dark-text-secondary hover:text-accent transition-colors duration-200"
                    aria-label="Back to selection"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            ) : (
                 <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-dark-card px-3 py-1.5 rounded-full border border-dark-border shadow-md">
                        <CoinsIcon className="w-6 h-6 text-yellow-400" />
                        <span className="font-bold text-lg text-white">{credits}</span>
                        <span className="text-dark-text-secondary text-sm hidden sm:inline">Credits</span>
                    </div>
                    <button 
                        onClick={showPaywall}
                        className="p-2 bg-accent text-gray-900 rounded-full hover:bg-accent-hover transition-colors duration-200 shadow-md"
                        title="Get More Credits"
                        aria-label="Get More Credits"
                    >
                        <PlusIcon className="w-5 h-5"/>
                    </button>
                </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">
                <span className="text-accent">{titles[mode].split(' ')[0]}</span>
                {' '}
                {titles[mode].split(' ').slice(1).join(' ')}
            </h1>
            <p className="text-dark-text-secondary mt-1">
                {subtitles[mode]}
            </p>
        </header>
    );
};


const AppContent: React.FC = () => {
    const [mode, setMode] = useState<AppMode>('TOOL_SUITE');

    const handleModeSelect = (selectedMode: AppMode) => {
        setMode(selectedMode);
    };
    
    const handleBack = () => {
        setMode('TOOL_SUITE');
    }

    const renderMode = () => {
        switch (mode) {
            case 'DARKBERT':
                return <DarkbertStudio />;
            case 'ARTIST':
                return <ArtistScamDetectorView />;
            case 'STORYBERT':
                return <StorybertStudio />;
            case 'CARBERT':
                return <CarbertGarage />;
            case 'ANNIBERT':
                return <AnniBertPlanner />;
            case 'BARTHOLOMEW':
                return <BartholomewLibrary />;
            case 'LABERT':
                return <LaBertAssistant />;
            case 'LIVEBERT':
                return <LiveBertProducer />;
            case 'ROBERTA':
                return <RoBertaStudio />;
            case 'ROBERTO':
                return <RoBertoKitchen />;
            case 'FITBERT':
                return <FitbertStudio />;
            case 'DOCUBERT':
                return <DocuBertAnalyzer />;
            case 'TRAVELBERT':
                return <TravelBertPlanner />;
            case 'FINANCEBERT':
                return <FinanceBertGateway />;
            case 'QUESTBERT':
                return <QuestBertGenerator />;
            case 'DREAMBERT':
                return <DreamBertAnalyzer />;
            case 'CONTRACTBERT':
                return <ContractBertAnalyzer />;
            case 'GITBERT':
                return <GitBertPreviewer />;
            case 'LAUNCHBERT':
                return <LaunchBertLauncher />;
            case 'TOOL_SUITE':
            default:
                return <ModeSelectionView onModeSelect={handleModeSelect} />;
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg font-sans flex flex-col">
            <Header mode={mode} onBack={handleBack} />
            <main className="flex-grow flex flex-col items-center justify-start w-full">
                {renderMode()}
            </main>
        </div>
    );
};


const App: React.FC = () => {
    return (
        <CreditProvider>
            <AppContent />
        </CreditProvider>
    );
};

export default App;