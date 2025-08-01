
import React, { useState } from 'react';
import { TravelBERTStep, Itinerary } from '../types';
import DestinationView from './DestinationView';
import TripBookingView from './TripBookingView';
import TravelConciergeView from './TravelConciergeView';
import Stepper from './shared/Stepper';
import { RestartIcon, GlobeIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'DESTINATION', name: 'Plan Trip', icon: GlobeIcon },
  { id: 'BOOKING', name: 'Simulate Booking', icon: GlobeIcon },
  { id: 'CONCIERGE', name: 'AI Concierge', icon: ChatBubbleIcon },
];

const TravelBertPlanner: React.FC = () => {
    const [step, setStep] = useState<TravelBERTStep>('DESTINATION');
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);

    const handleItineraryGenerated = (plan: Itinerary) => {
        setItinerary(plan);
        setStep('BOOKING');
    };

    const handleBookingComplete = () => {
        setStep('CONCIERGE');
    };

    const handleReset = () => {
        setStep('DESTINATION');
        setItinerary(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'DESTINATION':
                return <DestinationView onItineraryGenerated={handleItineraryGenerated} />;
            case 'BOOKING':
                return <TripBookingView onBookingComplete={handleBookingComplete} />;
            case 'CONCIERGE':
                return itinerary ? <TravelConciergeView itinerary={itinerary} /> : <p>Error: Itinerary data is missing.</p>;
            default:
                return <DestinationView onItineraryGenerated={handleItineraryGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'DESTINATION' && (
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

export default TravelBertPlanner;
