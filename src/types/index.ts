export enum HerbTypes {
  WHOLE = 'WHOLE',
  GROUND = 'GROUND',
  POWDER = 'POWDER',
  FLAKE = 'FLAKE',
  FRESH = 'FRESH',
}

export enum AmountTypes {
  BOTTLE = 'BOTTLE',
  POUND = 'POUND',
  OUNCE = 'OUNCE',
  GRAM = 'GRAM',
  KG = 'KG',
}

export interface Herb {
  id?: number;
  generic_name: string;
  scientific_name?: string;
  type: HerbTypes;
  amount_on_hand?: string;
  amount_type?: AmountTypes;
  expiration_date?: Date | null;
  createdOn: Date;
}
