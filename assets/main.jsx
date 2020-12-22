class Note extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			editing:false
		}
	}

	componentWillMount = () =>{
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150, 'px'),
			top  : this.randomBetween(0, window.innerHeight - 150, 'px')
		}
	}

	randomBetween = (x, y, s) =>{
		return(x + Math.ceil(Math.random() * (y-x)) ) + s 
	}

	edit = () =>{
		this.setState({editing:true});
	}

	save = () =>{
		this.props.onChange(this.refs.newText.value,this.props.id);
		this.setState({editing:false});
	}

	delete = (id) =>{
		this.props.onRemove(this.props.id);
	}

	renderForm = () =>{
		return(
			<div className="note" style={this.style}>
				<textarea ref="newText"></textarea><br/>
				<button onClick={this.save}>Save</button>
			</div>
		)
	}

	renderDisplay = () =>{
		return(
			<div className="note" style={this.style}>
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.edit}>Edit</button>
					<button onClick={this.delete}>X</button>
				</span>
			</div>
		)
	}

	render(){

		return( <ReactDraggable>{
				(this.state.editing) ? this.renderForm() : this.renderDisplay()
			}</ReactDraggable>
		)
	}
}

class CheckBox extends React.Component{

	constructor(props){
		super(props);
		this.state={
			checked:false
		}
	}

	onChangeHandle = () =>{
		this.setState({ checked : !this.state.checked });
	}

	render(){
		var msg;
		if (this.state.checked) {
			msg="Checked";
		}
		else{
			msg = "Unchecked";
		}
		return(
			<div>
				<input type="checkbox" onChange={this.onChangeHandle} />
				<p>This Box is {msg}</p>
			</div>
		)
	}
}

class Board extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			notes: []
		}
	}

	nextId  = () =>{
		this.uniqueid = this.uniqueid || 0
		return this.uniqueid++
	}

	add = (text) => {
		var notes = [
			...this.state.notes,
			{
				id:this.nextId(),
				note:text
			}
		]
		this.setState({notes})
	}

	update = ( newText, id) =>{
		var notes = this.state.notes.map(
			note => (note.id !== id )?
				note:
				{
					...note,
					note:newText 
				}	
		)
		this.setState({notes});
	}

	remove = (id) =>{
		var notes = this.state.notes.filter(note => note.id !== id)
		this.setState({notes})
	}

	eachNote = (note) => {
		return (
			<Note key={note.id} id={note.id} onChange={this.update} onRemove={this.remove}>{note.note}</Note>
		)
	}

	render(){
		return(
			<div className="board">
				{this.state.notes.map(this.eachNote)}	
				<button onClick={()=>this.add()}>+</button>
			</div>
		)
	}
}



ReactDOM.render(<CheckBox></CheckBox>,document.getElementById('app'));
ReactDOM.render(<Note>Hello :)</Note>,document.getElementById('app'));
ReactDOM.render(<Board count={10}></Board>,document.getElementById('app'));
