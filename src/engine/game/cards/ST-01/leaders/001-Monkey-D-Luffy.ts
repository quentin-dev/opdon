import { CardAttribute, CardColor, CardBlock, CardType, CardRarity } from "../../../../core/entities/cards/enums";
import { ILeaderCard } from "../../../../core/entities/cards/ILeaderCard";

export class MonkeyDLuffy implements ILeaderCard {
    name = "Monkey.D.Luffy";
    attribute = CardAttribute.Strike;
    life = 5;
    power = 5000;
    color = CardColor.Red;
    block = CardBlock.Block1;
    types = [CardType.Supernovas, CardType.StrawHatCrew];
    cardNumber = "ST-01-001";
    effect = "PLOP";
    rarity = CardRarity.Leader;
}
