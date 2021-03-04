import {tileMatrix, CityTile, TouristAttractionTile, TradableTile} from '@/shared/boardData';
import {propertyType} from '@/shared/policy';

interface Tiles {
	tile: TradableTile;
	owner: null | number;
	properties: {
		[property in propertyType]: number
	};
}

export class Bank {
	remainedMoney = 900000000;

	allTiles: Tiles[] = [];

	constructor() {
		this.init();
	}

	init() {
		this.setTiles();
	}

	setTiles() {
		tileMatrix.flat().forEach((tile) => {
			if (tile instanceof TradableTile) {
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
		});
	}

	toGiveALoan(value: number) {
		this.remainedMoney -= value;
		return value;
	}

	setMoney(value: number) {
		this.remainedMoney += value;
	}

	sellTilesToUser(tile: TradableTile, id: number) {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile && !this.checkOwnerOfTile(tile, id)) {
			selectedTile.owner = id;
		} else {
			throw new Error('거래가 가능한 타일이 아닙니다.');
		}
	}

	sellProperties(tile: TradableTile, properties: propertyType[]) { // TODO 게임인터페이스 상에서 건물 구매를 구현하며 다듬어야 함.
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile) {
			properties.forEach((property) => {
				selectedTile.properties[property] += 1;
			});
		}
	}

	purchaseTiles(tile: TradableTile): number {
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

	purchaseProperties(tile: TradableTile, properties: propertyType[]): number {
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

	getTilePrice(tile: TradableTile): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (!selectedTile) return 0;
		if (selectedTile.tile instanceof TouristAttractionTile) {
			return selectedTile.tile.price;
		}
		if (selectedTile.tile instanceof CityTile) {
			return selectedTile.tile.buildingPriceInfo.tilePrice;
		}
		return 0;
	}

	getTotalPropertyPrice(tile: TradableTile): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (!selectedTile) return 0;
		if (selectedTile.tile instanceof TouristAttractionTile) {
			return selectedTile.tile.price;
		}
		if (selectedTile.tile instanceof CityTile) {
			const priceOfVilla = selectedTile.properties.VILLA * selectedTile.tile.buildingPriceInfo.villaPrice;
			const priceOfBuilding = selectedTile.properties.BUILDING * selectedTile.tile.buildingPriceInfo.buildingPrice;
			const priceOfHotel = selectedTile.properties.HOTEL * selectedTile.tile.buildingPriceInfo.hotelPrice;
			return priceOfVilla + priceOfBuilding + priceOfHotel + selectedTile.tile.buildingPriceInfo.tilePrice;
		}
		return 0;
	}

	getSpecificPropertyPrice(tile: TradableTile, properties: propertyType[]): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (!selectedTile) return 0;
		if (selectedTile.tile instanceof CityTile) {
			if (properties.length > 0) {
				const t = selectedTile.tile as CityTile;
				/* eslint-disable no-param-reassign */
				return properties.reduce((prev, curr) => {
					switch (curr) {
						case propertyType.VILLA:
							prev += t.buildingPriceInfo.villaPrice;
							break;

						case propertyType.BUILDING:
							prev += t.buildingPriceInfo.buildingPrice;
							break;

						case propertyType.HOTEL:
							prev += t.buildingPriceInfo.hotelPrice;
							break;
						default:
							break;
					}
					return prev;
				}, 0);
				/* eslint-enable no-param-reassign */
			}
			return 0;
		}
		return 0;
	}

	getTolls(tile: TradableTile): number {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (!selectedTile) return 0;
		if (selectedTile.tile instanceof CityTile) {
			const priceOfVilla = selectedTile.properties.VILLA * selectedTile.tile.paymentInfo.villaPrice;
			const priceOfBuilding = selectedTile.properties.BUILDING * selectedTile.tile.paymentInfo.buildingPrice;
			const priceOfHotel = selectedTile.properties.HOTEL * selectedTile.tile.paymentInfo.hotelPrice;
			const totalPrice = priceOfVilla + priceOfBuilding + priceOfHotel;

			return totalPrice === 0 ? selectedTile.tile.paymentInfo.tilePrice : totalPrice;
		}
		if (selectedTile.tile instanceof TouristAttractionTile) {
			return selectedTile.tile.payment;
		}
		return 0;
	}

	checkOwnerOfTile(tile: TradableTile, id: number): boolean {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile) {
			return selectedTile.owner === id;
		}
		return false;
	}

	checkOwnerHasProperties(tile: TradableTile, id: number): boolean {
		const selectedTile = this.allTiles.find((t) => t.tile.id === tile.id);
		if (selectedTile) {
			if (selectedTile.owner === id) {
				const keys = Object.keys(selectedTile.properties) as propertyType[];
				return keys.some((key) => selectedTile.properties[key] > 0);
			}
			return false;
		}
		return false;
	}

	checkUserHasTile(id: number): boolean {
		return this.allTiles.some((t) => t.owner === id);
	}

	checkUserHasProperties(id: number): boolean {
		const isUserHasTile = this.checkUserHasTile(id);
		return isUserHasTile && this.allTiles.some((t) => t.properties.HOTEL + t.properties.BUILDING + t.properties.VILLA > 0);
	}
}
