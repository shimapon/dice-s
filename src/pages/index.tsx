import { FC, useReducer } from "react";
import type { NextPage } from "next";

import type { Dice } from "../model/dice";
import { reducer } from "../controller/reducer";

const RolledHistorty: FC<{ history: readonly number[][] }> = ({ history }) => (
  <>
    <div>
      {history
        .slice()
        .reverse()
        .map((results, i) => (
          <p key={i}>{results.join(" , ")}</p>
        ))}
    </div>
    <style jsx>{`
      div {
        position: fixed;
        width: 80%;
        height: 75%;
        overflow: auto;
        bottom: 2rem;
      }
    `}</style>
  </>
);

const PositiveNumberInput: FC<{
  readonly defaultValue: number;
  readonly onChange: (newValue: number) => void;
}> = ({ defaultValue, onChange }) => (
  <input
    type="number"
    onChange={(e) => {
      const num = parseInt(e.target.value, 10);
      if (!(0 < num)) return;
      onChange(num);
    }}
    min={1}
    defaultValue={defaultValue}
  />
);

const DiceInput: FC<{
  readonly changeDice: (dice: Dice) => void;
  readonly rollDice: () => void;
  readonly dice: Dice;
}> = ({ changeDice, rollDice, dice: { quantity, faces } }) => {
  return (
    <>
      <label>nDm でダイスの種類を入力</label>
      <PositiveNumberInput
        onChange={(quantity) => changeDice({ quantity, faces })}
        defaultValue={quantity}
      />
      D
      <PositiveNumberInput
        onChange={(faces) => changeDice({ quantity, faces })}
        defaultValue={faces}
      />
      <button onClick={rollDice}>Roll</button>
    </>
  );
};

const Index: NextPage = () => {
  const [state, dispatch] = useReducer(reducer(Math.random), {
    dice: { quantity: 2, faces: 6 } as Dice,
    history: [],
  });
  const { dice, history } = state;
  return (
    <>
      <DiceInput
        changeDice={(dice) => dispatch({ type: "CHANGE_DICE", dice })}
        rollDice={() => dispatch({ type: "ROLL_DICE" })}
        dice={dice}
      />
      <RolledHistorty history={history} />
    </>
  );
};

export default Index;
