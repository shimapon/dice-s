export interface Dice {
    readonly quantity: number;
    readonly faces: number;
  }
  
  export interface NormalizedRng {
    (): number; 
  }
  
  export const roll = (
    { quantity, faces }: Dice,
    rng: NormalizedRng,
  ): number[] =>
    [...new Array(quantity)].map(() => Math.floor(rng() * faces + 1));