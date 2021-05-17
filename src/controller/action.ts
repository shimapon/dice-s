// 画面からロジックへ伝えるメッセージの型

import type { Dice } from "../model/dice";

export type Action = Readonly<{
  type: "ROLL_DICE"; // ダイスを振る
} | {
  type: "CHANGE_DICE"; // CHANGE_DICE
  dice: Dice;
}>;