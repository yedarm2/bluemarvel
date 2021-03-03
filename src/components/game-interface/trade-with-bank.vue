<template>
	<p>은행과 거래할 항목을 선택하세요.</p>
	<button v-if="!isTileBelongToUser && selectedTile" @click="changeBankState(BankState.BUY_TILE)">토지 사기</button>
	<button v-if="isTileBelongToUser" @click="changeBankState(BankState.SELL_TILES)">토지 팔기</button>
	<button v-if="!isUserHasProperties && selectedTile" @click="changeBankState(BankState.BUY_PROPERTIES)">건물 사기</button>
	<button v-if="isUserHasProperties" @click="changeBankState(BankState.SELL_PROPERTIES)">건물 팔기</button>
	<button v-if="isTileBelongToUser && isUserHasProperties" @click="changeBankState(BankState.SELL_ALL)">함께 팔기</button>
	<button @click="$emit('end-trade')">거래 종료</button>
	<section v-if="currentBankState !== BankState.NONE" class="bank-view">
		<template v-if="currentBankState === BankState.BUY_TILE">
			<p>{{ selectedTile.name }}를 {{ tilePrice }}원에 구매하시겠습니까?</p>
			<button @click="buySelectedTile">예</button>
		</template>
		<template v-else-if="currentBankState === BankState.SELL_TILES">
			<template v-if="selectedTile">
				선택된 토지 팔기
			</template>
			<template v-else>
				토지 선택한 뒤 팔기
			</template>
		</template>
		<template v-else-if="currentBankState === BankState.BUY_PROPERTIES">
			건물 사기
		</template>
		<template v-else-if="currentBankState === BankState.SELL_PROPERTIES">
			<template v-if="selectedTile">
				선택된 토지의 건물 팔기
			</template>
			<template v-else>
				토지 선택한 뒤 건물 팔기
			</template>
		</template>
		<template v-else>
			<template v-if="selectedTile">
				선택된 토지와 건물 팔기
			</template>
			<template v-else>
				토지 선택한 뒤 토지와 건물 팔기
			</template>
		</template>
	</section>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import { useStore } from "vuex";
import { BankState } from '@/shared/policy';
import { formatMoney } from "@/shared/utils";

export default defineComponent({
	name: 'TradeWithBank',
	emits: ['end-trade'],
	setup() {
		const {
			state: { gameInterface },
		} = useStore();
		const currentBankState = ref(BankState.NONE);
		const isTileBelongToUser = ref(false);
		const isUserHasProperties = ref(false);

		try {
			if (gameInterface.selectedTile) {
				isTileBelongToUser.value = gameInterface.bank.checkOwnerOfTile(gameInterface.selectedTile, gameInterface.currentTurnUser.id);
				isUserHasProperties.value = gameInterface.bank.checkOwnerHasProperties(gameInterface.selectedTile, gameInterface.currentTurnUser.id);
			}
		} catch (error) {
			isTileBelongToUser.value = false;
			isUserHasProperties.value = false;
		}


		function changeBankState(newState: BankState) {
			currentBankState.value = newState;
		}

		function getTilePrice() {
			return gameInterface.bank.getTilePrice(gameInterface.selectedTile);
		}

		function buySelectedTile() {
			const tilePrice = getTilePrice();
			if (tilePrice > gameInterface.currentTurnUser.getMoney()) {
				alert('잔액이 부족하여 타일을 구매할 수 없습니다.');
			} else {
				try {
					gameInterface.bank.sellTilesToUser(gameInterface.selectedTile, gameInterface.currentTurnUser.id);
					gameInterface.currentTurnUser.setMoney(-tilePrice);
					alert('구매 성공하였습니다.');
				} catch (error) {
					console.info(error);
					alert('이미 자신의 소유이거나 타인의 땅 입니다.');
				}
			}
		}

		return {
			BankState,
			selectedTile: computed(() => gameInterface.selectedTile),
			tilePrice: computed(() => formatMoney(getTilePrice())),
			currentBankState,
			isTileBelongToUser,
			isUserHasProperties,
			changeBankState,
			buySelectedTile
		};
	},
});
</script>
