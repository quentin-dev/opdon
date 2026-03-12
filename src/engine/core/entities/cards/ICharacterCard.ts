import { CardAttribute, CardBlock, CardColor, CardRarity, CardType } from "./enums";

export enum CardEffectTrigger {
    OnPlay = "ON_PLAY",
    OnAttack = "ON_ATTACK",
}

export interface CardEffect {
    description: string;
    trigger: CardEffectTrigger;
    targets: string;
    impl: (gameState: any) => void;
}

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
    effect: CardEffect | null;
    triggerEffect: string;
    rarity: CardRarity;
}
