import List from "./list";

export default function TodoList() {
 return(
  <main className=" md:container-full ">
    <div className="flex justify-center items-start">
      <div className="md:w-[430px] px-[10px] w-full md:border-x-[2px] h-screen overflow-y-auto scrollbar-hidden border-white bg-novel  ">
        <div className=" relative">
       <List/>
        </div>
      
      </div>
    </div>
  </main>
 );

}