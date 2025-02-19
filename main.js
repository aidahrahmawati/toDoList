import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNYqYJVYPTZRIK7pKZ4shbQ4igjseQpLM",
  authDomain: "insan-cemerlang-d724d.firebaseapp.com",
  projectId: "insan-cemerlang-d724d",
  storageBucket: "insan-cemerlang-d724d.appspot.com",
  messagingSenderId: "630693962922",
  appId: "1:630693962922:web:a9447f760b858bcf781cd3"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarToDoList() {
  const refDokumen = collection(db, "toDoList");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      prioritas: dok.data().prioritas,
      status: dok.data().status,
      tanggal: dok.data().tanggal,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahToDoList(nama, prioritas, status, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'toDoList'), {
      nama: nama,
      prioritas: prioritas,
      status: status,
      tanggal: tanggal 
    });
    console.log('Berhasil menambah toDoList ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah toDoList ' + e);
  }
}

export async function hapusToDoList(docId) {
  await deleteDoc(doc(db, "toDoList", docId));
}  

export async function ubahToDoList(docId, nama, prioritas, status, tanggal) {
  await updateDoc(doc(db, "toDoList", docId), {
    nama: nama,
    prioritas: prioritas,
    status: status,
    tanggal: tanggal
  });
}

export async function ambilToDoList(docId) {
  const docRef = await doc(db, "toDoList", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

