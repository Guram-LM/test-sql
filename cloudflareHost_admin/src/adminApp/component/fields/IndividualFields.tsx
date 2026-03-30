import type { FieldConfig } from "../interface/interface";

export const individualFields:FieldConfig[] = [
    { name: "title_ka", label: "სათაური (ქარ.)", type: "text" as const, required: true },
    { name: "title_en", label: "Title (Eng.)", type: "text" as const, required: true },
    { name: "Program_ka", label: "პროგრამის დასახელება(ქარ.)", type: "text" as const, required: false },
    { name: "Program_en", label: "Program Name (Eng.)", type: "text" as const, required: false },
    { name: "programDuration_ka", label: "ხანგრძლივობა (ქარ.)", type: "text" as const, required: true },
    { name: "programDuration_en", label: "Duration (Eng.)", type: "text" as const, required: true },
    { name: "price", label: "ფასი", type: "text" as const, required: true },
];
