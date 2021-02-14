import React,{Component,useState} from 'react'
import { Typography, Slider } from 'antd';
const { Paragraph } = Typography;


const EditHighlight = (props)=>{
    const [editableStr, setEditableStr] = useState(props.string);
    return (
        <>
            <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
        </>
    );
}
/*s
const Highlightsview = (props) => {
    
   const [rows, setRows] = useState(1);
  
    const onChange = rows => {
        console.log('change rows '+rows);
        setRows({ rows });
        console.log('after change rows '+rows);
        
    };
  
    
      //const { row } = {rows};
      
      var article =
        "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life";
        const [editableStr, setEditableStr] = useState(article);

        return (
            console.log('row in ret '+rows),
        <>
          <Slider value={rows} min={1} max={10} onChange={onChange} />
          <Paragraph
            ellipsis={{
              rows,
              expandable: true,
              suffix: '--William Shakespeare',
              onEllipsis: ellipsis => {
                console.log('Ellipsis changed:', ellipsis);
              },
            }}
            title={`${article}--William Shakespeare`}
            editable={{ onChange: setEditableStr }}
          >
            {editableStr}
          </Paragraph>
        </>
      );
    
  }*/

  class Highlightsview extends Component {
      constructor(props){
        super(props);
        this.state = {
            rows: 1,
          };
      };
    getData(){
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        };
        const url =`/highlights?topic=${this.props.topic}`;
        fetch(url,requestOptions);
    }
    
  
    onChange = rows => {
      this.setState({ rows });
    };
  
    render() {
      const { rows } = this.state;
      const highlightData = this.props.topic;
      console.log('props data '+highlightData.topic);
      //const article = highlightData[0].text.dat;
       // "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life";
        
        return (
        <>
          <Slider value={rows} min={1} max={10} onChange={this.onChange} />
          <Paragraph
            ellipsis={{
              rows,
              expandable: true,
              suffix: '--William Shakespeare',
              onEllipsis: ellipsis => {
                console.log('Ellipsis changed:', ellipsis);
              },
            }}
            title={`${highlightData.topic}--William Shakespeare`}
          >
              
              {highlightData.topic}
              
            
          </Paragraph>
        </>
      );
    }
  }


export default Highlightsview;