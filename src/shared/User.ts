import { CityArea, SpecialArea, TradableAreaIdEnum } from '@/shared/boardData';
import { propertyType } from '@/shared/policy';

type tradableArea = CityArea | SpecialArea;
type propertySkeleton = {
	tile: tradableArea;
	properties: {
		[property in propertyType]: number
	};
}
type tileSkeleton = {
	[id in TradableAreaIdEnum]?: propertySkeleton;
};

export class User {
	id: number;

	remainedMoney = 0;

	items = []; // TODO 현재는 any의 배열이나 추후 황금열쇠 객체가 될 듯.

	tiles: tileSkeleton = {};

	constructor(id: number) {
		this.id = id;
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

	setTiles(tile: tradableArea) {
		this.tiles[tile.id] = {
			tile,
			properties: {
				[propertyType.VILLA]: 0,
				[propertyType.BUILDING]: 0,
				[propertyType.HOTEL]: 0,
			}
		};
	}

	sellTiles(tile: tradableArea) {
		delete this.tiles[tile.id];
	}

	setProperties(tile: tradableArea, property: propertyType) {
		const selectedTile = this.tiles[tile.id];
		if (selectedTile) {
			selectedTile.properties[property] += 1;
		}
	}

	getTotalPropertyPrice(tile: tradableArea): number {
		const selectedTile = this.tiles[tile.id];
		if (!selectedTile) return 0;
		if (!(selectedTile.tile instanceof SpecialArea)) {
			const priceOfVilla = selectedTile.properties.VILLA * selectedTile.tile.buildingPriceInfo.villaPrice;
			const priceOfBuilding = selectedTile.properties.BUILDING * selectedTile.tile.buildingPriceInfo.buildingPrice;
			const priceOfHotel = selectedTile.properties.HOTEL * selectedTile.tile.buildingPriceInfo.hotelPrice;
			const totalPrice = priceOfVilla + priceOfBuilding + priceOfHotel + selectedTile.tile.buildingPriceInfo.areaPrice;

			return totalPrice === 0 ? selectedTile.tile.buildingPriceInfo.areaPrice : totalPrice;
		}
		return selectedTile.tile.price;
	}

	getSpecificPropertyPrice(tile: tradableArea, properties: Array<propertyType>): number {
		const selectedTile = this.tiles[tile.id];
		if (!selectedTile) return 0;
		if (!(selectedTile.tile instanceof SpecialArea)) {
			if (properties.length > 0) {
				/* eslint-disable no-param-reassign */
				return properties.reduce((prev, curr) => {
					switch (curr) {
						case propertyType.VILLA:
							prev += selectedTile.tile instanceof CityArea ? selectedTile.tile.buildingPriceInfo.villaPrice : 0;
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
		return selectedTile.tile.price;
	}

	getTolls(tile: tradableArea): number {
		const selectedTile = this.tiles[tile.id];
		if (!selectedTile) return 0;
		if (!(selectedTile.tile instanceof SpecialArea)) {
			const priceOfVilla = selectedTile.properties.VILLA * selectedTile.tile.paymentInfo.villaPrice;
			const priceOfBuilding = selectedTile.properties.BUILDING * selectedTile.tile.paymentInfo.buildingPrice;
			const priceOfHotel = selectedTile.properties.HOTEL * selectedTile.tile.paymentInfo.hotelPrice;
			const totalPrice = priceOfVilla + priceOfBuilding + priceOfHotel;

			return totalPrice === 0 ? selectedTile.tile.paymentInfo.areaPrice : totalPrice;
		}
		return selectedTile.tile.payment;
	}

}
