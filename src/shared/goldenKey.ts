export interface GoldenKey {
	actionToTrigger: string;
	title: string;
	description: string;
};

export const goldenKeys: GoldenKey[] = [
	{
		actionToTrigger: 'moveToForword',
		title: '이사',
		description: '앞으로 2칸 이동하세요.',
	},
];

export const drawGoldenKey = () => {
	const indexToDraw = Math.floor(Math.random() * goldenKeys.length);

	return goldenKeys[indexToDraw];
};
