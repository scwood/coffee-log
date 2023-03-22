import { BaseBrew } from "./BaseBrew";

export interface PourOverBrew extends BaseBrew {
  brewType: "pour over";
  coffeeInGrams: number;
  waterInGrams: number;
  time: string;
}
