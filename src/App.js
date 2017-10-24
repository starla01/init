import React, { Component } from 'react';
import $ from "jquery";
import logo from './logo.svg';
import './App.css';

let names = [];
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            data: []
        };
    }
    componentDidMount() {
        const _this = this;
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            success: function(result) {
                var byName = result.slice(0);
                    byName.sort(function(a,b) {
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                _this.setState({ data: byName })
            }
        });
    }
    checkBox(status) {
        return <div className="check" > check </div>
    }
    select( event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if(value){
            let flag = true;
            let c = this.state.counter + 1;
            let n = { "id": target.id, "name" : target.name}
            $.map(names, function(val, key){
                if(val.id === target.id ){
                    flag = false;
                    if(val.name === ""){
                        val.name = target.name;
                    }
                }
            })
            if(flag){ names.push(n) }
            this.setState({counter: c})
        }else{
            let c =  this.state.counter - 1;
            $.map(names, function(val, key){
                console.log(val)
                if(val.name === target.name){
                    val.name = ''
                }
            })
            this.setState({counter: c })
        }
    }
    showList(){
        let list = ''
        $.map(names, function(val, key){
            list+= val.name + ' - ';
        })
        alert(list)
    }
    buildList() {
        const _this = this;
        return (
            this.state ? $.map(this.state.data, function(val, key) {
                return <div className="user" key={ key }>
                            <div className="quadCheck">
                                <input className="check" name={val.name} id={val.id} type="checkbox" onClick={(e) => _this.select(e)}
                                 />
                            </div>
                            <div className = "name"> { val.name } </div >
                            <div className = "mail"> { val.email } </div>
                        </div>
            }) : null
        )
    }
    render() {
        return ( <div className = "App" >
                     <header className="App-header" >
                        <img src={ logo } className = "App-logo" alt = "logo" / >
                        <h1 className="App-title" > Welcome to React </h1>
                    </header>
                    <p className="selecteds"> { this.state.counter } of {this.state ? this.state.data.length : 0 } selected</p>
                    <div className="App-intro" > { this.buildList() }  </div >
                    <div className="confirm" onClick={(e) => this.showList(e)} > Confirm </div>
                </div>
        );
    }
}
export default App;