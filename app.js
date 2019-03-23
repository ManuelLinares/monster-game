new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    actions: [],
    monsterHealth: 100,
    playerHealth: 100
  },
  computed: {
    monsterPercent() {
      return {
        width: this.monsterHealth + '%'
      }
    },
    playerPercent() {
      return {
        width: this.playerHealth + '%'
      }
    }
  },
  methods: {
    startNewGame() {
      this.actions = []
      this.playerHealth = 100
      this.monsterHealth = 100
      this.gameStarted = true
    },
    attack() {
      const pDam = randomAttack()
      const mDam = randomAttack()

      this.monsterHealth -= pDam
      this.playerHealth -= mDam

      this.actions.unshift({
        text: `PLAYER HITS MONSTER FOR ${pDam}`,
        class: 'player-turn'
      })
      monsterAttack(this.actions, mDam)
    },
    heal() {
      const pDam = randomSpecialAttack()
      const mDam = randomAttack()

      this.playerHealth += pDam
      this.playerHealth -= mDam

      this.actions.unshift({
        text: `PLAYER HEALS FOR ${pDam}`,
        class: 'player-turn'
      })
      monsterAttack(this.actions, mDam)
    },
    specialAttack() {
      const pDam = randomSpecialAttack()
      const mDam = randomAttack()

      this.monsterHealth -= pDam
      this.playerHealth -= mDam

      this.actions.unshift({
        text: `PLAYER HITS MONSTER FOR ${pDam}`,
        class: 'player-turn'
      })
      monsterAttack(this.actions, mDam)
    }
  }
})

const randomAttack = () => Math.round(Math.random() * 10)
const randomSpecialAttack = () => Math.round(Math.random() * 15)

const monsterAttack = (arr, dam) => {
  arr.unshift({
    text: `MONSTER HITS PLAYER FOR ${dam}`,
    class: 'monster-turn'
  })
}