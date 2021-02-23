import { computed, Ref } from 'vue';
import { useStore } from 'vuex';

import { BaseTile, tileMatrix } from './boardData';

const tileList = tileMatrix.flat();

interface User {
	id: number;
	currentPosition: BaseTile;
}

export default (currentTile: Ref<BaseTile>) => {
	const store = useStore();
	// const users: Ref<User[]> = computed(() => store.state.gameInterface.users);
	const users: Ref<User[]> = computed(() => [
		{
			id: 1,
			currentPosition: tileList[0],
		},
		{
			id: 2,
			currentPosition: tileList[5],
		},
		{
			id: 3,
			currentPosition: tileList[9],
		},
		{
			id: 4,
			currentPosition: tileList[20],
		},
	]);

	return computed(() =>
		users.value.filter(({ currentPosition }) =>
			currentPosition.compareTile(currentTile.value),
		),
	);
};
