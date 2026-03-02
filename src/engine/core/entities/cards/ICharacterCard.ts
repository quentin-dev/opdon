import { CardAttribute, CardBlock, CardColor, CardRarity, CardType } from "./enums";

export interface ICharacterCard {
    name: string;
    attribute: CardAttribute;
    cost: number;
    power: number;
    counter: number;
    color: CardColor;
    block: CardBlock;
    types: CardType[];
    cardNumber: string;
    effect: string;
    triggerEffect: string;
    rarity: CardRarity;
}
