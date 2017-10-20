import React from 'react'
import AddFishForm from './AddFishForm'
import base from '../base'

class Inventory extends React.Component {
constructor(){
  super()
  this.renderInventory = this.renderInventory.bind(this)
  this.renderLogin = this.renderLogin.bind(this)
  this.authenticate = this.authenticate.bind(this)
  this.authHandler = this.authHandler.bind(this)
  this.logout = this.logout.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.state = {
    uid:null,
    owner:null
  }
}

componentDidMount(){
  base.onAuth((user) => {
    if(user){
      this.authHandler(null,{user})
    }
  })
}

handleChange(e,key){
  const fish = this.props.fishes[key]
  const updatedFish = {...fish,
  [e.target.name]:e.target.value
}
this.props.updatedFish(key,updatedFish)
}

authenticate(provider){
  console.log('trying to login')
  base.authWithOAuthPopup(provider,this.authHandler)
}

logout(){
  base.unauth()
  this.setState({uid:null })
}

authHandler(err, authData){
  if(err) {
    console.log(err)
    return
  }
  //grab the store info
  const storeRef=base.database().ref(this.props.storeId)
  storeRef.once('value',(snapshot)=> {
    const data = snapshot.val()||{}

    if(!data.owner){
      storeRef.set({
        owner:authData.user.uid
      })
    }
    this.setState({
      uid:authData.user.uid,
      owner:data.owner || authData.user.uid
    })
  })
}

renderLogin() {
  return (
    <nav className="login">
      <h2>Inventory</h2>
      <p>Sign in to manage your store's inventory</p>
      <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
      <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
      <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
    </nav>
  )
}

 renderInventory(key){
   const fish = this.props.fishes[key ]
   return (
     <div className ='fish-edit' key={key}>
        <input type="text" name ='name' value = {fish.name} placeholder='name'
          onChange={(e)=> this.handleChange(e,key)}/>
        <input type="text" name ='price'value = {fish.pric} placeholder='price'
          onChange={(e)=> this.handleChange(e,key)}/>
        <select type="text" name ='status'value = {fish.status} placeholder='status'
          onChange={(e)=> this.handleChange(e,key)}>
          <option value= 'available'> Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea type="text" name ='desc'value = {fish.desc} placeholder='desc'
          onChange={(e)=> this.handleChange(e,key)}>
        </textarea>
        <input type="text" name ='image' value = {fish.image} placeholder='image'
          onChange={(e)=> this.handleChange(e,key)}/>
        <button onClick={()=>this.props.removeFish(key)}>Remove Fish</button>
     </div>
   )
 }
  render(){
    const logout = <button onClick={this.logout}>Log out</button>
    //check login
    if(!this.state.uid){
      return( <div>{this.renderLogin()}</div>)
    }

    // check they are owner
    if(this.state.uid !== this.state.owner){
      return(
        <div>
          <p>Sorry you aren't the ownder of this store!</p>
          {logout}
        </div>
      )
    }
    return(
      <div>
        <p>Inventory</p>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm addFish = {this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load sample Fish</button>
    </div>

    )
  }
}

Inventory.PropTypes = {
  fish:React.PropTypes.object.isRequired,
  updatedFish:React.PropTypes.func.isRequired,
  removeFish:React.PropTypes.func.isRequired,
  addFish:React.PropTypes.func.isRequired,
  loadSamples:React.PropTypes.func.isRequired,
  storeId:React.PropTypes.string.isRequired
}

export default Inventory
