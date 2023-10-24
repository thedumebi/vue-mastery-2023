import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore, collection } from 'firebase/firestore'

const firebase = initializeApp({
  // databaseURL: '',
  // measurementId: '',
  projectId: 'music-202310',
  // messagingSenderId: '733767933097',
  storageBucket: 'music-202310.appspot.com',
  authDomain: 'music-202310.firebaseapp.com',
  apiKey: 'AIzaSyDd-6PAu--7ANmPiCjMtY-u6cPCiP5ciNg',
  appId: '1:733767933097:web:9b0af61c9f67c540f29db8'
})

const auth = getAuth(firebase)
const db = getFirestore(firebase)
const storage = getStorage(firebase)

const usersCollection = collection(db, 'users')
const songsCollection = collection(db, 'songs')
const commentsCollection = collection(db, 'comments')

export { auth, db, storage, usersCollection, songsCollection, commentsCollection }