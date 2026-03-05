import { expect, test } from "bun:test";
import { ActionType, CardStatus, Engine, Player, TurnPhase } from ".";

test("Engine - initializes game state correctly", () => {
    const engine = new Engine();
    const gameState = engine.initializeGame();

    expect(gameState.turnNumber).toBe(0);
    expect(gameState.turnPhase).toBe(TurnPhase.Refresh);

    expect(gameState.activePlayer).toBe(Player.PlayerOne);
    expect(gameState.players[Player.PlayerOne].hand).toEqual([]);
    expect(gameState.players[Player.PlayerOne].deck).toEqual([{ donAttached: 0, status: CardStatus.Active }]);
    expect(gameState.players[Player.PlayerOne].discardPile).toEqual([]);
    expect(gameState.players[Player.PlayerOne].field).toEqual([]);
    expect(gameState.players[Player.PlayerOne].leader).toEqual({ donAttached: 0, status: CardStatus.Active });
    expect(gameState.players[Player.PlayerOne].life).toEqual([]);

    expect(gameState.players[Player.PlayerTwo].hand).toEqual([]);
    expect(gameState.players[Player.PlayerTwo].deck).toEqual([{ donAttached: 0, status: CardStatus.Active }]);
    expect(gameState.players[Player.PlayerTwo].discardPile).toEqual([]);
    expect(gameState.players[Player.PlayerTwo].field).toEqual([]);
    expect(gameState.players[Player.PlayerTwo].leader).toEqual({ donAttached: 0, status: CardStatus.Active });
    expect(gameState.players[Player.PlayerTwo].life).toEqual([]);
});

test("Engine - processes draw card action correctly", () => {
    const engine = new Engine();
    const gameState = engine.initializeGame();

    const afterDrawState = engine.processAction(gameState, ActionType.DrawCard, Player.PlayerOne);

    expect(afterDrawState.players[Player.PlayerOne].hand).toEqual([{ donAttached: 0, status: CardStatus.Active }]);
    expect(afterDrawState.players[Player.PlayerOne].deck).toEqual([]);
});
