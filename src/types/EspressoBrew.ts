import { BaseBrew } from "./BaseBrew";

export interface EspressoBrew extends BaseBrew {
  brewType: "espresso";
  doseInGrams: number;
  yieldInGrams: number;
  timeInSeconds: number;
}
