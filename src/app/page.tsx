import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/util/firebaseConfig';
import { Todo } from '@/type/todo.type';

export default async function Home() {
  let data:Todo[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'todo'));
   data = querySnapshot.docs.map((doc) => {
      const { todo, isCompleted, createdAt } = doc.data();
       return {
    id: doc.id,
    todo: todo ?? '',
    isCompleted: isCompleted ?? false,
    createdAt: createdAt ?? null, 
  
      } as Todo;
    });
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
  }
  console.log('Fetched data:', data);
  return (
    <main className="bg-[#0e1621] min-h-screen">
      <div className="w-[90%] lg:w-[80%] mx-auto py-4 ">
        <h1 className="text-primary  font-semibold mb-4">玄幻小说 hi</h1>
       
      </div>
    </main>
  );
}
