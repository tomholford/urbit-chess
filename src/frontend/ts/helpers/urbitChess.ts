import Urbit from '@urbit/http-api'
import { Side, CastleSide, PromotionRole, Result, Action, MoveActionAction, GameID, Rank, File, Ship, ChessAction, ChessChallengeAction, ChessAcceptAction, ChessDeclineAction, ChessGameAction, OfferDrawAction, AcceptDrawAction, DeclineDrawAction, MoveAction, MoveMoveAction, CastleMoveAction, ChangeSpecialDrawPreferenceAction, ClaimSpecialDrawAction, ResignAction } from '../types/urbitChess'

function emptyFunction (): void {}

// Poke and scry functions

export function pokeAction (urbit: Urbit, action: ChessAction, onError?: () => void, onSuccess?: () => void) {
  const pokeInput = {
    app: 'chess',
    mark: 'chess-action',
    json: action,
    onError: (typeof onError !== 'undefined') ? onError : emptyFunction,
    onSuccess: (typeof onSuccess !== 'undefined') ? onSuccess : emptyFunction
  }

  urbit.poke(pokeInput)
}

export function scry (app: string, path: string) {
  const urbit = new Urbit('')
  return urbit.scry({ app: app, path: path })
}

// Pokes

export function challenge (who: Ship, side: Side, description: string) {
  const action: ChessChallengeAction = {
    'chess-action': Action.Challenge,
    'who': who,
    'challenger-side': side,
    'event': description,
    'round': ''
  }

  return action
}

export function acceptGame (who: Ship) {
  const action: ChessAcceptAction = {
    'chess-action': Action.AcceptGame,
    'who': who
  }

  return action
}

export function declineGame (who: Ship) {
  const action: ChessDeclineAction = {
    'chess-action': Action.DeclineGame,
    'who': who
  }

  return action
}

export function changeSpecialDrawPreference (gameId: GameID, setting: boolean): ChangeSpecialDrawPreferenceAction {
  const action: ChangeSpecialDrawPreferenceAction = {
    'chess-action': Action.ChangeSpecialDrawPreference,
    'game-id': gameId,
    'setting': setting
  }

  return action
}

export function move (
  gameId: GameID,
  srcRank: Rank,
  srcFile: File,
  destRank: Rank,
  destFile: File,
  promotion: PromotionRole): MoveMoveAction {
  const move: MoveMoveAction = {
    'chess-action': Action.Move,
    'chess-move': MoveActionAction.Move,
    'game-id': gameId,
    'from-rank': srcRank,
    'from-file': srcFile,
    'to-rank': destRank,
    'to-file': destFile,
    'into': promotion
  }

  return move
}

export function castle (gameId: GameID, side: CastleSide): CastleMoveAction {
  const move: CastleMoveAction = {
    'chess-action': Action.Move,
    'chess-move': MoveActionAction.Castle,
    'game-id': gameId,
    'castle-side': side
  }

  return move
}

export function offerDraw (gameId: GameID): OfferDrawAction {
  const move: OfferDrawAction = {
    'chess-action': Action.OfferDraw,
    'game-id': gameId
  }

  return move
}

export function acceptDraw (gameId: GameID): AcceptDrawAction {
  const move = {
    'chess-action': Action.AcceptDraw,
    'game-id': gameId
  }

  return (move as AcceptDrawAction)
}

export function declineDraw (gameId: GameID): DeclineDrawAction {
  const move: DeclineDrawAction = {
    'chess-action': Action.DeclineDraw,
    'game-id': gameId
  }

  return move
}

export function claimSpecialDraw (gameId: GameID): ClaimSpecialDrawAction {
  const action: ClaimSpecialDrawAction = {
    'chess-action': Action.ClaimSpecialDraw,
    'game-id': gameId
  }

  return action
}

export function resign (gameId: GameID): ResignAction {
  const action: ResignAction = {
    'chess-action': Action.Resign,
    'game-id': gameId
  }

  return action
}

// Scries

export const findFriends = async (app: string, path: string) => {
  const scryOutput: { friends: Array<Ship>} = JSON.parse(JSON.stringify(await scry(app, path), null, 2))
  return scryOutput.friends
}
