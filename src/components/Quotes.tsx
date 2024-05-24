"use client"
import { Button, Select } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
const ClientUI = () => {
    const [logoutloadings, setLogoutLoadings] = useState<boolean[]>([]);
    const [loadings, setLoadings] = useState<boolean[]>([]);

   




    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };
    const logoutLoading = (index: number) => {
        setLogoutLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLogoutLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <Fragment>
            <div className='bg-red-400 h-[90vh] w-full flex items-center'>
                {/* <nav className='flex justify-between p-5 bg-red-800 justify-center textalign-center'>
      <div className='flex gap-4'>
        <span className='border border-dotted lg:border-4 md:border-4 sm:border-4  rounded-[50%] p-2 lg:text-2xl sm:text-xl font-bold text-white'>G<span className='text-cyan-400'>C</span></span>
        <span className='text-white lg:text-3xl sm:text-xl mt-2  font-bold italic' style={{textShadow:" green"}}>Group<span className='text-cyan-400 italic'>Coder</span></span>
      </div>
      <div className='flex gap-2'>
      <Avatar size="large" icon={<UserOutlined />} />
        <Button type="primary" loading={logoutloadings[0]} onClick={() => logoutLoading(0)}>
          Logout
        </Button>
      </div>
    </nav> */}
                <div className='bg-slate-400 h-[70vh] w-[80%] rounded-lg mx-auto  p-5'>
                    <nav className='flex justify-between bg-slate-500 p-2 rounded-lg items-center'>
                        <Select
                            defaultValue="Quotes Type"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                                { value: 'Motivational', label: 'Motivational' },
                                { value: 'Inspirational', label: 'Inspirational' },
                                { value: 'Love', label: 'Love Quotes' },
                                { value: 'Sad', label: 'Sad Quotes' },
                                { value: 'Funny', label: 'Funny Quotes' },
                            ]}
                        />
                        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                            Generate Quotes
                        </Button>
                    </nav>
                    <section className=' relative bg-white w-full mt-10 h-[70%] p-5 rounded'>
                        <p className='text-xl font-semibold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia excepturi similique accusantium dolor? Cumque praesentium autem reiciendis sint enim laudantium?</p>
                        <span className='absolute end-5 bottom-5'>Created by <span className='text-red-700'>Vikas Kumar</span></span>
                    </section>
                </div>
            </div>
        </Fragment>
    )
}
export default ClientUI