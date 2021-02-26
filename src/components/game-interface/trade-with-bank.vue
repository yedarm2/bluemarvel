<template>
	<p>은행과 거래할 항목을 선택하세요.</p>
	<button>토지 사기</button>
	<button>토지 팔기</button>
	<button>건물 사기</button>
	<button>건물 팔기</button>
	<button>함께 팔기</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'TradeWithBank',
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


		return {
		};
	},
});
</script>
