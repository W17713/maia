import React from 'react'
import { Result, Button } from 'antd';

const redirect = () =>{
    window.location.href='/'
}

const Error404 = () =>{
    return (
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={redirect}>Back Home</Button>}
      />        
    )
}

export default Error404;