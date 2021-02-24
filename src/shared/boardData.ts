/* eslint-disable max-classes-per-file */

export enum TileType {
	STARTING_POINT,
	CITY,
	TOURIST_ATTRACTION,
	GOLDEN_KEY,
	DESERT_ISLAND,
	GET_WELFARE,
	PAY_WELFARE,
	SPACE_TRAVEL,
}

export class BaseTile {
	// eslint-disable-next-line no-useless-constructor
	constructor(public type: TileType) {}

	isCornerTile() {
		return [
			TileType.STARTING_POINT,
			TileType.DESERT_ISLAND,
			TileType.GET_WELFARE,
			TileType.SPACE_TRAVEL,
		].includes(this.type);
	}
}

export class GoldenKeyTile extends BaseTile {
	constructor(public number: number) {
		super(TileType.GOLDEN_KEY);
	}
}

export class TradableTile extends BaseTile {
	constructor(
		type: TileType.CITY | TileType.TOURIST_ATTRACTION,
		public id: TradableTileIdEnum,
		public name: string,
		public description: string,
	) {
		super(type);
	}

	get englishName() {
		return this.id as string;
	}
}

export class CityTile extends TradableTile {
	constructor(
		id: TradableTileIdEnum,
		name: string,
		description: string,
		public buildingPriceInfo: PriceInfo,
		public paymentInfo: PriceInfo,
	) {
		super(TileType.CITY, id, name, description);
	}
}

export class TouristAttractionTile extends TradableTile {
	constructor(
		id: TradableTileIdEnum,
		name: string,
		description: string,
		public price: number,
		public payment: number,
	) {
		super(TileType.TOURIST_ATTRACTION, id, name, description);
	}
}

export enum TradableTileIdEnum {
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

export const CityTileMap: Map<TradableTileIdEnum, CityTile> = new Map([
	[
		TradableTileIdEnum.TAIPEI,
		new CityTile(
			TradableTileIdEnum.BEIJING,
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
		TradableTileIdEnum.BEIJING,
		new CityTile(
			TradableTileIdEnum.BEIJING,
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
		TradableTileIdEnum.MANILA,
		new CityTile(
			TradableTileIdEnum.MANILA,
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
		TradableTileIdEnum.SINGAPORE,
		new CityTile(
			TradableTileIdEnum.SINGAPORE,
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
		TradableTileIdEnum.CAIRO,
		new CityTile(
			TradableTileIdEnum.CAIRO,
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
		TradableTileIdEnum.ISTANBUL,
		new CityTile(
			TradableTileIdEnum.ISTANBUL,
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
		TradableTileIdEnum.ATHENES,
		new CityTile(
			TradableTileIdEnum.ATHENES,
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
		TradableTileIdEnum.COPENHAGEN,
		new CityTile(
			TradableTileIdEnum.COPENHAGEN,
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
		TradableTileIdEnum.STOCKHOLM,
		new CityTile(
			TradableTileIdEnum.STOCKHOLM,
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
		TradableTileIdEnum.BERN,
		new CityTile(
			TradableTileIdEnum.BERN,
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
		TradableTileIdEnum.BERLIN,
		new CityTile(
			TradableTileIdEnum.BERLIN,
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
		TradableTileIdEnum.OTAWA,
		new CityTile(
			TradableTileIdEnum.OTAWA,
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
		TradableTileIdEnum.BUENOSAIRES,
		new CityTile(
			TradableTileIdEnum.BUENOSAIRES,
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
		TradableTileIdEnum.SAO_PAULO,
		new CityTile(
			TradableTileIdEnum.SAO_PAULO,
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
		TradableTileIdEnum.SYDNEY,
		new CityTile(
			TradableTileIdEnum.SYDNEY,
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
		TradableTileIdEnum.HAWAII,
		new CityTile(
			TradableTileIdEnum.HAWAII,
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
		TradableTileIdEnum.LISBON,
		new CityTile(
			TradableTileIdEnum.LISBON,
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
		TradableTileIdEnum.MADRID,
		new CityTile(
			TradableTileIdEnum.MADRID,
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
		TradableTileIdEnum.TOKYO,
		new CityTile(
			TradableTileIdEnum.TOKYO,
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
		TradableTileIdEnum.PARIS,
		new CityTile(
			TradableTileIdEnum.PARIS,
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
		TradableTileIdEnum.ROME,
		new CityTile(
			TradableTileIdEnum.ROME,
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
		TradableTileIdEnum.LONDON,
		new CityTile(
			TradableTileIdEnum.LONDON,
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
		TradableTileIdEnum.NEW_YORK,
		new CityTile(
			TradableTileIdEnum.NEW_YORK,
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

export const touristAttractionTileMap: Map<
	TradableTileIdEnum,
	TouristAttractionTile
> = new Map([
	[
		TradableTileIdEnum.JEJU_ISLAND,
		new TouristAttractionTile(
			TradableTileIdEnum.JEJU_ISLAND,
			'제주',
			'대한민국의 휴양지',
			200000,
			300000,
		),
	],
	[
		TradableTileIdEnum.CONCORDE,
		new TouristAttractionTile(
			TradableTileIdEnum.CONCORDE,
			'콩코드여객기',
			'초음속여객기',
			200000,
			300000,
		),
	],
	[
		TradableTileIdEnum.BUSAN,
		new TouristAttractionTile(
			TradableTileIdEnum.BUSAN,
			'부산',
			'대한민국의 제1의 항구도시',
			500000,
			600000,
		),
	],
	[
		TradableTileIdEnum.QUEEN_ELIZABETH,
		new TouristAttractionTile(
			TradableTileIdEnum.QUEEN_ELIZABETH,
			'퀸 엘리자베스호',
			'호화 여객선',
			300000,
			250000,
		),
	],
	[
		TradableTileIdEnum.COLUMBIA,
		new TouristAttractionTile(
			TradableTileIdEnum.COLUMBIA,
			'컬럼비아호',
			'유인 우주 왕복선',
			450000,
			400000,
		),
	],
	[
		TradableTileIdEnum.SEOUL,
		new TouristAttractionTile(
			TradableTileIdEnum.SEOUL,
			'서울',
			'대한민국의 수도',
			1000000,
			2000000,
		),
	],
]);

export const tileMatrix: BaseTile[][] = [
	[
		new BaseTile(TileType.STARTING_POINT),
		CityTileMap.get(TradableTileIdEnum.TAIPEI) as CityTile,
		new GoldenKeyTile(1),
		CityTileMap.get(TradableTileIdEnum.BEIJING) as CityTile,
		CityTileMap.get(TradableTileIdEnum.MANILA) as CityTile,
		touristAttractionTileMap.get(
			TradableTileIdEnum.JEJU_ISLAND,
		) as TouristAttractionTile,
		CityTileMap.get(TradableTileIdEnum.SINGAPORE) as CityTile,
		new GoldenKeyTile(2),
		CityTileMap.get(TradableTileIdEnum.CAIRO) as CityTile,
		CityTileMap.get(TradableTileIdEnum.ISTANBUL) as CityTile,
	],
	[
		new BaseTile(TileType.DESERT_ISLAND),
		CityTileMap.get(TradableTileIdEnum.ATHENES) as CityTile,
		new GoldenKeyTile(3),
		CityTileMap.get(TradableTileIdEnum.COPENHAGEN) as CityTile,
		CityTileMap.get(TradableTileIdEnum.STOCKHOLM) as CityTile,
		touristAttractionTileMap.get(
			TradableTileIdEnum.CONCORDE,
		) as TouristAttractionTile,
		CityTileMap.get(TradableTileIdEnum.BERN) as CityTile,
		new GoldenKeyTile(4),
		CityTileMap.get(TradableTileIdEnum.BERLIN) as CityTile,
		CityTileMap.get(TradableTileIdEnum.OTAWA) as CityTile,
	],
	[
		new BaseTile(TileType.GET_WELFARE),
		CityTileMap.get(TradableTileIdEnum.BUENOSAIRES) as CityTile,
		new GoldenKeyTile(5),
		CityTileMap.get(TradableTileIdEnum.SAO_PAULO) as CityTile,
		CityTileMap.get(TradableTileIdEnum.SYDNEY) as CityTile,
		touristAttractionTileMap.get(
			TradableTileIdEnum.BUSAN,
		) as TouristAttractionTile,
		CityTileMap.get(TradableTileIdEnum.HAWAII) as CityTile,
		CityTileMap.get(TradableTileIdEnum.LISBON) as CityTile,
		touristAttractionTileMap.get(
			TradableTileIdEnum.QUEEN_ELIZABETH,
		) as TouristAttractionTile,
		CityTileMap.get(TradableTileIdEnum.MADRID) as CityTile,
	],
	[
		new BaseTile(TileType.SPACE_TRAVEL),
		CityTileMap.get(TradableTileIdEnum.TOKYO) as CityTile,
		touristAttractionTileMap.get(
			TradableTileIdEnum.COLUMBIA,
		) as TouristAttractionTile,
		CityTileMap.get(TradableTileIdEnum.PARIS) as CityTile,
		CityTileMap.get(TradableTileIdEnum.ROME) as CityTile,
		new GoldenKeyTile(6),
		CityTileMap.get(TradableTileIdEnum.LONDON) as CityTile,
		CityTileMap.get(TradableTileIdEnum.NEW_YORK) as CityTile,
		new BaseTile(TileType.PAY_WELFARE),
		touristAttractionTileMap.get(
			TradableTileIdEnum.SEOUL,
		) as TouristAttractionTile,
	],
];
