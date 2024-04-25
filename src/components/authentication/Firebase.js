import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCTWkFHRpIBOf75-jdaWaRZABmuiTxUjNQ",
    authDomain: "jewellery-multistore-operation.firebaseapp.com",
    projectId: "jewellery-multistore-operation",
    storageBucket: "jewellery-multistore-operation.appspot.com",
    messagingSenderId: "1066956713839",
    appId: "1:1066956713839:web:33e44c83c93e334245829a",
    measurementId: "G-FEFFN75SJM"
  };
  
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firebaseApp.auth().settings.appVerificationDisabledForTesting = false; // or true if you're testing

export default firebaseApp;
