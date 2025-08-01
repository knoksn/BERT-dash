
import React, { useState } from 'react';
import { RoBERToStep, RecipeProfile } from '../types';
import IngredientListView from './IngredientListView';
import MiseEnPlaceView from './MiseEnPlaceView';
import CookingSessionView from './CookingSessionView';
import Stepper from './shared/Stepper';
import { RestartIcon, ChefHatIcon, ChatBubbleIcon } from './shared/IconComponents';

const STEPS = [
  { id: 'INGREDIENTS', name: 'Ingredients', icon: ChefHatIcon },
  { id: 'PREP', name: 'Mise en Place', icon: ChefHatIcon },
  { id: 'COOKING', name: 'Cooking Session', icon: ChatBubbleIcon },
];

const RoBertoKitchen: React.FC = () => {
    const [step, setStep] = useState<RoBERToStep>('INGREDIENTS');
    const [recipeProfile, setRecipeProfile] = useState<RecipeProfile | null>(null);

    const handleProfileGenerated = (profile: RecipeProfile) => {
        setRecipeProfile(profile);
        setStep('PREP');
    };

    const handlePrepComplete = () => {
        setStep('COOKING');
    };

    const handleReset = () => {
        setStep('INGREDIENTS');
        setRecipeProfile(null);
    };

    const renderStep = () => {
        switch (step) {
            case 'INGREDIENTS':
                return <IngredientListView onProfileGenerated={handleProfileGenerated} />;
            case 'PREP':
                return <MiseEnPlaceView onPrepComplete={handlePrepComplete} />;
            case 'COOKING':
                return recipeProfile ? <CookingSessionView recipeProfile={recipeProfile} /> : <p>Error: Recipe profile is missing.</p>;
            default:
                return <IngredientListView onProfileGenerated={handleProfileGenerated} />;
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full relative px-4">
                 <Stepper steps={STEPS} currentStepId={step} />
                 {step !== 'INGREDIENTS' && (
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

export default RoBertoKitchen;