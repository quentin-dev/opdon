import { Usopp } from "./game/cards/ST-01/characters/002-Usopp";

export enum Player {
    PlayerOne = 0,
    PlayerTwo = 1,
}

export enum ActionType {
    DrawCard = "DRAW_CARD",
}

export interface Card {
    donAttached: number;
}

export interface PlayerState {
    hand: Card[];
    deck: Card[];
    discardPile: Card[];
    field: Card[];
    leader: Card;
    life: Card[];
    // TODO: Add don ?
}

export interface GameState {
    activePlayer: Player;
    players: Record<Player, PlayerState>;
}

export const characters = {
    "ST-01-002": new Usopp(),
};

export class Engine {
    initializeGame(): GameState {
        return {
            activePlayer: Player.PlayerOne,
            players: {
                [Player.PlayerOne]: {
                    hand: [],
                    deck: [{ donAttached: 0 }],
                    discardPile: [],
                    field: [],
                    leader: { donAttached: 0 },
                    life: [],
                },
                [Player.PlayerTwo]: {
                    hand: [],
                    deck: [{ donAttached: 0 }],
                    discardPile: [],
                    field: [],
                    leader: { donAttached: 0 },
                    life: [],
                },
            },
        };
    }

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
