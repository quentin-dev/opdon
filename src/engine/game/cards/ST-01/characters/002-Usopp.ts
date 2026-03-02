import { ICharacterCard } from "../../../../core/entities/cards/ICharacterCard";

import { CardAttribute, CardBlock, CardColor, CardRarity, CardType } from "../../../../core/entities/cards/enums";

export class Usopp implements ICharacterCard {
    name = "Usopp";
    attribute = CardAttribute.Ranged;
    cost = 2;
    power = 2000;
    counter = 1000;
    color = CardColor.Red;
    block = CardBlock.Block1;
    types = [CardType.StrawHatCrew];
    cardNumber = "ST-01-002";
    effect = "Don x2";
    triggerEffect = "Play this card.";
    rarity = CardRarity.Common;
}
