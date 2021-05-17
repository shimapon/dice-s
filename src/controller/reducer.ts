import { Dice, roll, NormalizedRng } from "../model/dice";
import type { Action } from "./action";

export interface State {
  readonly dice: Readonly<Dice>;
  readonly history: readonly number[][];
}

export const reducer = (rng: NormalizedRng) =>
  (state: State, action: Action): State => {
    switch (action.type) {
      case "CHANGE_DICE":
        return {
          ...state,
          dice: action.dice,
        };
      case "ROLL_DICE":
        const result = roll(state.dice, rng);
        console.log(result);
        return {
          ...state,
          history: [...state.history, result],
        };
    }
  };