import Home from '@/components/Home'
import QuizAnalysis from '@/components/Quiz'
import { ACCESS_TOKEN } from '@/utils/constant'
import { cookies } from 'next/headers'
import React from 'react'

const page = () => {

  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)


  return (
    <Home/>
    // <QuizAnalysis/>
  )
}

export default page