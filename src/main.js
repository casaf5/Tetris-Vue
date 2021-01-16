import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import './styles/styles.scss';
import { upperFirst, camelCase } from 'loadsh';

Vue.config.productionTip = false;

//GLOBAL BASE COMPONENT REGISTRATION
const requireComponent = require.context('./components/Base', false, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
	const componentConfig = requireComponent(fileName);
	const componentName = upperFirst(
		camelCase(
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	);
	Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
