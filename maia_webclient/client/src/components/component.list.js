import {Component} from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import reqwest from 'reqwest';
import '../list.css'

const count = 3;
var start = 0;
var DataUrl;
// = `http://localhost:3080/highlights?limit=${count}&offset=${start}`;

class LoadMoreList extends Component {
  state = {
    initLoading: true,
    loading: false,
    stoploader:false,
    data: [],
    list: [],
    
  };

  componentDidMount() {
    DataUrl = `http://localhost:3080/highlights?limit=${count}&offset=${start}`;
    this.getData(DataUrl/*res => {
      this.setState({
        initLoading: false,
        data: res,//.results
        list: res,
      });
    }*/).then(
      async res => {
        const response = await res.json();
        this.setState({
          initLoading: false,
          data: response,//.results
          list: response,
        });
      }
    );
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
    });
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

  onLoadMore = () => {
    
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    console.log('before '+start);
    start=start+count;
    console.log('after '+start);
    DataUrl = `http://localhost:3080/highlights?limit=${count}&offset=${start}`;
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
    });
    
  };

  render() {
    const { initLoading, loading, list,stoploader } = this.state;
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
                title={<a href="https://ant.design">{item}</a>}
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

export default LoadMoreList;