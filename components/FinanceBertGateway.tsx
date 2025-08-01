
import React, { useState } from 'react';
import { FinanceBERTStep, PaymentGatewayConfig } from '../types';
import GatewaySetupView from './GatewaySetupView';
import BackendGenerationView from './BackendGenerationView';
import IntegrationGuideView from './IntegrationGuideView';
import Stepper from './shared/Stepper';
import { RestartIcon, CreditCardIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'SETUP', name: 'Gateway Setup', icon: CreditCardIcon },
  { id: 'PROVISIONING', name: 'Generate Code', icon: CreditCardIcon },
  { id: 'INTEGRATION', name: 'Integration Guide', icon: ChatBubbleIcon },
];

const FinanceBertGateway: React.FC = () => {
    const [step, setStep] = useState<FinanceBERTStep>('SETUP');
    const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig | null>(null);

    const handleConfigGenerated = (config: PaymentGatewayConfig) => {
        setGatewayConfig(config);
        setStep('PROVISIONING');
    };

    const handleGenerationComplete = () => {
        setStep('INTEGRATION');
    };

    const handleReset = () => {
        setStep('SETUP');
        setGatewayConfig(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'SETUP':
                return <GatewaySetupView onConfigGenerated={handleConfigGenerated} />;
            case 'PROVISIONING':
                return <BackendGenerationView onGenerationComplete={handleGenerationComplete} />;
            case 'INTEGRATION':
                return gatewayConfig ? <IntegrationGuideView gatewayConfig={gatewayConfig} /> : <p>Error: Gateway configuration is missing.</p>;
            default:
                return <GatewaySetupView onConfigGenerated={handleConfigGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'SETUP' && (
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

export default FinanceBertGateway;
