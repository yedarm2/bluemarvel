export enum TileType {
	STARTING_POINT,
	CITY,
	SPECIAL_AREA,
	GOLDEN_KEY,
	DESERT_ISLAND,
	GET_WELFARE,
	PAY_WELFARE,
	SPACE_TRAVEL,
}

export class BaseTile {
	constructor(public type: TileType) {}
}

export class GoldenKey extends BaseTile {
	constructor(public number: number) {
		super(TileType.GOLDEN_KEY);
	}
}

export class TradableArea extends BaseTile {
	constructor(
		type: TileType.CITY | TileType.SPECIAL_AREA,
		public id: TradableAreaIdEnum,
		public name: string,
		public description: string,
	) {
		super(type);
	}

	get englishName() {
		return this.id as string;
	}
}

export class CityArea extends TradableArea {
	constructor(
		id: TradableAreaIdEnum,
		name: string,
		description: string,
		public buildingPriceInfo: PriceInfo,
		public paymentInfo: PriceInfo,
	) {
		super(TileType.CITY, id, name, description);
	}
}

export class SpecialArea extends TradableArea {
	constructor(
		id: TradableAreaIdEnum,
		name: string,
		description: string,
		public price: number,
		public payment: number,
	) {
		super(TileType.SPECIAL_AREA, id, name, description);
	}
}

export enum TradableAreaIdEnum {
	TAIPEI = 'TAIPEI',
	BEIJING = 'BEIJING',
	MANILA = 'MANILA',
	JEJU_ISLAND = 'JEJU ISLAND',
	SINGAPORE = 'SINGAPORE',
	CAIRO = 'CAIRO',
	ISTANBUL = 'ISTANBUL',
	ATHENES = 'ATHENES',
	COPENHAGEN = 'COPENHAGEN',
	STOCKHOLM = 'STOCKHOLM',
	CONCORDE = 'CONCORDE',
	BERN = 'BERN',
	BERLIN = 'BERLIN',
	OTAWA = 'OTAWA',
	BUENOSAIRES = 'BUENOSAIRES',
	SAO_PAULO = 'SAO PAULO',
	SYDNEY = 'SYDNEY',
	BUSAN = 'BUSAN',
	HAWAII = 'HAWAII',
	LISBON = 'LISBON',
	QUEEN_ELIZABETH = 'QUEEN ELIZABETH',
	MADRID = 'MADRID',
	TOKYO = 'TOKYO',
	COLUMBIA = 'COLUMBIA',
	PARIS = 'PARIS',
	ROME = 'ROME',
	LONDON = 'LONDON',
	NEW_YORK = 'NEW YORK',
	SEOUL = 'SEOUL',
}

export interface PriceInfo {
	areaPrice: number;
	villaPrice: number;
	buildingPrice: number;
	hotelPrice: number;
}

export const cityAreaMap: Map<TradableAreaIdEnum, CityArea> = new Map([
	[
		TradableAreaIdEnum.TAIPEI,
		new CityArea(
			TradableAreaIdEnum.BEIJING,
			'타이페이',
			'타이완(대만)의 수도',
			{
				areaPrice: 50000,
				villaPrice: 50000,
				buildingPrice: 150000,
				hotelPrice: 250000,
			},
			{
				areaPrice: 2000,
				villaPrice: 50000,
				buildingPrice: 90000,
				hotelPrice: 250000,
			},
		),
	],
	[
		TradableAreaIdEnum.BEIJING,
		new CityArea(
			TradableAreaIdEnum.BEIJING,
			'베이징',
			'중국의 수도',
			{
				areaPrice: 80000,
				villaPrice: 50000,
				buildingPrice: 150000,
				hotelPrice: 250000,
			},
			{
				areaPrice: 4000,
				villaPrice: 50000,
				buildingPrice: 180000,
				hotelPrice: 450000,
			},
		),
	],
	[
		TradableAreaIdEnum.MANILA,
		new CityArea(
			TradableAreaIdEnum.MANILA,
			'마닐라',
			'필리핀의 수도',
			{
				areaPrice: 80000,
				villaPrice: 50000,
				buildingPrice: 150000,
				hotelPrice: 250000,
			},
			{
				areaPrice: 4000,
				villaPrice: 50000,
				buildingPrice: 180000,
				hotelPrice: 250000,
			},
		),
	],
	[
		TradableAreaIdEnum.SINGAPORE,
		new CityArea(
			TradableAreaIdEnum.SINGAPORE,
			'싱가포르',
			'싱가포르의 수도',
			{
				areaPrice: 100000,
				villaPrice: 50000,
				buildingPrice: 150000,
				hotelPrice: 250000,
			},
			{
				areaPrice: 6000,
				villaPrice: 50000,
				buildingPrice: 270000,
				hotelPrice: 550000,
			},
		),
	],
	[
		TradableAreaIdEnum.CAIRO,
		new CityArea(
			TradableAreaIdEnum.CAIRO,
			'카이로',
			'이집트의 수도',
			{
				areaPrice: 100000,
				villaPrice: 50000,
				buildingPrice: 150000,
				hotelPrice: 250000,
			},
			{
				areaPrice: 6000,
				villaPrice: 50000,
				buildingPrice: 270000,
				hotelPrice: 550000,
			},
		),
	],
	[
		TradableAreaIdEnum.ISTANBUL,
		new CityArea(
			TradableAreaIdEnum.ISTANBUL,
			'이스탄불',
			'동서양의 교차로',
			{
				areaPrice: 100000,
				villaPrice: 50000,
				buildingPrice: 150000,
				hotelPrice: 250000,
			},
			{
				areaPrice: 8000,
				villaPrice: 50000,
				buildingPrice: 300000,
				hotelPrice: 600000,
			},
		),
	],
	[
		TradableAreaIdEnum.ATHENES,
		new CityArea(
			TradableAreaIdEnum.ATHENES,
			'아테네',
			'그리스의 수도',
			{
				areaPrice: 140000,
				villaPrice: 100000,
				buildingPrice: 300000,
				hotelPrice: 500000,
			},
			{
				areaPrice: 10000,
				villaPrice: 100000,
				buildingPrice: 450000,
				hotelPrice: 750000,
			},
		),
	],
	[
		TradableAreaIdEnum.COPENHAGEN,
		new CityArea(
			TradableAreaIdEnum.COPENHAGEN,
			'코펜하겐',
			'덴마크의 수도',
			{
				areaPrice: 160000,
				villaPrice: 100000,
				buildingPrice: 300000,
				hotelPrice: 500000,
			},
			{
				areaPrice: 12000,
				villaPrice: 100000,
				buildingPrice: 500000,
				hotelPrice: 900000,
			},
		),
	],
	[
		TradableAreaIdEnum.STOCKHOLM,
		new CityArea(
			TradableAreaIdEnum.STOCKHOLM,
			'스톡홀름',
			'스웨덴의 수도',
			{
				areaPrice: 160000,
				villaPrice: 100000,
				buildingPrice: 300000,
				hotelPrice: 500000,
			},
			{
				areaPrice: 12000,
				villaPrice: 100000,
				buildingPrice: 500000,
				hotelPrice: 900000,
			},
		),
	],
	[
		TradableAreaIdEnum.BERN,
		new CityArea(
			TradableAreaIdEnum.BERN,
			'베른',
			'스위스의 수도',
			{
				areaPrice: 180000,
				villaPrice: 100000,
				buildingPrice: 300000,
				hotelPrice: 500000,
			},
			{
				areaPrice: 14000,
				villaPrice: 100000,
				buildingPrice: 550000,
				hotelPrice: 950000,
			},
		),
	],
	[
		TradableAreaIdEnum.BERLIN,
		new CityArea(
			TradableAreaIdEnum.BERLIN,
			'베를린',
			'독일의 수도',
			{
				areaPrice: 180000,
				villaPrice: 100000,
				buildingPrice: 300000,
				hotelPrice: 500000,
			},
			{
				areaPrice: 14000,
				villaPrice: 100000,
				buildingPrice: 550000,
				hotelPrice: 950000,
			},
		),
	],
	[
		TradableAreaIdEnum.OTAWA,
		new CityArea(
			TradableAreaIdEnum.OTAWA,
			'오타와',
			'캐나다의 수도',
			{
				areaPrice: 200000,
				villaPrice: 100000,
				buildingPrice: 300000,
				hotelPrice: 500000,
			},
			{
				areaPrice: 16000,
				villaPrice: 100000,
				buildingPrice: 600000,
				hotelPrice: 1000000,
			},
		),
	],
	[
		TradableAreaIdEnum.BUENOSAIRES,
		new CityArea(
			TradableAreaIdEnum.BUENOSAIRES,
			'부에노스 아이레스',
			'아르헨티나의 수도',
			{
				areaPrice: 220000,
				villaPrice: 150000,
				buildingPrice: 450000,
				hotelPrice: 750000,
			},
			{
				areaPrice: 10000,
				villaPrice: 150000,
				buildingPrice: 750000,
				hotelPrice: 1100000,
			},
		),
	],
	[
		TradableAreaIdEnum.SAO_PAULO,
		new CityArea(
			TradableAreaIdEnum.SAO_PAULO,
			'상파울로',
			'브라질의 수도',
			{
				areaPrice: 240000,
				villaPrice: 150000,
				buildingPrice: 450000,
				hotelPrice: 750000,
			},
			{
				areaPrice: 20000,
				villaPrice: 150000,
				buildingPrice: 750000,
				hotelPrice: 1100000,
			},
		),
	],
	[
		TradableAreaIdEnum.SYDNEY,
		new CityArea(
			TradableAreaIdEnum.SYDNEY,
			'시드니',
			'호주의 수도',
			{
				areaPrice: 240000,
				villaPrice: 150000,
				buildingPrice: 450000,
				hotelPrice: 750000,
			},
			{
				areaPrice: 20000,
				villaPrice: 150000,
				buildingPrice: 750000,
				hotelPrice: 1100000,
			},
		),
	],
	[
		TradableAreaIdEnum.HAWAII,
		new CityArea(
			TradableAreaIdEnum.HAWAII,
			'하와이',
			'미국의 휴양지',
			{
				areaPrice: 260000,
				villaPrice: 150000,
				buildingPrice: 450000,
				hotelPrice: 750000,
			},
			{
				areaPrice: 22000,
				villaPrice: 150000,
				buildingPrice: 800000,
				hotelPrice: 1150000,
			},
		),
	],
	[
		TradableAreaIdEnum.LISBON,
		new CityArea(
			TradableAreaIdEnum.LISBON,
			'리스본',
			'포르투갈의 수도',
			{
				areaPrice: 260000,
				villaPrice: 150000,
				buildingPrice: 450000,
				hotelPrice: 750000,
			},
			{
				areaPrice: 24000,
				villaPrice: 150000,
				buildingPrice: 850000,
				hotelPrice: 1200000,
			},
		),
	],
	[
		TradableAreaIdEnum.MADRID,
		new CityArea(
			TradableAreaIdEnum.MADRID,
			'마드리드',
			'스페인의 수도',
			{
				areaPrice: 280000,
				villaPrice: 150000,
				buildingPrice: 450000,
				hotelPrice: 750000,
			},
			{
				areaPrice: 24000,
				villaPrice: 150000,
				buildingPrice: 850000,
				hotelPrice: 1200000,
			},
		),
	],
	[
		TradableAreaIdEnum.TOKYO,
		new CityArea(
			TradableAreaIdEnum.TOKYO,
			'도쿄',
			'일본의 수도',
			{
				areaPrice: 300000,
				villaPrice: 200000,
				buildingPrice: 600000,
				hotelPrice: 1000000,
			},
			{
				areaPrice: 26000,
				villaPrice: 200000,
				buildingPrice: 900000,
				hotelPrice: 1270000,
			},
		),
	],
	[
		TradableAreaIdEnum.PARIS,
		new CityArea(
			TradableAreaIdEnum.PARIS,
			'파리',
			'프랑스의 수도',
			{
				areaPrice: 320000,
				villaPrice: 200000,
				buildingPrice: 600000,
				hotelPrice: 1000000,
			},
			{
				areaPrice: 28000,
				villaPrice: 200000,
				buildingPrice: 1000000,
				hotelPrice: 1270000,
			},
		),
	],
	[
		TradableAreaIdEnum.ROME,
		new CityArea(
			TradableAreaIdEnum.ROME,
			'로마',
			'이탈리아의 수도',
			{
				areaPrice: 320000,
				villaPrice: 200000,
				buildingPrice: 600000,
				hotelPrice: 1000000,
			},
			{
				areaPrice: 28000,
				villaPrice: 200000,
				buildingPrice: 1000000,
				hotelPrice: 1400000,
			},
		),
	],
	[
		TradableAreaIdEnum.LONDON,
		new CityArea(
			TradableAreaIdEnum.LONDON,
			'런던',
			'영국의 수도',
			{
				areaPrice: 350000,
				villaPrice: 200000,
				buildingPrice: 600000,
				hotelPrice: 1000000,
			},
			{
				areaPrice: 35000,
				villaPrice: 200000,
				buildingPrice: 1100000,
				hotelPrice: 1500000,
			},
		),
	],
	[
		TradableAreaIdEnum.NEW_YORK,
		new CityArea(
			TradableAreaIdEnum.NEW_YORK,
			'뉴욕',
			'미국 최대의 도시',
			{
				areaPrice: 350000,
				villaPrice: 200000,
				buildingPrice: 600000,
				hotelPrice: 1000000,
			},
			{
				areaPrice: 35000,
				villaPrice: 200000,
				buildingPrice: 1100000,
				hotelPrice: 1500000,
			},
		),
	],
]);

export const specialAreaMap: Map<TradableAreaIdEnum, SpecialArea> = new Map([
	[
		TradableAreaIdEnum.JEJU_ISLAND,
		new SpecialArea(
			TradableAreaIdEnum.JEJU_ISLAND,
			'제주',
			'대한민국의 휴양지',
			200000,
			300000,
		),
	],
	[
		TradableAreaIdEnum.CONCORDE,
		new SpecialArea(
			TradableAreaIdEnum.CONCORDE,
			'콩코드여객기',
			'초음속여객기',
			200000,
			300000,
		),
	],
	[
		TradableAreaIdEnum.BUSAN,
		new SpecialArea(
			TradableAreaIdEnum.BUSAN,
			'부산',
			'대한민국의 제1의 항구도시',
			500000,
			600000,
		),
	],
	[
		TradableAreaIdEnum.QUEEN_ELIZABETH,
		new SpecialArea(
			TradableAreaIdEnum.QUEEN_ELIZABETH,
			'퀸 엘리자베스호',
			'호화 여객선',
			300000,
			250000,
		),
	],
	[
		TradableAreaIdEnum.COLUMBIA,
		new SpecialArea(
			TradableAreaIdEnum.COLUMBIA,
			'컬럼비아호',
			'유인 우주 왕복선',
			450000,
			400000,
		),
	],
	[
		TradableAreaIdEnum.SEOUL,
		new SpecialArea(
			TradableAreaIdEnum.SEOUL,
			'서울',
			'대한민국의 수도',
			1000000,
			2000000,
		),
	],
]);

export const boardMatrix: BaseTile[][] = [
	[
		new BaseTile(TileType.STARTING_POINT),
		cityAreaMap.get(TradableAreaIdEnum.TAIPEI) as CityArea,
		new GoldenKey(1),
		cityAreaMap.get(TradableAreaIdEnum.BEIJING) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.MANILA) as CityArea,
		specialAreaMap.get(TradableAreaIdEnum.JEJU_ISLAND) as SpecialArea,
		cityAreaMap.get(TradableAreaIdEnum.SINGAPORE) as CityArea,
		new GoldenKey(2),
		cityAreaMap.get(TradableAreaIdEnum.CAIRO) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.ISTANBUL) as CityArea,
	],
	[
		new BaseTile(TileType.DESERT_ISLAND),
		cityAreaMap.get(TradableAreaIdEnum.ATHENES) as CityArea,
		new GoldenKey(3),
		cityAreaMap.get(TradableAreaIdEnum.COPENHAGEN) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.STOCKHOLM) as CityArea,
		specialAreaMap.get(TradableAreaIdEnum.CONCORDE) as SpecialArea,
		cityAreaMap.get(TradableAreaIdEnum.BERN) as CityArea,
		new GoldenKey(4),
		cityAreaMap.get(TradableAreaIdEnum.BERLIN) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.OTAWA) as CityArea,
	],
	[
		new BaseTile(TileType.GET_WELFARE),
		cityAreaMap.get(TradableAreaIdEnum.BUENOSAIRES) as CityArea,
		new GoldenKey(5),
		cityAreaMap.get(TradableAreaIdEnum.SAO_PAULO) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.SYDNEY) as CityArea,
		specialAreaMap.get(TradableAreaIdEnum.BUSAN) as SpecialArea,
		cityAreaMap.get(TradableAreaIdEnum.HAWAII) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.LISBON) as CityArea,
		specialAreaMap.get(TradableAreaIdEnum.QUEEN_ELIZABETH) as SpecialArea,
		cityAreaMap.get(TradableAreaIdEnum.MADRID) as CityArea,
	],
	[
		new BaseTile(TileType.SPACE_TRAVEL),
		cityAreaMap.get(TradableAreaIdEnum.TOKYO) as CityArea,
		specialAreaMap.get(TradableAreaIdEnum.COLUMBIA) as SpecialArea,
		cityAreaMap.get(TradableAreaIdEnum.PARIS) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.ROME) as CityArea,
		new GoldenKey(6),
		cityAreaMap.get(TradableAreaIdEnum.LONDON) as CityArea,
		cityAreaMap.get(TradableAreaIdEnum.NEW_YORK) as CityArea,
		new BaseTile(TileType.GET_WELFARE),
		specialAreaMap.get(TradableAreaIdEnum.SEOUL) as SpecialArea,
	],
];
