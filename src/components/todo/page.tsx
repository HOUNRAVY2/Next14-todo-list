import List from "./list";

export default function TodoList() {
 return(
  <main className=" container-full overflow-hidden">
    <div className="flex justify-center items-start">
      <div className="md:w-[500px] w-full h-screen bg-white">
       <List/>
      </div>
    </div>
  </main>
 );

}