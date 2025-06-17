import "../../../globals.css"

export  default async function ProfilePage({
    params
}:{
    params:Promise<{username:string}>
}){
  const {username}=await params

  return <div className="outerlayer">
      <div className="toplayer bg-gradient-to-r from-purple-600 to-indigo-600">dev Connect</div>
      <div className="bottomlayer">
        <div className="leftside">
          <div className="image">
            image
          </div>
          <div className="options">
            <h1>option 1</h1>
            <h1>option 2</h1>
            <h1>option 3</h1>
            <h1>option 4</h1>
            <h1>option 5</h1>
          </div>
        </div>
        <div className="rightside">profile side</div>
      </div>
  </div>
}