<template>
	<div class="app-nav">
		<router-link to="/">부루마블</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AppNav',
});
</script>

<style lang="scss" scoped>
.app-nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
