const { initializeApp } = require('firebase/app');
const { getFirestore, addDoc, collection } = require('firebase/firestore');
const fs = require('fs');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC_OWzWGjpM-7GUtIEaI0hqkPAntwxuPfw',
  authDomain: 'foodgouda.firebaseapp.com',
  projectId: 'foodgouda',
  storageBucket: 'foodgouda.appspot.com',
  messagingSenderId: '299938056478',
  appId: '1:299938056478:web:b1e45a5f04fd2a944d610f',
  measurementId: "G-3DHM0P1E0Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Path to your JSON file
const jsonFilePath = './recipes.json';

// Function to upload JSON data to Firestore with auto-generated IDs
async function uploadJsonToFirestore() {
  try {
    // Read and parse the JSON file
    let data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    // If `data` is not an array, convert it to an array
    if (!Array.isArray(data)) {
      data = Object.values(data);
    }

    for (const item of data) {
      // Reference the 'recipes' collection (auto-generated ID for each document)
      const collectionRef = collection(db, 'recipes');

      // Add document to Firestore with an auto-generated ID
      await addDoc(collectionRef, item);
    }
    console.log('JSON data uploaded successfully with auto-generated IDs!');
  } catch (error) {
    console.error('Error uploading JSON data:', error);
  }
}

// Call the function to start the upload
uploadJsonToFirestore();
