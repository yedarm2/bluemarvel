<template>
	<div class="game-interface" :class="{
		'game-interface--hide': !show
	}">
		<template v-if="currentState === GameState.BEFORE_USER_CREATE">
			<input id="user-count" v-model="userCount" placeholder="유저 수를 설정하세요."/>
			<button @click="init">시작</button>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue';
import { useStore } from "vuex";
import { GameState } from "@/shared/policy";
import {User} from "@/shared/User";

export default defineComponent({
	name: 'GameInterface',
	props: {
		users: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	setup() {
		const show = ref(true);
		const userCount = ref(0);
		const {
			state: { gameInterface },
			commit
		} = useStore();
		const init = () => {
			if (userCount.value <= 0) {
				alert('유저 수가 제대로 설정 되지 않았습니다.');
				return;
			}
			const users = [];
			for (let i = 0; i < userCount.value; i++) {
				users.push(new User(i));
			}
			commit('gameInterface/setUser', users);
			commit('gameInterface/change', GameState.USER_CREATED);
		};

		watch(
			() => JSON.parse(JSON.stringify(gameInterface)),
			(curr, prev) => {
				console.info(curr, prev);
				switch (curr.currentState) {
					case GameState.USER_CREATED:
						show.value = false;
						break;
					default:
						break;
				}
			},
			// { deep: true }
		);

		return {
			GameState,
			currentState: computed(() => gameInterface.currentState),
			show,
			userCount,
			init
		};
	},
});
</script>

<style lang="scss">
	.game-interface {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: pink;

		z-index: 10;

		&--hide {
			z-index: -1;
		}
	}
</style>
