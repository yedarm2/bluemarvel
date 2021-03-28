import { TradableTile } from '@/shared/boardData';
import { GameState } from "@/shared/policy";
import { User } from "@/shared/User";
import { Bank } from "@/shared/Bank";
import { GoldenKey } from '@/shared/goldenKey';

export interface GameInterfaceState {
	prevState: GameState;
	currentState: GameState;
	users: User[];
	bank: Bank;
	currentTurnUser: User | null;
	currentTurnDiceResult: number[];
	selectedTile: TradableTile | null;
}

export interface GoldenKeyState {
	drawedGoldenKey: GoldenKey | null;
}
