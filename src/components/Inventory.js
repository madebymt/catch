import React from 'react'
import AddFishForm from './AddFishForm'

class Invedtory extends React.Component {
  render(){
    return(
      <div>
        <p>Inventory</p>
        <AddFishForm addFish = {this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load sample Fish</button>
    </div>

    )
  }
}

export default Invedtory
