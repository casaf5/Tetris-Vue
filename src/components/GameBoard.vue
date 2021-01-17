<template>
	<div class="board flex-center ">
		<table>
			<tr v-for="row in board">
				<td
					v-for="cell in row"
					:style="{ backgroundColor: cell.color }"
					:class="getCellStyle(cell)"
				></td>
			</tr>
		</table>

		<GameOverScreen v-if="isGameOver" />
	</div>
</template>

<script>
const ROWS = 20
const COLUMS = 10
import { pieces } from '../pieces.js'
import { sounds } from '../sounds.js'
import GameOverScreen from '@/components/GameOverScreen.vue'

export default {
	name: 'GameBoard',
	components: {
		GameOverScreen,
	},
	data() {
		return {
			board: null,
			piecesTypes: ['O', 'L', 'J', 'Z', 'S', 'I', 'T'],
			reflectionShape: [],
			currPiece: {
				shape: null,
				center: null,
				shapeCoords: [],
				angle: 1,
			},
			rotateOptions: null,
			isKeyDown: false,
			isGameOver: false,
			gameInterval: null,
			lastReflectedCoords: [],
		}
	},
	computed: {
		shapeColor() {
			let colors = {
				O: '#fde100',
				L: '#f89622',
				J: '#015b9d',
				Z: '#ee2733',
				S: '#4db748',
				T: '#922b8c',
				I: '#2aace2',
			}
			return colors[this.currPiece.shape]
		},

		nextShape() {
			return this.$store.getters.nextShape
		},
	},
	methods: {
		createBoard() {
			let board = []
			for (let i = 0; i < ROWS; i++) {
				board[i] = []
				for (let j = 0; j < COLUMS; j++) {
					board[i][j] = {
						isMoving: false,
						isBlocked: false,
						isReflected: false,
						toRemove: false,
						color: null,
					}
				}
			}
			return board
		},
		getCellStyle(cell) {
			let reflectedClass = `reflected-${this.currPiece.shape}`
			return {
				moving: cell.isMoving,
				[reflectedClass]: cell.isReflected,
				blocked: cell.isBlocked,
				'remove-row': cell.toRemove,
			}
		},
		movePiece(rowDiff, colDiff) {
			let { shapeCoords, angle, center } = this.currPiece
			this.cleanCoords(shapeCoords)
			this.currPiece.shapeCoords = shapeCoords.map(([i, j]) => [i + rowDiff, j + colDiff])
			this.currPiece.center = { i: center.i + rowDiff, j: center.j + colDiff }
			this.renderCoords(this.currPiece.shapeCoords)
			this.reflectLocation()
			setTimeout(this.checkPieceCantMove, 500)
		},
		checkPieceCantMove() {
			let { shapeCoords } = this.currPiece
			this.checkFullRowsBlocks()
			if (shapeCoords.some(([i, j]) => i + 1 === ROWS || this.board[i + 1][j].isBlocked)) {
				this.$store.commit('addPiece')
				this.addNewPiece()
				sounds.BLOCK_HIT.play()
			}
		},
		keyPress({ key }) {
			switch (key) {
				case 'ArrowRight':
					this.checkMove(0, 1)
					break
				case 'ArrowLeft':
					this.checkMove(0, -1)
					break
				case 'ArrowDown':
					this.isKeyDown = true
					this.checkMove(1, 0)
					break
				case 'ArrowUp':
					this.rotatePiece()
					break
			}
			this.isKeyDown = false
		},
		checkMove(rowDiff, colDiff) {
			let { shapeCoords } = this.currPiece
			let cantMove = shapeCoords.some(([i, j]) => {
				i += rowDiff
				j += colDiff
				return i < 0 || i >= ROWS || j < 0 || j >= COLUMS || this.board[i][j].isBlocked
			})
			if (!cantMove) this.movePiece(rowDiff, colDiff)
		},
		moveDown() {
			if (this.isKeyDown) return

			this.checkMove(1, 0)
		},
		addNewPiece() {
			this.currPiece.shapeCoords.forEach(([i, j]) => {
				this.board[i][j] = { isMoving: false, isBlocked: true, color: this.shapeColor }
			})
			this.rotateOptions = pieces[this.nextShape]
			let shapeCoords = this.rotateOptions[1](1, 4)
			if (this.checkGameOver(shapeCoords)) {
				clearInterval(this.gameInterval)
				this.isGameOver = true
				return
			}
			this.currPiece = { shapeCoords, angle: 1, center: { i: 1, j: 4 }, shape: this.nextShape }
			this.renderCoords(shapeCoords)
			this.reflectLocation()
		},
		rotatePiece() {
			let { shapeCoords, angle, center } = this.currPiece
			angle = angle + 1 > 4 ? 1 : ++angle
			this.cleanCoords(shapeCoords)
			let newShapeCoords = this.rotateOptions[angle](center.i, center.j)
			newShapeCoords = this.validCoords(newShapeCoords) || shapeCoords
			this.renderCoords(newShapeCoords)
			sounds.BLOCK_ROTATE.play()
			this.currPiece = { ...this.currPiece, angle, shapeCoords: newShapeCoords }
			this.reflectLocation()
		},
		renderCoords(coords) {
			coords.forEach(([i, j]) => {
				this.board[i][j].isMoving = true
				this.board[i][j].color = this.shapeColor
			})
		},
		cleanCoords(coords) {
			coords.forEach(([i, j]) => {
				this.board[i][j].isMoving = false
				this.board[i][j].color = null
			})
		},
		checkFullRowsBlocks() {
			let lines = 0
			this.board.forEach((row, rowIdx) => {
				if (row.every((cell) => cell.isBlocked)) {
					this.removeRow(rowIdx)
					lines++
				}
			})
			if (lines > 0) sounds.LINE_REMOVE.play()
			else if (lines === 4) sounds.LINE_REMOVAL_4.play()
			this.$store.commit('scoreModule/updateScore', lines)
		},
		removeRow(rowIdx) {
			for (let i = rowIdx; i > 0; i--) {
				if (this.board[i].every((cell) => !cell.isBlocked)) break
				let tempRow = JSON.parse(JSON.stringify(this.board[i - 1]))
				this.board.splice(i, 1, tempRow)
			}
		},
		validCoords(coords) {
			let validCoords = []
			let iFixDiff = 0
			let jFixDiff = 0
			coords.forEach(([i, j]) => {
				if (j >= COLUMS) jFixDiff--
				if (j < 0) jFixDiff++
				if (i < 0) iFixDiff++
			})
			validCoords = coords.map(([i, j]) => [i + iFixDiff, j + jFixDiff])
			return validCoords.some(([i, j]) => this.board[i][j].isBlocked) ? null : validCoords
		},
		checkGameOver(nextCoords) {
			return nextCoords.some(([i, j]) => this.board[i][j].isBlocked)
		},
		reflectLocation() {
			this.lastReflectedCoords.forEach(([i, j]) => (this.board[i][j].isReflected = false))
			let coords = [...this.currPiece.shapeCoords]
			for (let i = 0; i < ROWS - 1; i++) {
				if (coords.some(([i, j]) => i >= ROWS - 1 || this.board[i + 1][j].isBlocked)) break
				coords = coords.map(([i, j]) => [i + 1, j])
			}
			coords.forEach(([i, j]) => (this.board[i][j].isReflected = true))
			this.lastReflectedCoords = coords
		},
	},
	created() {
		this.board = this.createBoard()
		this.addNewPiece()
		this.gameInterval = setInterval(this.moveDown, 900)
		sounds.MAIN_THEME.play()
		window.addEventListener('keydown', this.keyPress)
	},
}
</script>

<style lang="scss" scoped></style>
