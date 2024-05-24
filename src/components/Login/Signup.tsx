"use client"
import { Button, Card, Form, Input, message, } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Signup = () => {
  const [loadings, setLoadings] = useState<boolean>();

  const router = useRouter()

  const handlelogin = async (value: any) => {
    console.log(value);
    setLoadings(true)
    try {
      
      const url = "https://groupcoder-nestjs.vercel.app/users/login"
      const api = await fetch(url,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:value.email,
          password:value.password
        })
      })

      if (!api.ok) {
        message.error("something went wrong")
        console.log("handellogin error ");
        return null
      }

      const apiRes = await api.json()
      message.success("login successful")
      console.log("handellogin response =>",apiRes);
      const searchParam = new URLSearchParams({
        id:apiRes._id
      });
      router.push(`/quotes?${searchParam.toString()}`)
      

      


    } catch (error) {
      console.log("handellogin error =>",error)
    } finally {
      setLoadings(false)
    }
  };



  
  return (
    <div className=' w-[100vw] min-h-[92vh] flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500'>
      <Card title="Group Coder Sign-Up" style={{ width: "40%" }}>
        <Form layout="vertical" 
        onFinish={handlelogin}
        >

          
            <Form.Item label="Email" required name="email">
              <Input placeholder="email" required />
            </Form.Item>

            <Form.Item label="Password" required name="password">
              <Input placeholder="password" required />
            </Form.Item>

          <Button type="primary" 
         htmlType='submit' loading={loadings} style={{ width: "100% ", marginTop: "10px" }}>Submit</Button>
        </Form>

      </Card>
    </div>
    
  )
}
         




export default Signup












