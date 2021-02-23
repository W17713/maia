import React from 'react'
import { Result, Button } from 'antd';
import Error404 from './component.404';

const redirect = () =>{
    window.location.href='/'
}
const Error403 = () =>{
    return (
        <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" onClick={redirect}>Back Home</Button>}
  />
    )
}

export default Error403;