"use client";

import { useMemo } from "react";
import { colleges } from "@/lib/data";

const GRID = [
  [null, null, null, 'JK', null, null, null, null, null],
  [null, null, null, 'HP', 'UK', null, null, null, null],
  [null, null, 'PB', 'CH', 'HR', 'DL', null, null, 'AR'],
  [null, 'RJ', 'UP', 'BR', 'SK', null, 'AS', 'NL', null],
  ['GJ', 'MP', 'CG', 'JH', 'WB', 'ML', 'MN', null, null],
  ['MH', 'TG', 'OR', null, 'TR', 'MZ', null, null, null],
  ['GA', 'KA', 'AP', null, null, null, null, null, null],
  [null, 'KL', 'TN', null, null, null, null, null, null],
];

const STATE_NAMES: Record<string, string> = {
  'JK': 'Jammu & Kashmir',
  'HP': 'Himachal Pradesh',
  'UK': 'Uttarakhand',
  'PB': 'Punjab',
  'CH': 'Chandigarh',
  'HR': 'Haryana',
  'DL': 'Delhi',
  'AR': 'Arunachal Pradesh',
  'RJ': 'Rajasthan',
  'UP': 'Uttar Pradesh',
  'BR': 'Bihar',
  'SK': 'Sikkim',
  'AS': 'Assam',
  'NL': 'Nagaland',
  'GJ': 'Gujarat',
  'MP': 'Madhya Pradesh',
  'CG': 'Chhattisgarh',
  'JH': 'Jharkhand',
  'WB': 'West Bengal',
  'ML': 'Meghalaya',
  'MN': 'Manipur',
  'MH': 'Maharashtra',
  'TG': 'Telangana',
  'OR': 'Odisha',
  'TR': 'Tripura',
  'MZ': 'Mizoram',
  'GA': 'Goa',
  'KA': 'Karnataka',
  'AP': 'Andhra Pradesh',
  'KL': 'Kerala',
  'TN': 'Tamil Nadu'
};

interface IndiaGridMapProps {
  onStateSelect: (stateName: string) => void;
  selectedState: string | null;
}

export function IndiaGridMap({ onStateSelect, selectedState }: IndiaGridMapProps) {
  // Compute heatmap data
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(STATE_NAMES).forEach(name => {
      counts[name] = colleges.filter(c => c.location.includes(name)).length;
    });
    return counts;
  }, []);

  const maxCount = Math.max(...Object.values(stateCounts));

  const getHeatmapColor = (stateCode: string) => {
    const stateName = STATE_NAMES[stateCode];
    const count = stateCounts[stateName] || 0;
    
    if (count === 0) return 'bg-muted/30 text-muted-foreground border-border hover:bg-muted';
    
    return `bg-primary text-primary-foreground border-primary/20 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background`;
  };

  const getOpacity = (stateCode: string) => {
    const stateName = STATE_NAMES[stateCode];
    const count = stateCounts[stateName] || 0;
    if (count === 0) return 1;
    return 0.3 + (0.7 * (count / maxCount));
  };

  return (
    <div className="w-full max-w-3xl mx-auto overflow-x-auto p-4 hide-scrollbar">
      <div className="min-w-[600px] flex flex-col gap-2">
        {GRID.map((row, rIdx) => (
          <div key={`row-${rIdx}`} className="flex gap-2 justify-center">
            {row.map((col, cIdx) => {
              if (!col) {
                return <div key={`empty-${rIdx}-${cIdx}`} className="w-14 h-14 sm:w-16 sm:h-16" />;
              }
              
              const stateName = STATE_NAMES[col];
              const isSelected = selectedState === stateName;
              const count = stateCounts[stateName] || 0;

              return (
                <button
                  key={col}
                  onClick={() => onStateSelect(stateName)}
                  title={`${stateName} - ${count} colleges`}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 relative group
                    ${getHeatmapColor(col)}
                    ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 z-10 shadow-lg' : 'shadow-sm'}
                  `}
                  style={{ 
                    opacity: isSelected ? 1 : getOpacity(col) 
                  }}
                >
                  <span className="font-bold text-sm sm:text-base">{col}</span>
                  {count > 0 && (
                    <span className="text-[10px] font-medium opacity-80 mt-0.5">{count}</span>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-foreground text-background text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
                    {stateName}
                    <span className="block font-normal text-muted opacity-80">{count} Colleges</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <span>Less Colleges</span>
        <div className="flex gap-1">
          <div className="w-6 h-4 bg-primary rounded opacity-30"></div>
          <div className="w-6 h-4 bg-primary rounded opacity-50"></div>
          <div className="w-6 h-4 bg-primary rounded opacity-70"></div>
          <div className="w-6 h-4 bg-primary rounded opacity-100"></div>
        </div>
        <span>More Colleges</span>
      </div>
    </div>
  );
}
