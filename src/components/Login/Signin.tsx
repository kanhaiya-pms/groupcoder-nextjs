"use client"
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

const Signin = () => {

  const router = useRouter()
  const [loadings, setLoadings] = useState<boolean>();

  const handleChange = (value: any) => {
    console.log(value);
  };



  const onFinish = async (value: any) => {
    setLoadings(true)
    try {
      
   
    console.log("nofinish all data =>", value);

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
      message.error("something went roung")
      console.log("user inserted erro");
      return null
    }
    const response = await api.json()
    console.log("response---------------", response);
    message.success("Account created successful")
    router.push('/signup')
  } catch (error) {
    message.error("something went roung");
    console.log("onfinish error =>",error);
  } finally {
    setLoadings(false)
  }
  }
  return (
    <Fragment>
      <div className='w-[100vw] min-h-[92vh] flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500'>
        {/* <div className='h-[75%] w-[40%]  bg-slate-200 rounded-lg shadow-lg p-12'> */}
        <Card title="Group Coder Sign-Up" style={{ width: "40%" }}>
          <Form

            onFinish={onFinish}
            layout="vertical">



            <Row className='flex justify-between'>
              <Col span={11}>
                <Form.Item label="First Name" required name="fname">
                  <Input placeholder="first name" required />
                </Form.Item>
              </Col>

              <Col span={11}>
                <Form.Item label="Last name" required name="lname">
                  <Input placeholder="Last name" required />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="slider" required name="slider">
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
                <Form.Item label="mobile" required name="mobile">
                  <Input placeholder="mobile" required />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="email" required name="email">
                  <Input placeholder="email" required />
                </Form.Item>
              </Col>
            </Row>

            <Row className='flex justify-between'>
              <Col span={11}>
                <Form.Item label="password" required name="password">
                  <Input placeholder="password" required />
                </Form.Item>
              </Col>
              <Col span={11}>

                <Form.Item label="Confirm password" required name="confirmpassword">
                  <Input placeholder="confirm password" required />
                </Form.Item>

              </Col>
            </Row>

            <Button loading={loadings}  type="primary" htmlType='submit' style={{ width: "100% ", marginTop: "10px" }}>Submit</Button>
          </Form>

        </Card>
      </div>

</Fragment >
  )
}

export default Signin












