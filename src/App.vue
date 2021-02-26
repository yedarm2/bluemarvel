<template>
	<app-nav v-if="false" />
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppNav from './components/app-nav.vue';

export default defineComponent({
	name: 'App',

	components: {
		AppNav,
	},
});
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
