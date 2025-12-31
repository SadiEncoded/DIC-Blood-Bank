export const LOCATIONS: Record<string, string[]> = {
  "Chandpur": [
    "Chandpur Sadar",
    "Faridganj",
    "Haimchar",
    "Hajiganj",
    "Kachua",
    "Matlab North",
    "Matlab South",
    "Shahrasti"
  ]
};

// Flattened list for easy searching/validation if needed, or helper to get all
export const getAllLocations = () => {
    const all: string[] = [];
    Object.entries(LOCATIONS).forEach(([district, areas]) => {
        areas.forEach(area => all.push(`${area}, ${district}`));
    });
    return all;
};
