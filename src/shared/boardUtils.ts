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

const returnTileList = (list: BaseTile[], isReverse: boolean) => isReverse ? list.reverse() : list;

/**
 * @description 목표까지의 타일 목록을 반환
 */
export const getTileListBetweenFromtAndTo = (fromTile: BaseTile, toTile: BaseTile, isReverse: boolean) => {
	const [startTile, endTile] = !isReverse ? [fromTile, toTile] : [toTile, fromTile];

	let startIndex = tileList.findIndex(tile => tile.compareTile(startTile));
	if (startIndex === tileList.length - 1) startIndex = 0;

	const endIndex = tileList.findIndex(tile => tile.compareTile(endTile));

	if (startIndex < endIndex) {
		return returnTileList(tileList.slice(startIndex + 1, endIndex), isReverse);
	}

	if (endIndex === 0) {
		return returnTileList(tileList.slice(startIndex + 1), isReverse);
	}

	return returnTileList([...tileList.slice(endIndex + 1), ...tileList.slice(0, startIndex)], isReverse);
};

export const getTileForDistance = (fromTile: BaseTile, distance: number) => {
	const fromIndex = tileList.findIndex(tile => tile.compareTile(fromTile));
	let toIndex = fromIndex + distance;

	if (toIndex >= tileList.length) {
		toIndex -= tileList.length;
	}

	if (toIndex < 0) {
		toIndex += tileList.length;
	}

	return tileList[toIndex];
};
