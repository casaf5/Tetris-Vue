<template>
	<div id="app" class="site-main-layout">
		<AppHeader />
		<router-view />
		<AppFooter />
	</div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
	components: {
		AppHeader,
		AppFooter,
	},
}
</script>
