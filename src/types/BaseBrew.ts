export interface BaseBrew {
  id: string;
  timestamp: number;
  brewType: "espresso" | "pour over";
  grind: string;
  notes: string;
  rating: number;
}
