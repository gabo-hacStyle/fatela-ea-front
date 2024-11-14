import {create} from 'zustand';

type CardsInfo = {
  cards: string[];
  setCards: (cards: string[]) => void;
};

export const useCardsInfo = create<CardsInfo>((set) => ({
  cards: [],
  setCards: (cards) => set({cards}),
}));