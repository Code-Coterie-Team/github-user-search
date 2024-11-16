

function Header(){
    return(
        <div className="bg-white w-full h-28 flex border-b-2 justify-left align-middle ">
            <div className="w-2/12  border-r-2 text-center  p-8">kanban </div>
            <div className="flex justify-between p-8 w-full align-middle ">
                <h2  className="">Marketing Plan</h2>
                <div  className="flex justify-start"><button className="bg-purple-950 rounded text-white p-2  ">+ Add New Task</button></div>
            </div>
        </div>
    )
}

export default  Header;