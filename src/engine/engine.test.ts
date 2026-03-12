import { expect, test } from "bun:test";
import { ActionType, CardStatus, Engine, Player, TurnPhase } from ".";

test("Engine - initializes game state correctly", () => {
    const gameState = Engine.initializeGame();

    expect(gameState.turnNumber).toBe(0);
    expect(gameState.turnPhase).toBe(TurnPhase.Refresh);

    expect(gameState.activePlayer).toBe(Player.PlayerOne);
    expect(gameState.players[Player.PlayerOne].hand).toEqual([]);
    expect(gameState.players[Player.PlayerOne].deck).toEqual([
        { donAttached: 0, status: CardStatus.Active, id: "ST01-011" },
    ]);
    expect(gameState.players[Player.PlayerOne].discardPile).toEqual([]);
    expect(gameState.players[Player.PlayerOne].field).toEqual([]);
    expect(gameState.players[Player.PlayerOne].leader).toEqual({ donAttached: 0, status: CardStatus.Active });
    expect(gameState.players[Player.PlayerOne].life).toEqual([]);

    expect(gameState.players[Player.PlayerTwo].hand).toEqual([]);
    expect(gameState.players[Player.PlayerTwo].deck).toEqual([
        { donAttached: 0, status: CardStatus.Active, id: "ST01-011" },
    ]);
    expect(gameState.players[Player.PlayerTwo].discardPile).toEqual([]);
    expect(gameState.players[Player.PlayerTwo].field).toEqual([]);
    expect(gameState.players[Player.PlayerTwo].leader).toEqual({ donAttached: 0, status: CardStatus.Active });
    expect(gameState.players[Player.PlayerTwo].life).toEqual([]);
});

test("Engine - processes draw card action correctly", () => {
    const gameState = Engine.initializeGame();

    const afterDrawState = Engine.processAction(gameState, ActionType.DrawCard, Player.PlayerOne);

    expect(afterDrawState.players[Player.PlayerOne].hand).toEqual([
        { donAttached: 0, status: CardStatus.Active, id: "ST01-011" },
    ]);
    expect(afterDrawState.players[Player.PlayerOne].deck).toEqual([]);
});

test("Engine - steps through phases correctly", () => {
    let gameState = Engine.initializeGame();

    expect(gameState.activePlayer).toBe(Player.PlayerOne);
    expect(gameState.turnPhase).toBe(TurnPhase.Refresh);
    expect(gameState.turnNumber).toBe(0);

    gameState = Engine.stepToNextPhase(gameState);

    expect(gameState.turnPhase).toBe(TurnPhase.Draw);

    gameState = Engine.stepToNextPhase(gameState);

    expect(gameState.turnPhase).toBe(TurnPhase.Don);

    gameState = Engine.stepToNextPhase(gameState);

    expect(gameState.turnPhase).toBe(TurnPhase.Main);

    gameState = Engine.stepToNextPhase(gameState);

    expect(gameState.turnPhase).toBe(TurnPhase.End);

    gameState = Engine.stepToNextPhase(gameState);

    expect(gameState.activePlayer).toBe(Player.PlayerTwo);
    expect(gameState.turnPhase).toBe(TurnPhase.Refresh);
    expect(gameState.turnNumber).toBe(1);
});
