import { Button, Form, Input, message, } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPages = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish =  async ( values ) => {
    try{
      setLoading(true);
      await axios.post("https://reqres.in/api/login", values);
      setLoading( false );
      navigate("/dashboard");

    } catch(err){
      message.error('ERROR')
    }
  };
  return (
    <div style={{ height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Form
        name="login"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button loading={loading} style={{width: '100%'}} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPages