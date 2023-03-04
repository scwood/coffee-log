import { EspressoBrew } from "./EspressoBrew";
import { PourOverBrew } from "./PourOverBrew";

type OmittedBrewFields = "id" | "timestamp";

/**
 * The brew variables themselves, without the ID and timestamp from the full
 * model. Used to pass values back and forth from the edit modal.
 */
export type BrewValues =
  | Omit<EspressoBrew, OmittedBrewFields>
  | Omit<PourOverBrew, OmittedBrewFields>;
