import {Component} from React

class Highlightview extends Component{
    constructor(props){
        super(props);
        this.state={highlight:''};
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
                <div>RESPONSE</div>
                {this.state.highlight}
            </div>
        );
    }


}

export default Highlightview;