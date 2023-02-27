import { Brew } from "./Brew";

export interface Coffee {
  id: string;
  name: string;
  brewHistory: Brew[];
}
