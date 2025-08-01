
import React, { useState } from 'react';
import { RecipeProfile } from '../types';
import { generateRecipeProfile } from '../services/geminiService';
import LoadingSpinner from './shared/LoadingSpinner';
import { ChefHatIcon } from './shared/IconComponents';
import { useCredits } from '../contexts/CreditContext';
import { TOOL_COSTS } from '../constants';

interface IngredientListViewProps {
  onProfileGenerated: (profile: RecipeProfile) => void;
}

const placeholderIngredients = `chicken breast, rice, broccoli, soy sauce, garlic, ginger`;
const placeholderPreferences = `Looking for a healthy, quick weeknight dinner. Gluten-free if possible.`;

const IngredientListView: React.FC<IngredientListViewProps> = ({ onProfileGenerated }) => {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<RecipeProfile | null>(null);
  const { credits, spendCredits, showPaywall } = useCredits();
  const cost = TOOL_COSTS['ROBERTO'] ?? 0;

  const handleGenerate = async () => {
    if (credits < cost) {
      showPaywall();
      return;
    }

    setIsLoading(true);
    setError(null);
    setProfile(null);
    try {
      const result = await generateRecipeProfile({
        ingredients: ingredients || placeholderIngredients,
        preferences: preferences || placeholderPreferences
      });
      spendCredits(cost);
      setProfile(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (profile) {
        onProfileGenerated(profile);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-dark-card shadow-lg rounded-xl border border-dark-border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <ChefHatIcon className="w-8 h-8 text-accent" />
            <div>
              <h2 className="text-2xl font-bold text-white">Step 1: Pantry Check</h2>
              <p className="text-dark-text-secondary">List your ingredients to generate a custom recipe.</p>
            </div>
          </div>

          <div className="space-y-4">
              <EditableTextarea label="Available Ingredients" placeholder={placeholderIngredients} value={ingredients} onChange={e => setIngredients(e.target.value)} disabled={isLoading || !!profile} rows={3}/>
              <EditableTextarea label="Preferences & Dietary Needs" placeholder={placeholderPreferences} value={preferences} onChange={e => setPreferences(e.target.value)} disabled={isLoading || !!profile} rows={2}/>
          </div>
          <p className="text-sm text-dark-text-secondary mt-2">
            Enter what you have on hand, or leave blank to use the examples.
          </p>
        </div>

        {!profile && (
            <div className="bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-4">
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="px-6 py-2 bg-accent text-gray-900 font-semibold rounded-lg hover:bg-accent-hover disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200"
            >
                {isLoading ? <LoadingSpinner size={20} /> : <ChefHatIcon className="w-5 h-5" />}
                {isLoading ? 'Generating...' : `Generate Recipe (-${cost} Credits)`}
            </button>
            </div>
        )}
        
        {error && <div className="p-4 bg-red-900/50 text-red-300 m-6 rounded-lg">{error}</div>}

        {profile && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Your Custom Recipe</h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <DisplaySection title="Dish Name">
                    <h4 className="text-xl font-bold text-accent">{profile.dishName}</h4>
                </DisplaySection>
                <DisplaySection title="Description">
                    <p className="italic">{profile.description}</p>
                </DisplaySection>
                <div className="grid grid-cols-2 gap-4">
                    <DisplaySection title="Prep Time">
                        <p>{profile.prepTime}</p>
                    </DisplaySection>
                    <DisplaySection title="Cook Time">
                        <p>{profile.cookTime}</p>
                    </DisplaySection>
                </div>
                 <DisplaySection title="Ingredients">
                    <ul className="space-y-1 list-disc pl-5">
                        {profile.ingredients.map((item, idx) => <li key={idx}><strong>{item.amount}</strong> {item.name}</li>)}
                    </ul>
                </DisplaySection>
                 <DisplaySection title="Instructions">
                    <ol className="space-y-2 list-decimal pl-5">
                        {profile.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
                    </ol>
                </DisplaySection>
            </div>
             <p className="text-sm text-dark-text-secondary mt-2">Generated recipe is read-only. You can ask for help in the chat step!</p>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleProceed}
                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors duration-200"
                >
                    Proceed to Prep
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const commonInputClass = "w-full p-2 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-shadow duration-200 bg-gray-900 border-dark-border disabled:bg-gray-800 disabled:cursor-not-allowed";

const EditableTextarea: React.FC<{value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, label: string, rows: number, disabled: boolean, placeholder: string}> = ({value, onChange, label, rows, disabled, placeholder}) => (
     <div>
        <label className="font-semibold text-accent/80 text-sm mb-1 block">{label}</label>
        <textarea value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} className={`${commonInputClass} resize-y`} rows={rows} />
     </div>
);

const DisplaySection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div>
        <h4 className="font-semibold text-accent/80 text-sm mb-1 block">{title}</h4>
        <div className="p-3 bg-gray-900/70 border border-dark-border rounded-lg text-dark-text">
            {children}
        </div>
    </div>
);


export default IngredientListView;
