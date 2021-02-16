export class Bank {
	remainedMoney: number = 900000000;

	constructor() {}

	toGiveALoan(value: number) {
		this.remainedMoney = this.remainedMoney - value;
		return value;
	}

	setMoney(value: number) {
		this.remainedMoney += value;
	}
}
