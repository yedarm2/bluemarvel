import { computed, Ref } from 'vue';
import { useStore } from 'vuex';

import { BaseTile, tileMatrix } from './boardData';
import { User } from './User';

const tileList = tileMatrix.flat();

export default (currentTile: Ref<BaseTile>) => {
	const store = useStore();
	const users: Ref<User[]> = computed(() => store.state.gameInterface.users);

	return computed(() =>
		users.value.filter(({ currentPositionTile }) =>
			currentPositionTile.compareTile(currentTile.value),
		),
	);
};
