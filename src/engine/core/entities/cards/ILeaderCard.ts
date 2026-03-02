import { CardAttribute, CardBlock, CardColor, CardRarity, CardType } from "./enums";

export interface ILeaderCard {
    name: string;
    attribute: CardAttribute;
    life: number;
    power: number;
    color: CardColor;
    block: CardBlock;
    types: CardType[];
    cardNumber: string;
    effect: string;
    rarity: CardRarity;
}
