import type { Dice } from "../model/dice";

export type Action = Readonly<{
  type: "ROLL_DICE"; 
} | {
  type: "CHANGE_DICE";
  dice: Dice;
}>;