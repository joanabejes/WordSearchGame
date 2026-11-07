
const firebaseConfig = {
    apiKey: "AIzaSyBunW96jzO3PupO6jKjvzVUhFja83BI-OU",
    authDomain: "aquasearch-3accc.firebaseapp.com",
    projectId: "aquasearch-3accc",
    storageBucket: "aquasearch-3accc.firebasestorage.app",
    messagingSenderId: "992242493704",
    appId: "1:992242493704:web:c9a6b1dc65df63b69624bd"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const scoresCollection = db.collection("scores");


