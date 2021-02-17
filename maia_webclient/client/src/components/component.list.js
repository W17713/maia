import {Component} from 'react';
import { List, Avatar, Button, Skeleton,Result } from 'antd';
import Highlightsview from './component.highlight'
import {BrowserRouter as Router,Link, Route,Switch} from 'react-router-dom'
import '../list.css'



const count = 3;
var start = 0;
var DataUrl;
// = `http://localhost:3080/highlights?limit=${count}&offset=${start}`;

class LoadMoreList extends Component {
  constructor(props){
    super(props);
    this.state = {
      initLoading: true,
      loading: false,
      stoploader:false,
      fetched:false,
      data: [],
      list: [],
      
    };
    //this.senddata=this.senddata.bind(this);
  }

  componentDidMount() {
    DataUrl = `http://localhost:3080/home?limit=${count}&offset=${start}`;
    this.getData(DataUrl/*res => {
      this.setState({
        initLoading: false,
        data: res,//.results
        list: res,
      });
    }*/).then(
      async res => {
        const response = await res.json();
        console.log(response);
        this.setState({
          initLoading: false,
          data: response,//.results
          list: response,
          fetched:true
        });
      }
    ).catch(err=>{this.handleError(err.message)});
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
    }).catch(err=>{this.handleError(err.message)});
    /*reqwest({
      url: DataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });*/
  }

  handleError(err){
    if(err=='Failed to fetch'){
      this.setState({fetched:false});
    }

    if(err=="Cannot read property 'json' of undefined"){
      this.setState({fetched:false});
    }
  }

  reload(){
    console.log('reloaded');
    window.location.reload()
  }

  senddata = (data)=>{
    this.props.homecallback(data);
  }

  onLoadMore = () => {
    
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    console.log('before '+start);
    start=start+count;
    console.log('after '+start);
    DataUrl = `http://localhost:3080/home?limit=${count}&offset=${start}`;
    console.log(DataUrl);
    this.getData(DataUrl
      /*res => {
      const data = this.state.data.concat(res);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
      
    }*/
    ).then( async resp => {
      const respo = await resp.json();
      if(respo.length===0){
        console.log('array is empty');
        this.setState(
          {
            stoploader: true,
            /*loading: true,
            initLoading:true*/
          }
        );
      }else{
        const data = this.state.data.concat(respo);
      console.log(data);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    }
    }).catch(err=>{this.handleError(err.message)});
    
  };

  render() {
    const { initLoading, loading, list,stoploader,fetched } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>load more</Button>
        </div>
      ) : null;
      if(fetched===false && initLoading===true)
      {
        return (
            <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
              extra={<Button type="primary" onClick={this.reload}>Back Home</Button>}
            />
        );
      }else{     
            return (
          
                <List
                  className="demo-loadmore-list"
                  loading={initLoading}
                  itemLayout="horizontal"
                  loadMore={loadMore}
                  dataSource={list}
                  renderItem={item => (
                    
                    <List.Item
                      actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                      <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          //title={<a href="/">{item}</a>}
                          title={<Link to="/highlights" onClick={() => this.senddata(item._id)}>{item._id}</Link>}
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                      </Skeleton>
                    </List.Item>

                  )}
                />
                
            );
  }
  }
}

export default LoadMoreList;