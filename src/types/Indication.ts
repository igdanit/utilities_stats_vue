import type { IDate } from './Date';

export interface Indication {
  id: string;
  indication: number;
  indicationTypeID: string;
  createdAt: IDate | undefined;
  userID: string;
}

export interface IndicationType {
  id: string;
  addressID: number;
  type: string;
  userID: string;
}