import type { FieldConfig } from "../interface/interface";

export const companyFields:FieldConfig[] = [
    { name: "title_ka", label: "სათაური (ქარ.)", type: "text" as const, required: true },
    { name: "title_en", label: "Title (Eng.)", type: "text" as const, required: true },

    { name: "programDuration_ka", label: "ხანგრძლივობა (ქარ.)", type: "text" as const, required: true },
    { name: "programDuration_en", label: "Duration (Eng.)", type: "text" as const, required: true },
    { name: "totalHours_ka", label: "სრული დრო (ქარ.)", type: "text" as const, required: false },
    { name: "totalHours_en", label: "Total Hours (Eng.)", type: "text" as const, required: false },
    
    { name: "benefit_ka", label: "რას იღებთ (ქარ.)", type: "text" as const, required: true },
    { name: "benefit_en", label: "What do you get (Eng.)", type: "text" as const, required: true },
    { name: "price", label: "ფასი", type: "text" as const, required: true },
];
