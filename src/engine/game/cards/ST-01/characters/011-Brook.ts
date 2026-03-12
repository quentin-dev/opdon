import type { ICharacterCard, CardEffect } from "../../../../core/entities/cards/ICharacterCard";
import { CardEffectTrigger } from "../../../../core/entities/cards/ICharacterCard";

import { CardAttribute, CardBlock, CardColor, CardRarity, CardType } from "../../../../core/entities/cards/enums";

export class Brook implements ICharacterCard {
    name = "Brook";
    attribute = CardAttribute.Slash;
    cost = 2;
    power = 3000;
    counter = 2000;
    color = CardColor.Red;
    block = CardBlock.Block1;
    types = [CardType.StrawHatCrew];
    cardNumber = "ST-01-011";
    effect = {
        description: "[On Play] Give up to 2 rested DON!! cards to your leader or 1 of your Characters",
        trigger: CardEffectTrigger.OnPlay,
        targets: "Your leader or 1 of your Characters",
        impl: (_gameState) => {
            console.log("Loul");
        },
    } as CardEffect;
    triggerEffect = "None";
    rarity = CardRarity.Common;
}
