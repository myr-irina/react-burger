export type TIngredientType = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TIngredientTypeWithId = TIngredientType & { id: string };

export type TIngredientPos = {
  [name: string]: number;
};

export type TIngredientsCategory = {
  title: string;
  titleId: string;
  ingredients: TIngredientType[];
  onOpen: () => void;
  onCardClick: () => void;
};


