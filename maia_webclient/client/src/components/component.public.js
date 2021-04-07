import {Component} from 'react'
import { Typography, Divider,Layout } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const { Content } = Layout;
const blockContent = `This is not chinese`;
var DataUrl

class Publicview extends Component {
constructor(props){
    super(props);
    this.state = {
        page: []
    };

}

componentDidMount(){
    var topic = 'Telehypnosis'
    DataUrl = `http://localhost:3080/public?topic=${topic}`;
    this.getData(DataUrl).then(
        async res => {
          const response = await res.json();
          console.log(response);
          this.setState({
            page: response
          });
        }
      ).catch(err=>{console.log(err.message)});
}

getData (DataUrl) {
    var requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }
    console.log('in getData fxn '+DataUrl);
    //fetch(DataUrl,requestOptions);
    return new Promise(function(resolve,reject){
      resolve(fetch(DataUrl,requestOptions));
    }).catch(err=>{console.log(err.message)});
  }
//style={{ padding: 24, textAlign: 'center' }} margin: '24px 16px 0', 
//style={{ marginLeft: 50 }}
render(){
    return (
        
           
                <div style={{  overflow: 'initial', backgroundColor: 'white' }}>
                    <div className="site-layout-background" style={{marginLeft: 50, marginTop:20, marginRight:50}} >
                    <Typography>
                        
                        {this.state.page.map(i => <Title>{i.topic}</Title>)}
                        {this.state.page.map(i => <Title level={5}>Author { i.userid}</Title>)}


                        {this.state.page.map(i => <Paragraph>{i.text.dat}</Paragraph>)}
                        <Paragraph>
                            
                        In the process of internal desktop applications development, many different design specs and
                        implementations would be involved, which might cause designers and developers difficulties and
                        duplication and reduce the efficiency of development.
                        </Paragraph>
                        <Paragraph>
                        After massive project practice and summaries, Ant Design, a design language for background
                        applications, is refined by Ant UED Team, which aims to
                        <Text strong>
                            uniform the user interface specs for internal background projects, lower the unnecessary
                            cost of design differences and implementation and liberate the resources of design and
                            front-end development
                        </Text>.
                        </Paragraph>
                        <Title level={2}>Guidelines and Resources</Title>
                        <Paragraph>
                        We supply a series of design principles, practical patterns and high quality design resources
                        (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
                        prototypes beautifully and efficiently.
                        </Paragraph>

                        <Paragraph>
                        <ul>
                            <li>
                            <Link href="/docs/spec/proximity">Principles</Link>
                            </li>
                            <li>
                            <Link href="/docs/spec/overview">Patterns</Link>
                            </li>
                            <li>
                            <Link href="/docs/resources">Resource Download</Link>
                            </li>
                        </ul>
                        </Paragraph>

                        <Paragraph>
                        Press <Text keyboard>Esc</Text> to exit...
                        </Paragraph>

                        <Divider />
                    </Typography>
                    </div>
                    </div>
            
       
    );
}
}

export default Publicview;