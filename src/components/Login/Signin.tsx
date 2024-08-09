"use client"
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState, useEffect } from 'react'

const Signin = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const [loadings, setLoadings] = useState<boolean>(false);
  const [bgGradient, setBgGradient] = useState<string>(''); // State to hold the background gradient

  const handleChange = (value: any) => {
    console.log(value);
  };

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
    setBgGradient(generateRandomGradient()); // Set the background gradient when the component mounts
  }, []);

  const onFinish = async (value: any) => {
    setLoadings(true)
    try {
      console.log("onFinish all data =>", value);

      const url = "https://groupcoder-nestjs.vercel.app/users"
      const api = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fname: value.fname,
          lname: value.lname,
          email: value.email,
          phone: value.mobile,
          password: value.password,
          role: value.slider
        })
      })

      if (!api.ok) {
        message.error("Something went wrong")
        console.log("User insertion error");
        return null
      }
      const response = await api.json()
      console.log("response---------------", response);
      message.success("Account created successfully")
      router.push('/signup')
    } catch (error) {
      message.error("Something went wrong");
      console.log("onFinish error =>", error);
    } finally {
      setLoadings(false)
    }
  }

  const validatePasswords = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Passwords do not match!'));
    },
  });

  return (
    <Fragment>
      <div className='w-[100vw] min-h-[92vh] flex justify-center items-center' style={{ background: bgGradient }}>
        <Card title="Group Coder Sign-Up" style={{ width: "40%" }}>
          <Form onFinish={onFinish} layout="vertical">
            <Row className='flex justify-between'>
              <Col span={11}>
                <Form.Item label="First Name" required name="fname">
                  <Input placeholder="First name" required />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Last name" required name="lname">
                  <Input placeholder="Last name" required />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Access" required name="slider">
              <Select
                style={{ width: "100%" }}
                onChange={handleChange}
                options={[
                  { value: 'Serviceprovider', label: 'SERVICE PROVIDER' },
                  { value: 'Servicetaker', label: 'SERVICE TAKER' },
                ]}
              />
            </Form.Item>

            <Row className='flex justify-between'>
              <Col span={11}>
                <Form.Item label="Mobile" required name="mobile">
                  <Input placeholder="Mobile" required />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Email" required name="email">
                  <Input placeholder="Email" required />
                </Form.Item>
              </Col>
            </Row>

            <Row className='flex justify-between'>
              <Col span={11}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmpassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    validatePasswords,
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
              </Col>
            </Row>

            <Button loading={loadings} type="primary" htmlType='submit' style={{ width: "100%", marginTop: "10px" }}>Submit</Button>
          </Form>
        </Card>
      </div>
    </Fragment>
  )
}

export default Signin
