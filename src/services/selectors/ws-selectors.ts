import { RootState } from '../types/types-store';

export const feed = (state: RootState) => state.wsFeed.orders;
export const total = (state: RootState) => state.wsFeed.total;
export const totalToday = (state: RootState) => state.wsFeed.totalToday;

export const profileOrders = (state: RootState) =>
  state.wsProfile.profileOrders;
