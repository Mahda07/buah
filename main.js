import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyCfqZD7UZZt-GWmtNhfJyksrv3-8ENRjto",
  authDomain: "insan-cemerlang-d5574.firebaseapp.com",
  projectId: "insan-cemerlang-d5574",
  storageBucket: "insan-cemerlang-d5574.appspot.com",
  messagingSenderId: "1035937160050",
  appId: "1:1035937160050:web:6d77d3874c3f78b2811beb",
  measurementId: "G-EVVQ80Q08C"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBuah(nama, warna, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "buah"), {
      nama: nama,
      warna: warna,
      harga: harga
    })

    // menampilkan pesan berhasil
    console.log("berhasip menyimpan data buah")
  } catch (e) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data buah" + e)
  }
}
export async function hapusBuah(id) {
    await deleteDoc(doc(basisdata,"buah",id))
  }

export async function ambilDaftarBuah() {
  const refDokumen = collection(basisdata, "buah");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = []; 
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      warna: dokumen.data().warna,
      harga: dokumen.data().harga
    })
  })
  
  return hasilKueri;
}
  
 export async function ubahBuah(id, nama,warna,harga) {
   await updateDoc(
     doc(basisdata, "buah", id),
     { 
       nama: nama,
     warna: warna,
     harga: harga 
       
     })
   }
   
   export async function ambilBuah(id) {
    const refDokumen = await doc(basisdata, "buah", id)
    const snapshotDocumen = await getDoc(refDokumen)
    
    return await snapshotDocumen.data()
  }