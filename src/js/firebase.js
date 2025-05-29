import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCETaPeCjiyf78_B0pkhg1XoEUcsWqMDmU',
  authDomain: 'ptcgp-tracker-932f4.firebaseapp.com',
  databaseURL: 'https://ptcgp-tracker-932f4-default-rtdb.firebaseio.com',
  projectId: 'ptcgp-tracker-932f4',
  storageBucket: 'ptcgp-tracker-932f4.firebasestorage.app',
  messagingSenderId: '231441741637',
  appId: '1:231441741637:web:9ac7d748717c1bfd10b02c',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
