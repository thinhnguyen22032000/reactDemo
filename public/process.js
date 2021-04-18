
 class Note extends React.Component {
   constructor(props){
     super(props);
     this.state = {onEdit: false};
     this.refInput = React.createRef();
   }
   del(param){
        $.post("/delete", {idXoa: param}, function(data) {
          list.setState({mang: data});
        } )
       
   }
   edit(){
     this.setState({onEdit: true});
   }
   cancel(){
    this.setState({onEdit: false});
  }
  save(){
    var that = this;
    $.post("/update", {idEdit:this.props.idEdit , noiDung:this.refInput.current.value}, function(data) {
      list.setState({mang: data});
      that.setState({onEdit: false});
    })
  }
  render() {
    if(this.state.onEdit){
      return (
        <div id={"div-note"}>
           <input defaultValue={this.props.children} ref={this.refInput} />
           <button onClick={()=>this.cancel(this.props.idxoa)}>huy</button>
           <button onClick={()=>this.save(this.props.idxoa)}>luu</button>
        </div>
      )
    }else{
      return (
        <div id={"div-note"}>
           <p id={this.props.id} idxoa={this.props.idxoa}>{this.props.children}</p>
           <button onClick={()=>this.del(this.props.idxoa)}>xóa</button>
           <button onClick={()=>this.edit(this.props.idxoa)}>sua</button>
        </div>
      )
    }
   
  }
}
var list;

 class ListNote extends React.Component {
   
   constructor(props){
     super(props);
     this.state = {mang: []};  
     list = this;
    
   }
   
   render(){
     return (
       <div id={"list-note"}>
         <InputNote/> 
         {
           this.state.mang.map((note, index)=>
              <Note key={index} idxoa={index} idEdit={index}>{note}</Note>
              
              
           )
         }
        
       </div>
     )
   }
   componentDidMount(){
    var listServer = this;
    $.post("/setNotes", function(data) {
      listServer.setState({mang: data});
    })
  }
 }
 class InputNote extends React.Component {
   constructor(props){
     super(props);
     this.refTxt = React.createRef();
     this.addNote = this.addNote.bind(this)
   }
   addNote(){
     $.post("/add", {note: this.refTxt.current.value}, function(data) {
        list.setState({mang: data});

     })
    
   }
   render(){
     return (
       <div>
         <input type="text" ref={this.refTxt}/>
         <button onClick={this.addNote}>add</button>
       </div>
     )
   }
 }


ReactDOM.render(
  <div>
     
     <ListNote/>
  </div>,
  document.getElementById("mydiv")
);