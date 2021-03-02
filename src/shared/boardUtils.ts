import { tileMatrix, BaseTile } from './boardData';

const tileList = tileMatrix.flat();

export type LineNumber = 0 | 1 | 2 | 3;
export const getStringByNumber = (number: LineNumber) =>
	({
		0: 'first',
		1: 'second',
		2: 'third',
		3: 'fourth',
	}[number]);

export const getBoardLineNumberByTile = (tile: BaseTile) =>
	tileMatrix.findIndex((_tileList) => _tileList.includes(tile)) as LineNumber;

/**
 * @description 목표까지의 타일 목록을 반환
 */
export const getTileListBetweenFromtAndTo = (
	fromTile: BaseTile,
	toTile: BaseTile,
) => {
	let startIndex = tileList.findIndex(tile => tile.compareTile(fromTile));
	if (startIndex === tileList.length - 1) startIndex = 0;

	const endIndex = tileList.findIndex(tile => tile.compareTile(toTile));

	if (startIndex < endIndex) {
		return tileList.slice(startIndex + 1, endIndex);
	}

	if (endIndex === 0) {
		return tileList.slice(startIndex + 1);
	}

	return [...tileList.slice(endIndex + 1), ...tileList.slice(0, startIndex)];
};

export const getTileForDistance = (fromTile: BaseTile, distance: number) => {
	const fromIndex = tileList.findIndex(tile => tile.compareTile(fromTile));
	let toIndex = fromIndex + distance;

	if (toIndex >= tileList.length) {
		toIndex -= tileList.length;
	}

	return tileList[toIndex];
};
