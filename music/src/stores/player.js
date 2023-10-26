import { Howl } from 'howler'
import { defineStore } from 'pinia'
import { formatTime } from '@/includes/helpers'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }

      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },
    async toggleAudio() {
      if (!this.sound.playing) return

      if (this.playing) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    progress() {
      this.seek = formatTime(this.sound.seek())
      this.duration = formatTime(this.sound.duration())
      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`

      if (this.playing) {
        requestAnimationFrame(this.progress)
      }
    },
    updateSeek(event) {
      if (!(this.sound instanceof Howl)) return

      // returns info about the current target
      // x represents the distance from the left side of the document to the left side of the player
      const { x, width } = event.currentTarget.getBoundingClientRect()

      /**
       * event.clientX tells you where the client clicked.
       * It isnt reliable because player isnt full page width
       * if document width = 2000 and player width = 1000
       * if you click middle of the player you expect the event.clientX to be 500
       * but it returns 1000 because the center of the player is the center of the document.
       * To get the coordinate relative to the player you need to get the distance from the
       * left side of the document to the left side of the player
       */
      const clickX = event.clientX - x
      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage

      this.sound.seek(seconds)
      if (!this.playing) {
        this.sound.play()
      }
      this.sound.on('seek', () => {
        this.progress()
      })
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }

      return false
    }
  }
})
