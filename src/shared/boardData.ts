export enum TileType {
	STARTING_POINT,
	COUNTRY,
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

export class TradingArea extends BaseTile {
	constructor(
		type: TileType.COUNTRY | TileType.SPECIAL_AREA,
		public id: TradingAreaIdEnum,
		public name: string,
		public description: string,
	) {
		super(type);
	}

	get englishName() {
		return TradingAreaIdEnum[this.id].replace('_', ' ');
	}
}

export class CityArea extends TradingArea {
	buildingPriceInfo: PriceInfo;
	paymentInfo: PriceInfo;

	constructor(
		id: TradingAreaIdEnum,
		name: string,
		description: string,
		buildingPriceInfo: PriceInfo,
		paymentInfo: PriceInfo,
	) {
		super(TileType.COUNTRY, id, name, description);
		this.buildingPriceInfo = buildingPriceInfo;
		this.paymentInfo = paymentInfo;
	}
}

export class SpecialArea extends TradingArea {
	constructor(
		id: TradingAreaIdEnum,
		name: string,
		description: string,
		public price: number,
		public payment: number,
	) {
		super(TileType.SPECIAL_AREA, id, name, description);
	}
}

export enum TradingAreaIdEnum {
	TAIPEI,
	BEIJING,
	MANILA,
	JEJU_ISLAND,
	SINGAPORE,
	CAIRO,
	ISTANBUL,
	ATHENES,
	COPENHAGEN,
	STOCKHOLM,
	CONCORDE,
	BERN,
	BERLIN,
	OTAWA,
	BUENOSAIRES,
	SAO_PAULO,
	SYDNEY,
	BUSAN,
	HAWAII,
	LISBON,
	QUEEN_ELIZABETH,
	MADRID,
	TOKYO,
	COLUMBIA,
	PARIS,
	ROME,
	LONDON,
	NEW_YORK,
	SEOUL,
}

export interface PriceInfo {
	areaPrice: number;
	villaPrice: number;
	buildingPrice: number;
	hotelPrice: number;
}

export const getTradingAreaEnglishName = (areaId: TradingAreaIdEnum) =>
	TradingAreaIdEnum[areaId].replace('_', ' ');

export const cityAreaMap: Map<TradingAreaIdEnum, CityArea> = new Map([
	[
		TradingAreaIdEnum.TAIPEI,
		new CityArea(
			TradingAreaIdEnum.BEIJING,
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
		TradingAreaIdEnum.BEIJING,
		new CityArea(
			TradingAreaIdEnum.BEIJING,
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
		TradingAreaIdEnum.MANILA,
		new CityArea(
			TradingAreaIdEnum.MANILA,
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
		TradingAreaIdEnum.SINGAPORE,
		new CityArea(
			TradingAreaIdEnum.SINGAPORE,
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
		TradingAreaIdEnum.CAIRO,
		new CityArea(
			TradingAreaIdEnum.CAIRO,
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
		TradingAreaIdEnum.ISTANBUL,
		new CityArea(
			TradingAreaIdEnum.ISTANBUL,
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
		TradingAreaIdEnum.ATHENES,
		new CityArea(
			TradingAreaIdEnum.ATHENES,
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
		TradingAreaIdEnum.COPENHAGEN,
		new CityArea(
			TradingAreaIdEnum.COPENHAGEN,
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
		TradingAreaIdEnum.STOCKHOLM,
		new CityArea(
			TradingAreaIdEnum.STOCKHOLM,
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
		TradingAreaIdEnum.BERN,
		new CityArea(
			TradingAreaIdEnum.BERN,
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
		TradingAreaIdEnum.BERLIN,
		new CityArea(
			TradingAreaIdEnum.BERLIN,
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
		TradingAreaIdEnum.OTAWA,
		new CityArea(
			TradingAreaIdEnum.OTAWA,
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
		TradingAreaIdEnum.BUENOSAIRES,
		new CityArea(
			TradingAreaIdEnum.BUENOSAIRES,
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
		TradingAreaIdEnum.SAO_PAULO,
		new CityArea(
			TradingAreaIdEnum.SAO_PAULO,
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
		TradingAreaIdEnum.SYDNEY,
		new CityArea(
			TradingAreaIdEnum.SYDNEY,
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
		TradingAreaIdEnum.HAWAII,
		new CityArea(
			TradingAreaIdEnum.HAWAII,
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
		TradingAreaIdEnum.LISBON,
		new CityArea(
			TradingAreaIdEnum.LISBON,
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
		TradingAreaIdEnum.MADRID,
		new CityArea(
			TradingAreaIdEnum.MADRID,
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
		TradingAreaIdEnum.TOKYO,
		new CityArea(
			TradingAreaIdEnum.TOKYO,
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
		TradingAreaIdEnum.PARIS,
		new CityArea(
			TradingAreaIdEnum.PARIS,
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
		TradingAreaIdEnum.ROME,
		new CityArea(
			TradingAreaIdEnum.ROME,
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
		TradingAreaIdEnum.LONDON,
		new CityArea(
			TradingAreaIdEnum.LONDON,
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
		TradingAreaIdEnum.NEW_YORK,
		new CityArea(
			TradingAreaIdEnum.NEW_YORK,
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

export const specialAreaMap: Map<TradingAreaIdEnum, SpecialArea> = new Map([
	[
		TradingAreaIdEnum.JEJU_ISLAND,
		new SpecialArea(
			TradingAreaIdEnum.JEJU_ISLAND,
			'제주',
			'대한민국의 휴양지',
			200000,
			300000,
		),
	],
	[
		TradingAreaIdEnum.CONCORDE,
		new SpecialArea(
			TradingAreaIdEnum.CONCORDE,
			'콩코드여객기',
			'초음속여객기',
			200000,
			300000,
		),
	],
	[
		TradingAreaIdEnum.BUSAN,
		new SpecialArea(
			TradingAreaIdEnum.BUSAN,
			'부산',
			'대한민국의 제1의 항구도시',
			500000,
			600000,
		),
	],
	[
		TradingAreaIdEnum.QUEEN_ELIZABETH,
		new SpecialArea(
			TradingAreaIdEnum.QUEEN_ELIZABETH,
			'퀸 엘리자베스호',
			'호화 여객선',
			300000,
			250000,
		),
	],
	[
		TradingAreaIdEnum.COLUMBIA,
		new SpecialArea(
			TradingAreaIdEnum.COLUMBIA,
			'컬럼비아호',
			'유인 우주 왕복선',
			450000,
			400000,
		),
	],
	[
		TradingAreaIdEnum.SEOUL,
		new SpecialArea(
			TradingAreaIdEnum.SEOUL,
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
		cityAreaMap.get(TradingAreaIdEnum.TAIPEI) as CityArea,
		new GoldenKey(1),
		cityAreaMap.get(TradingAreaIdEnum.BEIJING) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.MANILA) as CityArea,
		specialAreaMap.get(TradingAreaIdEnum.JEJU_ISLAND) as SpecialArea,
		cityAreaMap.get(TradingAreaIdEnum.SINGAPORE) as CityArea,
		new GoldenKey(2),
		cityAreaMap.get(TradingAreaIdEnum.CAIRO) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.ISTANBUL) as CityArea,
	],
	[
		new BaseTile(TileType.DESERT_ISLAND),
		cityAreaMap.get(TradingAreaIdEnum.ATHENES) as CityArea,
		new GoldenKey(3),
		cityAreaMap.get(TradingAreaIdEnum.COPENHAGEN) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.STOCKHOLM) as CityArea,
		specialAreaMap.get(TradingAreaIdEnum.CONCORDE) as SpecialArea,
		cityAreaMap.get(TradingAreaIdEnum.BERN) as CityArea,
		new GoldenKey(4),
		cityAreaMap.get(TradingAreaIdEnum.BERLIN) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.OTAWA) as CityArea,
	],
	[
		new BaseTile(TileType.GET_WELFARE),
		cityAreaMap.get(TradingAreaIdEnum.BUENOSAIRES) as CityArea,
		new GoldenKey(5),
		cityAreaMap.get(TradingAreaIdEnum.SAO_PAULO) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.SYDNEY) as CityArea,
		specialAreaMap.get(TradingAreaIdEnum.BUSAN) as SpecialArea,
		cityAreaMap.get(TradingAreaIdEnum.HAWAII) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.LISBON) as CityArea,
		specialAreaMap.get(TradingAreaIdEnum.QUEEN_ELIZABETH) as SpecialArea,
		cityAreaMap.get(TradingAreaIdEnum.MADRID) as CityArea,
	],
	[
		new BaseTile(TileType.SPACE_TRAVEL),
		cityAreaMap.get(TradingAreaIdEnum.TOKYO) as CityArea,
		specialAreaMap.get(TradingAreaIdEnum.COLUMBIA) as SpecialArea,
		cityAreaMap.get(TradingAreaIdEnum.PARIS) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.ROME) as CityArea,
		new GoldenKey(6),
		cityAreaMap.get(TradingAreaIdEnum.LONDON) as CityArea,
		cityAreaMap.get(TradingAreaIdEnum.NEW_YORK) as CityArea,
		new BaseTile(TileType.GET_WELFARE),
		specialAreaMap.get(TradingAreaIdEnum.SEOUL) as SpecialArea,
	],
];
