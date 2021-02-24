<template>
	<p>게임에 참가할 유저 수를 선택 해주세요.</p>
	<input id="user-count" v-model="userCount" placeholder="유저 수를 설정하세요."/>
	<button @click="start">시작</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {User} from "@/shared/User";
import {useStore} from "vuex";

export default defineComponent({
	name: 'BeforeUserCreate',
	props: {
		users: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	emits: ['start-game'],
	setup(_, { emit }) {
		const userCount = ref(0);
		const {
			commit
		} = useStore();

		function createUser(): User[] {
			const users = [];
			for (let i = 0; i < userCount.value; i++) {
				users.push(new User(i));
			}
			commit('gameInterface/setUser', users);
			return users;
		}

		function start() {
			if (userCount.value <= 0) {
				alert('유저 수가 제대로 설정 되지 않았습니다.');
				return;
			}
			const users = createUser();
			commit('gameInterface/setCurrentTurnUser', users[0]);
			emit('start-game');
		}

		return {
			userCount,
			start
		};
	},
});
</script>
