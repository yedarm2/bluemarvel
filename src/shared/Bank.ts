import {boardMatrix, CityArea, SpecialArea, TradableArea} from '@/shared/boardData';
import {propertyType} from '@/shared/policy';

interface Tiles {
	tile: TradableArea;
	owner: null | number;
	properties: {
		[property in propertyType]: number
	};
}

export class Bank {
	remainedMoney = 900000000;

	allTiles: Tiles[] = [];

	// eslint-disable-next-line no-useless-constructor
	constructor() {
		this.init();
	}

	init() {
		this.setTiles();
	}

	setTiles() {
		boardMatrix.forEach((area) => {
			area.forEach((tile) => {
				if (tile instanceof TradableArea) {
					this.allTiles.push({
						tile,
						owner: null,
						properties: {
							[propertyType.VILLA]: 0,
							[propertyType.BUILDING]: 0,
							[propertyType.HOTEL]: 0,
						}
					});
				}
			})
		});
	}

	toGiveALoan(value: number) {
		this.remainedMoney -= value;
		return value;
	}

	setMoney(value: number) {
		this.remainedMoney += value;
	}

	sellTilesToUser(tile: TradableArea, id: number) {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile) {
			selectedTile.owner = id;
		} else {
			throw new Error('거래가 가능한 타일이 아닙니다.');
		}
	}

	sellProperties(tile: TradableArea, properties: propertyType[]) { // TODO 게임인터페이스 상에서 건물 구매를 구현하며 다듬어야 함.
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile) {
			properties.forEach((property) => {
				selectedTile.properties[property] += 1;
			});
		}
	}

	purchaseTiles(tile: TradableArea): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile) {
			selectedTile.owner = null;
			selectedTile.properties = {
				[propertyType.VILLA]: 0,
				[propertyType.BUILDING]: 0,
				[propertyType.HOTEL]: 0,
			};
		} else {
			throw new Error('타일에 주인이 없습니다.');
		}
		return this.getTotalPropertyPrice(tile);
	}

	purchaseProperties(tile: TradableArea, properties: propertyType[]): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile) {
			properties.forEach((property) => {
				selectedTile.properties[property] = 0; // 일단은 전부 매각으로..
			});
		} else {
			throw new Error('타일에 건물이 없습니다.');
		}
		return this.getSpecificPropertyPrice(tile, properties);
	}

	getTotalPropertyPrice(tile: TradableArea): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (!selectedTile) return 0;
		if (selectedTile.tile instanceof SpecialArea) {
			return selectedTile.tile.price;
		}
		if (selectedTile.tile instanceof CityArea) {
			const priceOfVilla = selectedTile.properties.VILLA * selectedTile.tile.buildingPriceInfo.villaPrice;
			const priceOfBuilding = selectedTile.properties.BUILDING * selectedTile.tile.buildingPriceInfo.buildingPrice;
			const priceOfHotel = selectedTile.properties.HOTEL * selectedTile.tile.buildingPriceInfo.hotelPrice;
			const totalPrice = priceOfVilla + priceOfBuilding + priceOfHotel + selectedTile.tile.buildingPriceInfo.areaPrice;

			return totalPrice === 0 ? selectedTile.tile.buildingPriceInfo.areaPrice : totalPrice;
		}
		return 0;
	}

	getSpecificPropertyPrice(tile: TradableArea, properties: propertyType[]): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (!selectedTile) return 0;
		if (selectedTile.tile instanceof SpecialArea) {
			return selectedTile.tile.price;
		}
		if (selectedTile.tile instanceof CityArea) {
			if (properties.length > 0) {
				/* eslint-disable no-param-reassign */
				return properties.reduce((prev, curr) => {
					switch (curr) {
						case propertyType.VILLA:
							prev += selectedTile.tile instanceof CityArea ? selectedTile.tile.buildingPriceInfo.villaPrice : 0; // 새로운 블록스코프에 들어와서 그런지... 타입 검사를 다시 해야함...
							break;

						case propertyType.BUILDING:
							prev += selectedTile.tile instanceof CityArea ? selectedTile.tile.buildingPriceInfo.buildingPrice : 0;
							break;

						case propertyType.HOTEL:
							prev += selectedTile.tile instanceof CityArea ? selectedTile.tile.buildingPriceInfo.hotelPrice : 0;
							break;
						default:
							break;
					}
					return prev;
				}, 0);
				/* eslint-enable no-param-reassign */
			}
			return selectedTile.tile.buildingPriceInfo.areaPrice;
		}
		return 0;
	}

	getTolls(tile: TradableArea): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (!selectedTile) return 0;
		if (selectedTile.tile instanceof CityArea) {
			const priceOfVilla = selectedTile.properties.VILLA * selectedTile.tile.paymentInfo.villaPrice;
			const priceOfBuilding = selectedTile.properties.BUILDING * selectedTile.tile.paymentInfo.buildingPrice;
			const priceOfHotel = selectedTile.properties.HOTEL * selectedTile.tile.paymentInfo.hotelPrice;
			const totalPrice = priceOfVilla + priceOfBuilding + priceOfHotel;

			return totalPrice === 0 ? selectedTile.tile.paymentInfo.areaPrice : totalPrice;
		}
		if (selectedTile.tile instanceof SpecialArea) {
			return selectedTile.tile.payment;
		}
		return 0;
	}
}
