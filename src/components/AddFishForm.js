import React from 'react'

class AddFishForm extends React.Component {
  createFish(event){
    event.preventDefault();
    console.log('fishy')
    const fish = {
      name:this.name.value,
      price:this.name.value,
      Status:this.status.value,
      desc:this.desc.value,
      image:this.image.value,
    }
    this.props.addFish(fish)
    this.fishForm.reset()

  }
  render(){
    return(
      <div>
      <form ref={(input)=> this.fishForm = input}className="fish-edit" onSubmit = {(e) => this.createFish(e)}>
        <input  ref={(input) => this.name = input}type="text" placeholder = 'Fish Name'/>
        <input  ref={(input) => this.price = input}type="text" placeholder = 'Fish Price'/>
        <select ref={(input) => this.status = input}>
          <option value="avaiable">Fresh</option>
          <option value="unavaiable"> Sold out</option>
        </select>
        <textarea ref={(input) => this.desc = input} placeholder = 'Fish Desc'></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder = 'Fish Image'/>
        <button type = 'submit'> + Add Item </button>
      </form>
     </div>


    )
  }
}

export default AddFishForm
