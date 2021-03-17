<template>
	<p>은행과 거래할 항목을 선택하세요.</p>
	<p>{{currentTurnUser}}유저의 잔액은{{ currentTurnUsersRemainedMoney }}원 입니다.</p>
	<button v-if="!isTileBelongToUser && selectedTile" @click="changeBankState(BankState.BUY_TILE)">토지 사기</button>
	<button v-if="isTileBelongToUser || isUserHasTile" @click="changeBankState(BankState.SELL_TILES)">토지 팔기</button>
	<button v-if="isTileBelongToUser && !isUserHasTileProperties && selectedTile" @click="changeBankState(BankState.BUY_PROPERTIES)">건물 사기</button>
	<button v-if="(isTileBelongToUser && isUserHasTileProperties) || isUserHasProperties" @click="changeBankState(BankState.SELL_PROPERTIES)">건물 팔기</button>
	<button v-if="isUserHasTile || isUserHasProperties" @click="changeBankState(BankState.SELL_ALL)">함께 팔기</button>
	<button @click="$emit('end-trade')">거래 종료</button>
	<section v-if="currentBankState !== BankState.NONE" class="bank-view">
		<template v-if="currentBankState === BankState.BUY_TILE">
			<p>{{ selectedTile.name }}을(를) {{ getTilePrice([selectedTile]) }}원에 구매 하시겠습니까?</p>
			<button @click="buySelectedTile">예</button>
		</template>
		<template v-else-if="currentBankState === BankState.SELL_TILES">
			<template v-if="selectedTile && isTileBelongToUser">
				<p>{{ selectedTile.name }}을(를) {{ getTilePrice([selectedTile]) }}원에 매각 하시겠습니까?</p>
				<button @click="sellSelectedTile">예</button>
			</template>
			<template v-else-if="isUserHasTile">
				<span v-for="(tile, index) in userTiles" :key="index">
					<input type="checkbox" :id="`tile-${index}`" :value="tile" v-model="checkedUserTiles" />
					<label :for="`tile-${index}`">{{ tile.tile.name }}</label>
				</span>
				<p>선택된 타일들을 {{ getTilePrice(checkedUserTiles) }}원에 매각 하시겠습니까?</p>
			</template>
		</template>
		<template v-else-if="currentBankState === BankState.BUY_PROPERTIES">
			<div>
				<input type="checkbox" id="buy-hotel" :value="propertyType.HOTEL" v-model="checkedProperties" />
				<label for="buy-hotel">{{ propertyType.HOTEL }}</label>
				<input type="checkbox" id="buy-building" :value="propertyType.BUILDING" v-model="checkedProperties" />
				<label for="buy-building">{{ propertyType.BUILDING }}</label>
				<input type="checkbox" id="buy-villa" :value="propertyType.VILLA" v-model="checkedProperties" />
				<label for="buy-villa">{{ propertyType.VILLA }}</label>
			</div>
			선택된 부동산 ({{ checkedProperties.join(', ') }})을(를) {{ getPropertiesPrice(selectedTile) }}원에 구매 하시겠습니까?
			<button @click="buySelectedProperties">예</button>
		</template>
		<template v-else-if="currentBankState === BankState.SELL_PROPERTIES">
			<template v-if="selectedTile && isUserHasTileProperties">
				선택된 토지의 건물 팔기
				<div>
					<template v-for="(item, index) in purchasedPropertiesOnSelectedTile" :key="index">
						<input type="checkbox" :id="'sell-' + item.property.toLowerCase()" :value="item.property" v-model="checkedProperties" />
						<label :for="'sell-' + item.property.toLowerCase()">{{ item.property }} {{ item.count }}개</label>
					</template>
				</div>
				선택된 부동산 ({{ checkedProperties.join(', ') }})을(를) {{ getPropertiesPrice(selectedTile) }}원에 판매 하시겠습니까?
				<button @click="sellSelectedProperties">예</button>
			</template>
			<template v-else-if="isUserHasProperties">
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
import {useStore} from "vuex";
import {Tiles} from '@/shared/Bank';
import {BankState, propertyType} from '@/shared/policy';
import {formatMoney} from "@/shared/utils";

export default defineComponent({
	name: 'TradeWithBank',
	emits: ['end-trade'],
	setup() {
		const {
			state: { gameInterface },
		} = useStore();
		const currentBankState = ref(BankState.NONE);
		const checkedProperties = ref([]);
		const checkedUserTiles = ref([]);

		function changeBankState(newState: BankState) {
			currentBankState.value = newState;
		}

		function buySelectedTile() {
			const tilePrice = gameInterface.bank.getTilePrice(gameInterface.selectedTile);
			if (tilePrice > gameInterface.currentTurnUser.getMoney()) {
				alert('잔액이 부족하여 타일을 구매할 수 없습니다.');
			} else {
				try {
					gameInterface.bank.sellTilesToUser(gameInterface.selectedTile, gameInterface.currentTurnUser.id);
					gameInterface.currentTurnUser.setMoney(-tilePrice);
					currentBankState.value = BankState.NONE;
					alert('타일 구매를를 성공하였습니다.');
				} catch (error) {
					console.info(error);
					alert('이미 자신의 소유이거나 타인의 땅 입니다.');
				}
			}
		}

		function sellSelectedTile() {
			try {
				gameInterface.currentTurnUser.setMoney(gameInterface.bank.purchaseTiles(gameInterface.selectedTile));
				currentBankState.value = BankState.NONE;
				alert('타일 매각에 성공하였습니다.');
			} catch (error) {
				console.info(error);
				alert('주인없는 타일 입니다.');
			}
		}

		function buySelectedProperties() {
			const propertiesPrice = gameInterface.bank.getSpecificPropertyPrice(gameInterface.selectedTile, checkedProperties.value);
			if (propertiesPrice > gameInterface.currentTurnUser.getMoney()) {
				alert('잔액이 부족하여 건물을 구매할 수 없습니다.');
			} else {
				gameInterface.bank.sellProperties(gameInterface.selectedTile, checkedProperties.value);
				gameInterface.currentTurnUser.setMoney(-propertiesPrice);
				checkedProperties.value = [];
				currentBankState.value = BankState.NONE;
				alert('건물 구매 성공하였습니다.');
			}
		}

		function sellSelectedProperties() {
			try {
				gameInterface.currentTurnUser.setMoney(gameInterface.bank.purchaseProperties(gameInterface.selectedTile, checkedProperties.value));
				currentBankState.value = BankState.NONE;
				alert('건물 매각에 성공하였습니다.');
			} catch (error) {
				console.info(error);
				alert('건물없는 타일 입니다.');
			}
		}

		function getTilePrice(tiles: Tiles[]) {
			return formatMoney(tiles.reduce((acc, tile) => {
				console.info(gameInterface.bank.getTilePrice(tile));
				// eslint-disable-next-line no-param-reassign
				acc += gameInterface.bank.getTilePrice(tile);
				return acc;
			}, 0));
		}

		function getPropertiesPrice(tile: Tiles) {
			return formatMoney(gameInterface.bank.getSpecificPropertyPrice(tile, checkedProperties.value));
		}

		return {
			BankState,
			propertyType,
			currentBankState,
			checkedProperties,
			checkedUserTiles,
			currentTurnUser: computed(() => gameInterface.currentTurnUser.id),
			currentTurnUsersRemainedMoney: computed(() => formatMoney(gameInterface.currentTurnUser.getMoney())),
			purchasedPropertiesOnSelectedTile: computed(() => gameInterface.bank.getPurchasedProperties(gameInterface.selectedTile)),
			selectedTile: computed(() => gameInterface.selectedTile),
			isTileBelongToUser: computed(() => gameInterface.bank.checkOwnerOfTile(gameInterface.selectedTile, gameInterface.currentTurnUser.id)),
			isUserHasTileProperties: computed(() => gameInterface.bank.checkOwnerHasProperties(gameInterface.selectedTile, gameInterface.currentTurnUser.id)),
			isUserHasTile: computed(() => gameInterface.bank.checkUserHasTile(gameInterface.currentTurnUser.id)),
			isUserHasProperties: computed(() => gameInterface.bank.checkUserHasProperties(gameInterface.currentTurnUser.id)),
			userTiles: computed(() => gameInterface.bank.getUsersTile(gameInterface.currentTurnUser.id)),
			userTileAndProperties: computed(() => gameInterface.bank.getUsersTileAndProperties(gameInterface.selectedTile, gameInterface.currentTurnUser.id)),
			changeBankState,
			buySelectedTile,
			sellSelectedTile,
			buySelectedProperties,
			sellSelectedProperties,
			getTilePrice,
			getPropertiesPrice
		};
	},
});
</script>
