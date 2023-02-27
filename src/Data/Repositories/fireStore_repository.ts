
import { getFirestore } from 'firebase/firestore'
import { collection, doc, setDoc,getDocs  } from "firebase/firestore"; 


export default  class FireStoreRepository{

   static  async  ReadCountries  () {
    debugger;
   const citiesRef =  (await getDocs(collection(getFirestore(), "Countries")));
       const list =  citiesRef.docs.map((doc)=>{
        console.log(doc.data());
        return doc.data();
     });
     debugger;

     return list;
};

    static  async  readHospitals  () {
        debugger;
        const hospitalsRef =  (await getDocs(collection(getFirestore(), "Hospitals")));
        const list =  hospitalsRef.docs.map((doc)=>{
            console.log(doc.data());
            return doc.data();
        });
        debugger;

        return list;
    };



};