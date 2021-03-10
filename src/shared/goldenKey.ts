export interface GoldenKey {
	actionToTrigger: string;
	title: string;
	description: string;
	actionPayload?: any;
};

export const goldenKeys: GoldenKey[] = [
	{
		actionToTrigger: 'moveToUser',
		actionPayload: 2,
		title: '이사',
		description: '앞으로 2칸 이동하세요.',
	},

	{
		actionToTrigger: 'moveToUser',
		title: '이사',
		description: '뒤로 2칸 이동하세요.',
		actionPayload: -2,
	},
];

export const drawGoldenKey = () => {
	const indexToDraw = Math.floor(Math.random() * goldenKeys.length);

	return goldenKeys[indexToDraw];
};
