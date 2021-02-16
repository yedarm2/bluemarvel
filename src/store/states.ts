import { GameState } from "@/shared/policy";
import { User } from "@/shared/User";

export interface GameInterfaceState {
	currentState: GameState;
	users: User[];
}
