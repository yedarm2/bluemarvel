import { ToRefs, toRefs } from 'vue';
import { useStore } from 'vuex';
import { GameInterfaceState } from '@/store/states';

export default () => toRefs(useStore().state.gameInterface) as ToRefs<GameInterfaceState>;
