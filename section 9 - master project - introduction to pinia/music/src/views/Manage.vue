<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" @new-song="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, index) in songs"
              :key="song.docID"
              :song="song"
              :update-unsaved-flag="updateUnsavedFlag"
              @song-updated="updateSong(index, $event)"
              @song-deleted="removeSong(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from '@/components/Upload.vue'
import { query, where, getDocs } from 'firebase/firestore'
import { songsCollection, auth } from '@/includes/firebase'
import CompositionItem from '@/components/CompositionItem.vue'
// import { useUserStore } from '@/stores/user'

export default {
  name: 'Manage',
  components: { AppUpload, CompositionItem },
  data() {
    return {
      songs: [],
      unsavedFlag: false
    }
  },
  async created() {
    const q = query(songsCollection, where('uid', '==', auth.currentUser.uid))
    const snapshots = await getDocs(q)
    snapshots.forEach((snapshot) => {
      this.songs.push({
        ...snapshot.data(),
        docID: snapshot.id
      })
    })
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(song) {
      console.log(song)
      this.songs.unshift(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  // beforeRouteEnter(_to, _from, next) {
  //   const store = useUserStore()

  //   if (store.userLoggedIn) {
  //     next()
  //   } else {
  //     next({ name: 'home' })
  //   }
  // },
  beforeRouteLeave(to, from, next) {
    // this.$refs.upload.cancelUploads()
    // next()
    if (!this.unsavedFlag) {
      next()
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  }
}
</script>

<style></style>
