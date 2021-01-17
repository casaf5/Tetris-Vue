import Vue from 'vue'
import VueRouter from 'vue-router'
import TetrisGame from '../views/TetrisGame.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/play',
		name: 'TetrisGame',
		component: TetrisGame,
	},
	{
		path: '/',
		redirect: { name: 'TetrisGame' },
	},
]

export const router = new VueRouter({ routes })
