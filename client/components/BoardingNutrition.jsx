'use client';

import { useState } from 'react';
import { Utensils, HeartPulse, Flame, CheckCircle2, Droplet, Apple, ShieldCheck } from 'lucide-react';

export default function BoardingNutrition({ studentName = 'Leo Jenkins' }) {
  const [activeMeal, setActiveMeal] = useState('all');

  const meals = [
    {
      id: 'breakfast',
      time: '07:30 – 08:45 AM',
      name: 'Pre-Training Power Fuel',
      category: 'Breakfast',
      items: [
        'Cage-Free Poached Eggs on Sourdough',
        'Organic Steel-Cut Oats with Berries & Honey',
        'Cold-Pressed Green Juice & Electrolyte Boost'
      ],
      macros: { protein: '34g', carbs: '68g', fats: '16g', cals: '580 kcal' }
    },
    {
      id: 'lunch',
      time: '12:30 – 01:45 PM',
      name: 'Midday Glycogen Replenishment',
      category: 'Chef Lunch',
      items: [
        'Grilled Lemon-Herb Salmon or Halibut',
        'Tri-Color Quinoa & Roasted Root Vegetables',
        'Baby Spinach, Avocado & Citrus Vinaigrette',
        'Chilled Fresh Coconut Water'
      ],
      macros: { protein: '42g', carbs: '76g', fats: '22g', cals: '690 kcal' }
    },
    {
      id: 'recovery',
      time: '04:30 – 05:00 PM',
      name: 'Post-Drill Rapid Recovery',
      category: 'Training Snack',
      items: [
        'Tart Cherry Anti-Inflammatory Shot',
        'Cold Whey Isolate & Banana Smoothie',
        'Almond Butter & Whole Grain Toast'
      ],
      macros: { protein: '28g', carbs: '45g', fats: '8g', cals: '360 kcal' }
    },
    {
      id: 'dinner',
      time: '07:00 – 08:15 PM',
      name: 'Cellular Repair & Evening Nutrition',
      category: 'Dinner',
      items: [
        'Slow-Braised Grass-Fed Beef or Lentil Steak',
        'Steamed Asparagus, Broccolini & Garlic Mushrooms',
        'Baked Yam with Cinnamon & Sea Salt',
        'Chamomile & Magnesium Infusion'
      ],
      macros: { protein: '46g', carbs: '62g', fats: '18g', cals: '620 kcal' }
    }
  ];

  const filteredMeals = activeMeal === 'all' ? meals : meals.filter(m => m.id === activeMeal);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-blue-950">
              Chef-Curated Sports Nutrition & Boarding Dining
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 font-mono">
              Olympus Dining Hall
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Daily anti-inflammatory performance diet tailored for <strong>{studentName}</strong> by Head Chef Julian Ross.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveMeal('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMeal === 'all'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Full Day
          </button>
          <button
            onClick={() => setActiveMeal('lunch')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMeal === 'lunch'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lunch
          </button>
          <button
            onClick={() => setActiveMeal('recovery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMeal === 'recovery'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recovery Snack
          </button>
        </div>
      </div>

      {/* Daily Macro Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
            <span>Protein Target</span>
            <Flame className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-black text-blue-950 mt-0.5">150g / 155g</div>
          <div className="text-[10px] text-emerald-700 font-bold mt-0.5">97% Target Reached</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
            <span>Carbohydrates</span>
            <Apple className="w-3.5 h-3.5 text-blue-700" />
          </div>
          <div className="text-xl font-black text-blue-950 mt-0.5">251g / 260g</div>
          <div className="text-[10px] text-blue-700 font-bold mt-0.5">Glycogen Optimized</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
            <span>Daily Caloric Goal</span>
            <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-black text-blue-950 mt-0.5">2,250 kcal</div>
          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Expenditure: 2,640 kcal</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
            <span>Hydration Index</span>
            <Droplet className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <div className="text-xl font-black text-cyan-700 mt-0.5">3.8 L / Day</div>
          <div className="text-[10px] text-cyan-800 font-bold mt-0.5">Electrolytes Balanced</div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs hover:border-blue-300 transition-all shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 font-mono">
                  {meal.category}
                </span>
                <h4 className="text-sm font-black text-slate-900 mt-0.5">{meal.name}</h4>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                {meal.time}
              </span>
            </div>

            <ul className="space-y-1.5 text-slate-700 font-medium">
              {meal.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>P: <strong className="text-slate-800">{meal.macros.protein}</strong></span>
              <span>C: <strong className="text-slate-800">{meal.macros.carbs}</strong></span>
              <span>F: <strong className="text-slate-800">{meal.macros.fats}</strong></span>
              <span className="font-bold text-blue-900">{meal.macros.cals}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
