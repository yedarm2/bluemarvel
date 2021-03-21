import { desertIslandTile, spaceTravleTile, startingPointTile } from "./boardData";

export interface GoldenKey {
	actionToTrigger: string;
	title: string;
	description: string;
	actionPayload?: any;
};

export const goldenKeys: GoldenKey[] = [
	{
		actionToTrigger: 'moveUserByDistance',
		actionPayload: 2,
		title: '이사',
		description: '앞으로 2칸 이동하세요.',
	},
	{
		actionToTrigger: 'moveUserByDistance',
		title: '이사',
		description: '뒤로 2칸 이동하세요.',
		actionPayload: -2,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '해외 유학',
		description: '유학을 가게 되었습니다. 유학 비용 10만원을 납부하세요.',
		actionPayload: -100000,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '자동차 경주 우승',
		description: '자동차 경주 대회에서 우승을 했습니다 상금 10만원을 받으세요.',
		actionPayload: 100000,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '과속운전 벌금',
		description: '과속운전을 하셨습니다. 벌금 5만원을 납부하세요.',
		actionPayload: -50000,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '복권 당첨',
		description: '복권에 당첨되셨습니다. 20만원을 받으세요.',
		actionPayload: 200000,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '병원비 지불',
		description: '병원에 입원하게 되었습니다. 병원비 5만원을 납부하세요.',
		actionPayload: -50000,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '연금 혜택',
		description: '연금 5만원을 받게 되었습니다.',
		actionPayload: 50000,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '노벨평화상 수상',
		description: '노벨 평화상을 수상하게 되셨습니다. 상금 30만원을 받으세요.',
		actionPayload: 300000,
	},
	{
		actionToTrigger: 'tradeWithBank',
		title: '장학금 혜택',
		description: '노벨 평화상을 수상하게 되셨습니다. 상금 30만원을 받으세요.',
		actionPayload: 100000,
	},
	{
		actionToTrigger: 'moveUserByTile',
		title: '고속도로',
		description: '고속도로로 이동을 합니다 출발지까지 이동하겠습니다.',
		actionPayload: startingPointTile,
	},
	{
		actionToTrigger: 'moveUserByTile',
		title: '우주여행 초청장',
		description: '우주여행에 초청을 받으셨습니다. 우주정류장으로 이동하겠습니다.',
		actionPayload: spaceTravleTile,
	},
	{
		actionToTrigger: 'warpUserByTile',
		title: '무인도',
		description: '무인도에 표류하게 되었습니다. 무인도로 이동하겠습니다...',
		actionPayload: desertIslandTile,
	},
	{
		actionToTrigger: 'circumnavigation',
		title: '세계일주 초대권',
		description: '세계일주을 하게 되셨습니다. 한바퀴를 돌겠습니다.',
	},
];

export const drawGoldenKey = () => {
	const indexToDraw = Math.floor(Math.random() * goldenKeys.length);

	return goldenKeys[indexToDraw];
};
