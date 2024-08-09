"use client"
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Typical from 'react-typical';

const features = [
  "Easy to use",
  "Free for all",
  "Collaborate seamlessly",
  "Real-time updates"
];

export default function Home() {
  const featureRef = useRef(null as any);
  const currentFeatureIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentFeatureIndex.current = (currentFeatureIndex.current + 1) % features.length;
      if (featureRef.current) {
        featureRef.current.innerHTML = features[currentFeatureIndex.current];
      }
    }, 1000); // Change feature every 4 seconds to allow typewriting effect to complete

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-400 h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to GroupCoder</h1>
        <p className="text-lg mb-8">Where collaboration meets simplicity</p>
        <p className="text-2xl mb-8">
          <span ref={featureRef}>
            <Typical
              steps={[features[currentFeatureIndex.current], 3000]}
              loop={Infinity}
              wrapper="span"
            />
          </span>
        </p>
        <Link href={"/signin"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
