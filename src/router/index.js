import Vue from 'vue';
import VueRouter from 'vue-router';
import TetrisGame from '../views/TetrisGame.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'TetrisGame',
		component: TetrisGame,
	},
];

export const router = new VueRouter({ routes });
