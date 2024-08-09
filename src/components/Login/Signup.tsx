"use client"
import { Api } from '@/utils/GroupCoder';
import { Button, Card, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

const Signup: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState(true);
  const [bgGradient, setBgGradient] = useState<string>('');
  const [email,setEmail] = useState("")
  const api = new Api();


  const router = useRouter();

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomGradient = () => {
    const color1 = generateRandomColor();
    const color2 = generateRandomColor();
    const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
    return gradient;
  };

  useEffect(() => {
    setBgGradient(generateRandomGradient());
  }, []);

  const handleLogin = async (value: any) => {
    setEmail(value.email)
    console.log("Form values:", value);
    setLoadings(true);
    try {

      const body = {
        email: value.email,
        password: value.password
      };

      const apiRes = await api.Auth.signin(body);
      console.log("API response:", apiRes);

      // Check if apiRes is defined and has the ok property
      if (!apiRes || !apiRes.ok) {
        message.error(apiRes.massege);
        console.log("Login failed.", apiRes.massege);
        return;
      }

      message.success("OTP semd your email");
      console.log("handleLogin response =>", apiRes);
      setIsLogin(false)

    } catch (error) {
      console.log("handleLogin error =>", error);
      message.error("An error occurred during login");
    } finally {
      setLoadings(false);
    }
  };

  const handleOTPSubmit = async (values: any) => {
    console.log(values);
    
    setLoadings(true)
    const data = {
      otp: Number(values.otp),
      email: email
    }
    try {
      const apiRes = await api.Auth.otpVerify(data)

      console.log("handleOTPSubmit =>",apiRes);

      if (!apiRes.ok) {
        message.error("Invailid otp!")
        return
      }
      message.success("Login successful")
      router.push("/quotes")

      
    } catch (error) {
      message.error("Invailid otp!")
      console.log(error);
    } finally{
      setLoadings(false)
    }
  };


  return (
    <div className='w-[100vw] min-h-[92vh] flex justify-center items-center' style={{ background: bgGradient }}>
      <Card title={isLogin ? "Group Coder Sign-Up" : "Verify OTP"} style={{ width: "40%" }}>
        {isLogin ? (
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loadings}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Login
            </Button>
          </Form>
        ) : (
          <Form layout="vertical" onFinish={handleOTPSubmit}>
            <Form.Item
              label="OTP"
              name="otp"
              rules={[{message: 'Please input the OTP sent to your email!' }]}
            >
              <Input placeholder="OTP" />
            </Form.Item>
              <span className='mt-2 ml-1 opacity-50 text-green-500'>{`${email.slice(0,3)}****${email.slice(email.length-8)}`}</span>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadings}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Verify OTP
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Signup;
