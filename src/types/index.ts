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
  user_id?: string;
  generic_name: string;
  scientific_name?: string;
  type: HerbTypes;
  amount_on_hand?: string;
  amount_type?: AmountTypes;
  expiration_date?: Date | null;
  createdOn: Date;
}

export interface ApiResponse<T> {
  payload: T;
  utils?: any;
  message?: string | undefined;
  error?: string | Error | null;
}

export interface LogInCredentials {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  user_id?: string;
  full_name: string;
  email: string;
  password: string;
  createdOn: Date;
}

export interface JWTPayload {
  exp: number;
  payload: {
    full_name: string;
    user_id: string;
  };
}
// FIXME: Public user is being pulled from somewhere else and causes an issue whn used in ApiResponse.
export interface PublicUser {
  full_name: string;
  user_id?: string;
  token?: string;
}
