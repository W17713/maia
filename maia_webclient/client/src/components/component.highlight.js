import {Component} from 'react';


class Highlightview extends Component{
    constructor(props){
        super(props);
        this.state={highlight:[]};
    }

    componentDidMount(){
        fetch('/highlights').then(
            res => res.json()
        ).then(
            resp => this.setState({highlight:resp})
        );
    }


    render(){
        return (
            <div>
                <h1>RESPONSE</h1>
                {this.state.highlight.userid}
            </div>
        );
    }
}

export default Highlightview;