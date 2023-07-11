import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRoWOOe4Aq2ucw_6saLrAg8KtUf4pVwTc",
  authDomain: "careerlink-46f8e.firebaseapp.com",
  projectId: "careerlink-46f8e",
  storageBucket: "careerlink-46f8e.appspot.com",
  messagingSenderId: "284414356741",
  appId: "1:284414356741:web:79909bd0dfab4ffb8ddb6c",
  measurementId: "G-MEV6JJEKWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
const provider = new GoogleAuthProvider()

export const signInWithGoogle=async()=>{
    return signInWithPopup(auth,provider)
    .then((result)=>{
        return result
    }).catch((err)=>{
        console.log(err);
    })

    
}
