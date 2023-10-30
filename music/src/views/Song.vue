<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="handlePausePlay"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          id="play-btn"
        >
          <i class="fas" :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <!-- third param is locale but isnt needed because of default -->
          <div class="song-price">{{ $n(10, 'currency', 'en') }}</div>
          <div class="dmb-decimal">{{ $n(100.566, 'dmb') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $t('song.comment_count', song.comment_count, { count: song.comment_count })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-center text-white font-bold p-4 mb-4"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form @submit="addComment" v-if="userLoggedIn">
            <vee-field
              name="comment"
              as="textarea"
              :rules="'required|min:3'"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              :validate-on-input="true"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600 block" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            v-model="sort"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { usePlayerStore } from '@/stores/player'
import { songsCollection, auth, commentsCollection } from '@/includes/firebase'
import { doc, getDoc, addDoc, updateDoc, query, where, getDocs } from 'firebase/firestore'

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is being submitted',
      comments: [],
      sort: '1'
    }
  },
  async beforeRouteEnter(to, _from, next) {
    const songRef = doc(songsCollection, to.params.id)
    const song = await getDoc(songRef)

    next((vm) => {
      if (!song.exists()) {
        return vm.$router.push({ name: 'home' })
      }

      const { sort } = vm.$route.query

      vm.sort = ['1', '2'].includes(sort) ? sort : '1'

      vm.song = song.data()
    })
  },
  async created() {
    await this.getComments()
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapState(usePlayerStore, ['current_song', 'playing']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        }

        return new Date(a.datePosted) - new Date(b.datePosted)
      })
    },
    isPlaying() {
      return this.current_song.docID === this.song.docID && this.playing
    }
  },
  watch: {
    sort(nv) {
      if (nv === this.$route.query.sort) return

      this.$router.push({ query: { ...this.$route.query, sort: nv } })
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong', 'toggleAudio']),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true
      this.comment_show_alert = true
      this.comment_alert_variant = 'bg-blue-500'
      this.comment_alert_message = 'Please wait! Your comment is being submitted'

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
      }

      const commentRef = await addDoc(commentsCollection, comment)
      this.sort === '1'
        ? this.comments.unshift({ ...comment, docID: commentRef.id })
        : this.comments.push({ ...comment, docID: commentRef.id })

      // update song comment count
      this.song.comment_count += 1 //https://eslint.org/docs/latest/rules/no-plusplus
      const songRef = doc(songsCollection, this.$route.params.id)
      await updateDoc(songRef, { comment_count: this.song.comment_count })

      this.comment_in_submission = false
      this.comment_alert_variant = 'bg-green-500'
      this.comment_alert_message = 'Comment added!'

      resetForm()

      setTimeout(() => {
        this.comment_show_alert = false
      }, 5000)
    },
    async getComments() {
      const q = query(commentsCollection, where('sid', '==', this.$route.params.id))
      const snapshots = await getDocs(q)
      snapshots.forEach((snapshot) => {
        this.comments.push({
          ...snapshot.data(),
          docID: snapshot.id
        })
      })
    },
    async handlePausePlay() {
      if (this.$route.params.id === this.current_song.docID) {
        this.toggleAudio()
        return
      }

      this.newSong(this.song)
    }
  }
}
</script>

<style></style>
