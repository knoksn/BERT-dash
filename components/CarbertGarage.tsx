
import React, { useState } from 'react';
import { CarbertStep, VehicleProfile } from '../types';
import VehicleProfileView from './VehicleProfileView';
import EngineCalibrationView from './EngineCalibrationView';
import TechQaView from './TechQaView';
import Stepper from './shared/Stepper';
import { RestartIcon, WrenchIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'PROFILE', name: 'Vehicle Profile', icon: WrenchIcon },
  { id: 'CALIBRATION', name: 'Engine Tune', icon: WrenchIcon },
  { id: 'QA', name: 'Technical Q&A', icon: ChatBubbleIcon },
];

const CarbertGarage: React.FC = () => {
    const [step, setStep] = useState<CarbertStep>('PROFILE');
    const [vehicleProfile, setVehicleProfile] = useState<VehicleProfile | null>(null);

    const handleProfileGenerated = (profile: VehicleProfile) => {
        setVehicleProfile(profile);
        setStep('CALIBRATION');
    };

    const handleCalibrationComplete = () => {
        setStep('QA');
    };

    const handleReset = () => {
        setStep('PROFILE');
        setVehicleProfile(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'PROFILE':
                return <VehicleProfileView onProfileGenerated={handleProfileGenerated} />;
            case 'CALIBRATION':
                return <EngineCalibrationView onCalibrationComplete={handleCalibrationComplete} />;
            case 'QA':
                return vehicleProfile ? <TechQaView vehicleProfile={vehicleProfile} /> : <p>Error: Vehicle profile is missing.</p>;
            default:
                return <VehicleProfileView onProfileGenerated={handleProfileGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'PROFILE' && (
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

export default CarbertGarage;
