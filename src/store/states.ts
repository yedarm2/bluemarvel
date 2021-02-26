import { TradableTile } from '@/shared/boardData';
import { GameState } from "@/shared/policy";
import { User } from "@/shared/User";

export interface GameInterfaceState {
	currentState: GameState;
	users: User[];
	currentTurnUser: User | null;
	currentTurnDiceResult: number[];
	selectedTile: TradableTile | null;
}
