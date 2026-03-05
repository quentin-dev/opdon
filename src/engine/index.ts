import { Usopp } from "./game/cards/ST-01/characters/002-Usopp";

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

export const characters = {
    "ST-01-002": new Usopp(),
};

export class Engine {
    initializeGame(): GameState {
        return {
            activePlayer: Player.PlayerOne,
            turnNumber: 0,
            turnPhase: TurnPhase.Refresh,
            players: {
                [Player.PlayerOne]: {
                    hand: [],
                    deck: [{ donAttached: 0, status: CardStatus.Active }],
                    discardPile: [],
                    field: [],
                    leader: { donAttached: 0, status: CardStatus.Active },
                    life: [],
                    donDeck: { total: 10, attached: 0, available: 0, inCostArea: 0 },
                },
                [Player.PlayerTwo]: {
                    hand: [],
                    deck: [{ donAttached: 0, status: CardStatus.Active }],
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
    stepToNextPhase(gameState: GameState): GameState {
        switch (gameState.turnPhase) {
            case TurnPhase.Refresh:
                return { ...this.refreshCards(gameState, gameState.activePlayer), turnPhase: TurnPhase.Draw };
            case TurnPhase.Draw:
                return { ...this.applyDrawStep(gameState, gameState.activePlayer), turnPhase: TurnPhase.Don };
            case TurnPhase.Don:
                return { ...this.distributeDon(gameState, gameState.activePlayer), turnPhase: TurnPhase.Main };
            case TurnPhase.Main:
                return { ...gameState, turnPhase: TurnPhase.End };
            case TurnPhase.End:
                return { ...gameState, turnPhase: TurnPhase.Refresh, turnNumber: gameState.turnNumber + 1 };
        }
        return gameState;
    }

    // Should return GameState + whether there was an error or not
    // Only used during main phase ?
    processAction(gameState: GameState, action: ActionType, player: Player): GameState {
        switch (action) {
            case ActionType.DrawCard:
                return this.drawCard(gameState, player);
            default:
                // TODO: Unknown
                break;
        }

        return gameState;
    }

    private refreshCards(gameState: GameState, player: Player): GameState {
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

    private distributeDon(gameState: GameState, player: Player): GameState {
        const playerState = gameState.players[player];

        if (playerState.donDeck.available === 10) return gameState;

        const donsToDistribute = gameState.turnNumber === 0 ? 1 : 2;

        playerState.donDeck.available = Math.min(10, playerState.donDeck.available + donsToDistribute);
        playerState.donDeck.inCostArea = playerState.donDeck.available;

        return gameState;
    }

    private applyDrawStep(gameState: GameState, player: Player): GameState {
        if (gameState.turnNumber === 0) return gameState;

        return this.drawCard(gameState, player);
    }

    private drawCard(gameState: GameState, player: Player): GameState {
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
