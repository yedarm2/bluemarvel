import { createStore } from 'vuex';
import gameInterface from './modules/game-interface';

export default createStore({
	modules: {
		gameInterface,
	},
});
