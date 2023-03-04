export interface EspressoBrew {
  id: string;
  timestamp: number;
  grind: string;
  doseInGrams: number;
  yieldInGrams: number;
  timeInSeconds: number;
  rating?: number;
  notes?: string;
}
