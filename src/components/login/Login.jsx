import React from 'react';
import'./login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = values => {
    console.log('Success:', values);
    if (values.username === 'foo' && values.password === 'bar') {
      navigate('/home');
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    alert('Login failed');
  };

  return (
      <div className="login-page">
      <div className="login-box">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Contact List</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login