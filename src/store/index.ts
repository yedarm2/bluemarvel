import { createStore } from 'vuex';

import blueMarble from './modules/blueMarble';

export default createStore({
	modules: {
		blueMarble,
	},
});
