import firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCkI7cntSCgXd2-9Av9ppYluL_NHB-dPYg",
    authDomain: "facebook-clone-caaab.firebaseapp.com",
    databaseURL: "https://facebook-clone-caaab.firebaseio.com",
    projectId: "facebook-clone-caaab",
    storageBucket: "facebook-clone-caaab.appspot.com",
    messagingSenderId: "327392156014",
    appId: "1:327392156014:web:7cdc87999216e3f986097f",
    measurementId: "G-TSMCNKB88W"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage };
  export default db;
