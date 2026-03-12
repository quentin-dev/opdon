import { mandatory } from "../helpers";

export enum Player {
    PlayerOne = 0,
    PlayerTwo = 1,
}

export enum ActionType {
    DrawCard = "DRAW_CARD",
}

export enum TurnPhase {
    Refresh = "REFRESH",
    Draw = "DRAW",
    Don = "DON!!",
    Main = "MAIN",
    End = "END",
}

export enum CardStatus {
    Active = "Active",
    Rested = "Rested",
}

export interface CardState {
    id: string;
    donAttached: number;
    status: CardStatus;
}

export interface LeaderCardState {
    donAttached: number;
    status: CardStatus;
}

// TODO: Could add validation to ensure state is valid (10 in total)
export interface DonDeckState {
    total: number;
    attached: number;
    available: number;
    inCostArea: number;
}

export interface PlayerState {
    hand: CardState[];
    deck: CardState[];
    discardPile: CardState[];
    field: CardState[];
    leader: LeaderCardState;
    life: CardState[];
    donDeck: DonDeckState;
}

export interface GameState {
    activePlayer: Player;
    players: Record<Player, PlayerState>;
    turnNumber: number;
    turnPhase: TurnPhase;
}

export class Engine {
    public static initializeGame(): GameState {
        return {
            activePlayer: Player.PlayerOne,
            turnNumber: 0,
            turnPhase: TurnPhase.Refresh,
            players: {
                [Player.PlayerOne]: {
                    hand: [],
                    deck: [{ donAttached: 0, status: CardStatus.Active, id: "ST01-011" }],
                    discardPile: [],
                    field: [],
                    leader: { donAttached: 0, status: CardStatus.Active },
                    life: [],
                    donDeck: { total: 10, attached: 0, available: 0, inCostArea: 0 },
                },
                [Player.PlayerTwo]: {
                    hand: [],
                    deck: [{ donAttached: 0, status: CardStatus.Active, id: "ST01-011" }],
                    discardPile: [],
                    field: [],
                    leader: { donAttached: 0, status: CardStatus.Active },
                    life: [],
                    donDeck: { total: 10, attached: 0, available: 0, inCostArea: 0 },
                },
            },
        };
    }

    // TODO: Test all of this
    public static stepToNextPhase(gameState: GameState): GameState {
        switch (gameState.turnPhase) {
            case TurnPhase.Refresh:
                return { ...Engine.refreshCards(gameState, gameState.activePlayer), turnPhase: TurnPhase.Draw };
            case TurnPhase.Draw:
                return { ...Engine.applyDrawStep(gameState, gameState.activePlayer), turnPhase: TurnPhase.Don };
            case TurnPhase.Don:
                return { ...Engine.distributeDon(gameState, gameState.activePlayer), turnPhase: TurnPhase.Main };
            case TurnPhase.Main:
                return { ...gameState, turnPhase: TurnPhase.End };
            case TurnPhase.End:
                return {
                    ...gameState,
                    turnPhase: TurnPhase.Refresh,
                    turnNumber: gameState.turnNumber + 1,
                    activePlayer: Engine.inactivePlayer(gameState),
                };
        }
        return gameState;
    }

    // Should return GameState + whether there was an error or not
    // Only used during main phase ?
    public static processAction(gameState: GameState, action: ActionType, player: Player): GameState {
        switch (action) {
            case ActionType.DrawCard:
                return Engine.drawCard(gameState, player);
            default:
                // TODO: Unknown
                break;
        }

        return gameState;
    }

    private static refreshCards(gameState: GameState, player: Player): GameState {
        // Reset all attached dons + reset all rested cards to active
        const playerState = gameState.players[player];

        for (const card of playerState.field) {
            card.donAttached = 0;
            card.status = CardStatus.Active;
        }

        playerState.leader.donAttached = 0;
        playerState.leader.status = CardStatus.Active;

        playerState.donDeck.attached = 0;
        playerState.donDeck.inCostArea = playerState.donDeck.available;

        return gameState;
    }

    private static distributeDon(gameState: GameState, player: Player): GameState {
        const playerState = gameState.players[player];

        if (playerState.donDeck.available === 10) return gameState;

        const donsToDistribute = gameState.turnNumber === 0 ? 1 : 2;

        playerState.donDeck.available = Math.min(10, playerState.donDeck.available + donsToDistribute);
        playerState.donDeck.inCostArea = playerState.donDeck.available;

        return gameState;
    }

    private static applyDrawStep(gameState: GameState, player: Player): GameState {
        if (gameState.turnNumber === 0) return gameState;

        return Engine.drawCard(gameState, player);
    }

    private static inactivePlayer(gameState: GameState): Player {
        if (gameState.activePlayer === Player.PlayerOne) {
            return Player.PlayerTwo;
        }
        return Player.PlayerOne;
    }

    private static playCardFromHand(gameState: GameState, player: Player, cardId: string): GameState {
        const playerState = gameState.players[player];

        const cardIndex = playerState.hand.findIndex((card) => card.id === cardId);

        if (cardIndex === -1) {
            throw new Error("Card not found in hand");
        }

        // TODO: Check card effect, cost, etc

        const [playedCard] = playerState.hand.splice(cardIndex, 1);
        playerState.field.push(mandatory(playedCard));

        return gameState;
    }

    private static drawCard(gameState: GameState, player: Player): GameState {
        const playerState = gameState.players[player];

        if (playerState.deck.length === 0) {
            // Probably not the best
            return gameState;
        }

        const drawnCard = playerState.deck.pop();
        if (drawnCard) {
            playerState.hand.push(drawnCard);
        }

        return gameState;
    }
}
