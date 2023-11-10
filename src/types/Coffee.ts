import { Brew } from "./Brew";

export interface Coffee {
  id: string;
  userId: string;
  name: string;
  brewHistory: Brew[];
}
