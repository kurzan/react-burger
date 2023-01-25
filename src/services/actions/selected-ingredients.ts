import { TIngredient } from "../types/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const RESET_INGREDIENTS: 'RESET_INGREDIENTS' = 'RESET_INGREDIENTS';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly key: string;
}

export interface IResetIngredientsAction {
  readonly type: typeof RESET_INGREDIENTS;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly bun: TIngredient;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TSelectedIngredientActions = 
  | IAddIngredientAction
  | IRemoveIngredientAction 
  | IResetIngredientsAction
  | IAddBunAction
  | IMoveIngredientAction;

export const selectIngredient = (ingredient: TIngredient, key: string): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  ingredient: {...ingredient, key}
})

export const selectBun = (bun: TIngredient): IAddBunAction => ({
  type: ADD_BUN,
  bun
})

export const removeIngredient = (key: string): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  key
})

export const moveIngredient = (dragIndex: number, hoverIndex: number) => ({
  type: MOVE_INGREDIENT,
  dragIndex: dragIndex,
  hoverIndex: hoverIndex,
})