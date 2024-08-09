"use client"
import { Avatar, Button, Form, Input, Select, message } from 'antd'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
const ClientUI = () => {
    const [loadings, setLoadings] = useState<boolean>();
    const [quotes, setQuotes] = useState<any>([])
    const [show, setShow] = useState<Number>(0)
    const [read, setRead] = useState(true)
  const [bgGradient, setBgGradient] = useState<string>(''); // State to hold the background gradient



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



    const generateRandomNumber = () => {
        // Generate a random number between 0 and 10^(length) - 1
        setLoadings(true)
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * (Number(quotes.length)));
            console.log("randomNum  ", randomNum);
            setLoadings(false)
            message.success("Generate random quote")
            setShow(randomNum)
        }, 1000)
    }


    const generate = async () => {
        setLoadings(true)
        try {
            const url = "https://groupcoder-nestjs.vercel.app/quotes/random"
            const api = await fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })

            if (!api.ok) {
                console.log("generate quotes error");
            }

            const data = await api.json();

            setQuotes(data)
            // setQlength(data.length)
            console.log("generate quotes data =>", data);
            setLoadings(false)
        } catch (error) {
            console.log("generate quotes error =>", error);
        } finally {
            setLoadings(false)
        }
    };


    useEffect(() => {
        generate()
    }, [])


    const createQuote = async (value: any) => {
        setLoadings(true)
        console.log("working", value);

        try {


            const url = "https://groupcoder-nestjs.vercel.app/quotes"
            const api = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    quote: value.quote,
                    writter: value.writter
                })
            })

            if (!api.ok) {
                message.error("something went wrong")
                return null
            }

            message.success("Created successful");
            setLoadings(false)
        } catch (error) {
            message.error("somthing went wrong")
            console.log("createQuotte error =>", error);
        }
        finally {
            setLoadings(false)
        }
    }


    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        if (value !== "read") {
            setRead(false)
        } else {
            setRead(true)
        }
    };

    console.log("true-------", read);
    return (
        <Fragment>
            <Form
                onFinish={createQuote}
            >
                <div className=' h-[90vh] w-full flex items-center' style={{ background: bgGradient }}>
                    <div className='bg-slate-400 h-[70vh] w-[80%] rounded-lg mx-auto  p-5 '>
                        {/* <div className='mb-2 flex  items-center'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> 
            <span className='ml-2 bg-white px-3'>dfksdfjl</span>
            </div> */}
                        <nav className='flex justify-between bg-slate-500 p-2 rounded-lg items-center'>
                            <Select
                                defaultValue="Quotes Type"
                                style={{ width: 220 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'read', label: 'READING MODE' },
                                    { value: 'write', label: 'DEVELOPMENT MODE' },
                                ]}
                            />
                            {
                                read == true ? <Button type="primary" loading={loadings} onClick={generateRandomNumber}>
                                    Generate Quotes
                                </Button> : <Button type="primary" loading={loadings} htmlType='submit'>
                                    Create Quotes
                                </Button>
                            }
                        </nav>
                        {read == true ? <section className=' relative bg-white w-full mt-10 h-[70%] p-5 rounded'>
                            {quotes.length > 0 && (
                                <p className='text-xl font-semibold'>{quotes.quote}</p>
                            )}
                            {quotes.length > 0 && (
                                <span className='absolute end-5 bottom-5'>Created by <span className='text-red-700'>{show !== null && show !== undefined && quotes[Number(show)]
                                    ? quotes[Number(show)].writter
                                    : ''}</span></span>
                            )}
                        </section> :
                            <section className=' relative bg-white w-full mt-10 h-[70%] p-5 rounded'>

                                <p className='text-xl font-semibold'>
                                    <Form.Item name='quote'>
                                        <TextArea
                                            showCount
                                            maxLength={100}
                                            minLength={10}
                                            required
                                            // onChange={onChange}
                                            // status="warning"
                                            placeholder="type your quotes or shayri....."
                                            style={{ height: 180, resize: 'none' }}
                                        />
                                    </Form.Item>
                                </p>


                                <span className='absolute end-10 bottom-5'><span className='text-red-700'>
                                    <Form.Item name='writter'>
                                        <Input
                                            required
                                            size="large" placeholder="type your name" prefix={<UserOutlined />} />
                                    </Form.Item>
                                </span></span>
                            </section>}
                    </div>
                </div>
            </Form>
        </Fragment >
    )
}
export default ClientUI