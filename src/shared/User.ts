import { BaseTile, startingPointTile } from '@/shared/boardData';

type UserTurnStateKey = 'enableToDrawGoldenCard';
type UserTurnState = {
	[k in UserTurnStateKey]: boolean;
}

export class User {
	id: number;

	remainedMoney = 0;

	items = []; // TODO 현재는 any의 배열이나 추후 황금열쇠 객체가 될 듯.

	currentPositionTile: BaseTile;

	bindingTurnCountOnDesert = 0;

	turnState: UserTurnState = {
		enableToDrawGoldenCard: true,
	};

	constructor(id: number) {
		this.id = id;
		this.currentPositionTile = startingPointTile;
	}

	setPositionTile(tile: BaseTile) {
		this.currentPositionTile = tile;
	}

	setMoney(value: number) {
		this.remainedMoney += value;
	}

	getMoney() {
		return this.remainedMoney;
	}

	payMoney(value: number): number {
		this.remainedMoney -= value;
		return value;
	}

	// setItems(item: any) { // TODO 타입 에러 남 황금열쇠 객체나 타입 만들어지면 주석 해제 필요
	// 	this.items.push(item);
	// }

	useItem(index: number) {
		this.items.splice(index, 1);
	}

	bindOnDesertIsland() {
		const TURN_COUNT_TO_BIND = 3;
		this.bindingTurnCountOnDesert = TURN_COUNT_TO_BIND;
	}

	decreaseBindingTurnCountOnDesert() {
		this.bindingTurnCountOnDesert -= 1;
	}

	resetTurnState() {
		this.turnState = {
			enableToDrawGoldenCard: true,
		};
	};

	setTurnState(turnStateToSet: UserTurnStateKey, value: boolean) {
		this.turnState[turnStateToSet] = value;
	}
}
