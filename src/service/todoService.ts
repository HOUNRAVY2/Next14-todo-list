import { collection, getDocs, getDoc, QueryDocumentSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/util/firebaseConfig';
import { Todo } from '@/type/todo.type';

 const getAllTodos = async (): Promise<Todo[]> => {
  const snapshot = await getDocs(collection(db, 'todo'));
  return snapshot.docs.map((doc: QueryDocumentSnapshot) => {
    const data = doc.data();
    return {
      id: doc.id,
      todo: data.todo,
      isCompleted: data.isCompleted,
      createdAt: data.createdAt
    };
  });
};


const createTodo = async (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'todo'), {
    ...todoData,
    createdAt: serverTimestamp(),
  });

  return {
    firestoreId: docRef.id, 
    ...todoData,
    createdAt: new Date()   
  };
};

const deleteTodo = async (id: string) => {
  const docRef = doc(db, 'todo', id);
  if (!(await getDoc(docRef)).exists()) {
  return{
    error: 'todo not found',
    success: false
  } 
  };
  await deleteDoc(docRef);
}

 const updateTodo = async (id: string, todoData: Partial<Todo>): Promise<Todo | unknown> => {
  const docRef = doc(db, 'todo', id);
  await updateDoc(docRef, todoData);
const updatedDoc = await getDoc(docRef);
  const data = updatedDoc.data() as Todo;
  return {
    id: updatedDoc.id,
    todo: data.todo,
    isCompleted: data.isCompleted,
    createdAt: data.createdAt?.toDate()?.toISOString(),
  };
};


export {getAllTodos, createTodo , deleteTodo, updateTodo};