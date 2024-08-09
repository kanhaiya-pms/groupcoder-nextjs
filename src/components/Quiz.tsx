
"use client"
// components/QuizAnalysis.js
import { Card, Progress, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const QuizAnalysis = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <Card className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Title level={2}>It&lsquo;s Time to Quiz</Title>
          <Text className="text-xl text-gray-500">JavaScript &gt; JavaScript Quiz</Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 text-center">
            <Title level={4}>Rank</Title>
            <Text className="text-2xl">1627 / 1689</Text>
            <Text className="text-red-500">Poor</Text>
            <Text className="text-gray-500">1689 Participants</Text>
          </div>
          <div className="col-span-1 text-center">
            <Title level={4}>Score</Title>
            <Text className="text-2xl">0/30</Text>
            <Text className="text-gray-500">Time</Text>
            <Text className="text-xl">00:00:04</Text>
          </div>
          <div className="col-span-1 text-center">
            <Title level={4}>Attempts</Title>
            <Text className="text-2xl">0</Text>
            <Text className="text-gray-500">Accuracy</Text>
            <Text className="text-xl">0%</Text>
          </div>
        </div>
        <div className="my-8">
          <Progress type="circle" percent={0} format={() => 'Skipped'} />
        </div>
        <div className="grid grid-cols-6 gap-4">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="text-center">
              <Button type="default" shape="circle" size="large">
                {i + 1}
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button type="primary" className="mr-4">Go to Quizzes</Button>
          <Button type="default">View Solution</Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizAnalysis;
