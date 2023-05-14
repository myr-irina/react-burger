export type Ingredient = {
  id: string | null | undefined;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  _id: string;
};

export type IngredientsCategory = {
  title: string;
  titleId: string;
  ingredients: Ingredient[];
  onOpen: () => void;
  onCardClick: () => void;
};
