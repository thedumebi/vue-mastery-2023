import { defineStore } from 'pinia'
import {
  doc,
  // addDoc,
  setDoc
} from 'firebase/firestore'
import {
  db,
  auth
  // usersCollection
} from '@/includes/firebase'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'

export const useUserStore =  defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)

      const newDocument = doc(db, 'users', userCred.user.uid)

      await setDoc(newDocument, {
        age: values.age,
        name: values.name,
        email: values.email,
        country: values.country
      })

      await updateProfile(userCred.user, {
        displayName: values.name
      })

      // await addDoc(usersCollection, {
      //   age: values.age,
      //   name: values.name,
      //   email: values.email,
      //   country: values.country
      // })

      this.userLoggedIn = true
    },
    async authenticate (values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      this.userLoggedIn = true
    },
    async signout () {
      await auth.signOut()

      this.userLoggedIn = false
    }
  }
})
