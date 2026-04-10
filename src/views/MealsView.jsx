import React, { useState } from 'react';
import { useFridge } from '../context/FridgeContext';
import { ChefHat, Clock, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import ChillGuyMascot from '../components/ChillGuyMascot';

const ALL_RECIPES = [
  {
    id: 1,
    emoji: '🍳',
    title: 'Scrambled Eggs',
    ingredients: ['eggs', 'milk', 'butter', 'salt'],
    time: '5 mins',
    difficulty: 'easy',
    instructions: 'Whisk eggs with a splash of milk and pinch of salt. Melt butter in a pan on low heat. Pour in eggs, fold gently with a spatula until just set. Do not overcook.',
  },
  {
    id: 2,
    emoji: '🍝',
    title: 'Pasta Carbonara',
    ingredients: ['pasta', 'eggs', 'cheddar cheese', 'bacon'],
    time: '20 mins',
    difficulty: 'easy',
    instructions: 'Boil pasta. Fry bacon until crispy. Whisk eggs with grated cheese. Drain pasta, reserve a cup of water. Off heat, mix egg mixture into pasta with a splash of pasta water. Toss with bacon. Season well.',
  },
  {
    id: 3,
    emoji: '🥑',
    title: 'Avocado Toast',
    ingredients: ['avocados', 'bread', 'lemon', 'hot sauce'],
    time: '5 mins',
    difficulty: 'easy',
    instructions: 'Toast bread until golden. Halve avocado, scoop into bowl. Mash with lemon juice, salt, and pepper. Spread thick on toast. Hit it with hot sauce.',
  },
  {
    id: 4,
    emoji: '🫔',
    title: 'Cheesy Quesadilla',
    ingredients: ['cheddar cheese', 'hot sauce'],
    time: '8 mins',
    difficulty: 'easy',
    instructions: 'Put a generous layer of shredded cheese between two flour tortillas. Press into a dry pan on medium heat. Cook 2-3 mins per side until golden and melty. Slice, dip in hot sauce.',
  },
  {
    id: 5,
    emoji: '🫙',
    title: 'Greek Yogurt Bowl',
    ingredients: ['greek yogurt', 'honey', 'granola'],
    time: '3 mins',
    difficulty: 'easy',
    instructions: 'Scoop greek yogurt into a bowl. Layer granola on top. Drizzle honey. Add fruit if you have it. Eat immediately so the granola stays crunchy.',
  },
  {
    id: 6,
    emoji: '🍗',
    title: 'Quick Chicken Stir Fry',
    ingredients: ['meal prep chicken', 'hot sauce', 'eggs'],
    time: '15 mins',
    difficulty: 'medium',
    instructions: 'Slice or shred chicken. Get a pan ripping hot. Stir fry chicken to warm through. Add whatever veg you have, splash of soy sauce, garlic if you got it. Serve over rice or eat straight.',
  },
];

function RecipeCard({ recipe, hasSome }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-[1.5rem] overflow-hidden shadow-sm transition-all duration-300 ${hasSome ? 'bg-white' : 'bg-white/60'}`}>
      <button
        className="w-full p-4 flex items-start gap-3 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-3xl leading-none mt-0.5">{recipe.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-extrabold text-lg text-chill-accent leading-tight">{recipe.title}</h3>
            {hasSome && (
              <span className="bg-chill-fresh/20 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                you have the stuff
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-[11px] font-bold text-chill-accent/50">
              <Clock size={11} /> {recipe.time}
            </span>
            <span className={`flex items-center gap-1 text-[11px] font-bold ${recipe.difficulty === 'easy' ? 'text-green-600' : 'text-amber-500'}`}>
              <Zap size={11} /> {recipe.difficulty}
            </span>
          </div>
          <p className="text-xs font-bold text-chill-accent/40 mt-1 truncate">
            {recipe.ingredients.join(', ')}
          </p>
        </div>
        <div className="text-chill-accent/30 mt-1">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-chill-accent/5 pt-3 flex flex-col gap-3">
          <p className="text-sm font-bold text-chill-accent/70 leading-relaxed">
            {recipe.instructions}
          </p>
          <button className="bg-chill-accent text-white py-3 rounded-xl font-extrabold flex items-center justify-center gap-2">
            <ChefHat size={16} /> let's cook it
          </button>
        </div>
      )}
    </div>
  );
}

export default function MealsView() {
  const { items } = useFridge();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4 text-chill-accent/50">
        <ChillGuyMascot state="empty" size={100} />
        <p className="font-bold text-center">nothing to cook with. add something first.</p>
      </div>
    );
  }

  const itemNames = items.map(i => i.name.toLowerCase());

  const recipesWithMatch = ALL_RECIPES.map(r => ({
    ...r,
    hasSome: r.ingredients.some(ing =>
      itemNames.some(name => name.includes(ing.toLowerCase()) || ing.toLowerCase().includes(name))
    ),
  })).sort((a, b) => b.hasSome - a.hasSome);

  const matchCount = recipesWithMatch.filter(r => r.hasSome).length;

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar flex flex-col gap-4">
      <div className="bg-chill-accent/10 border border-chill-accent/10 p-3 rounded-2xl text-center">
        <p className="text-xs font-extrabold text-chill-accent/70">
          {matchCount > 0
            ? `you can make ${matchCount} of these rn`
            : 'here\'s what you could make'}
        </p>
      </div>

      {recipesWithMatch.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} hasSome={recipe.hasSome} />
      ))}
    </div>
  );
}
