// This marks the component as a client-side component in Next.js
"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input"; // Import Input component (not used in the current code)
import { Button } from "@/components/ui/button"; // Import Button component

// Main Countdown component function
export default function Countdown() {
  // State variables to manage timer duration, time left, active status, and pause status
  const [duration, setDuration] = useState<number | string>(""); // State for the timer's initial duration
  const [timeLeft, setTimeLeft] = useState<number>(0); // State for the remaining time
  const [isActive, setIsActive] = useState<boolean>(false); // State to check if the timer is active
  const [isPaused, setIsPaused] = useState<boolean>(false); // State to check if the timer is paused
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the timer ID

  // Function to set the duration of the countdown timer
  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      // Set the remaining time to the duration and reset the active and paused states
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      // Clear any existing timers
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to start the countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      // Start the timer by setting active state to true and paused state to false
      setIsActive(true);
      setIsPaused(false);
    }
  };

  // Function to pause the countdown timer
  const handlePause = (): void => {
    if (isActive) {
      // Pause the timer by setting paused state to true and active state to false
      setIsPaused(true);
      setIsActive(false);
      // Clear the timer interval
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to reset the countdown timer
  const handleReset = (): void => {
    // Reset active and paused states, and set remaining time back to the duration
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    // Clear the timer interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Effect to handle the countdown logic
  useEffect(() => {
    // If the timer is active and not paused, start counting down
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          // If the time left is less than or equal to 1, clear the interval and stop the timer
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          // Decrement the time left by 1 second
          return prevTime - 1;
        });
      }, 1000); // Set interval to 1000ms (1 second)
    }
    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]); // Effect depends on `isActive` and `isPaused` states

  // Function to format time from seconds to a mm:ss string
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate remaining seconds
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`; // Return formatted time
  };

  // Function to handle input changes for the duration
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // Update the duration state with the input value, or an empty string if invalid
    setDuration(Number(e.target.value) || "");
  };

  // JSX to render the countdown timer UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Timer box container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          {/* Input field to enter duration in seconds */}
          <input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          {/* Button to set the duration */}
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Set Duration
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          {/* Start button */}
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          {/* Pause button */}
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          {/* Reset button */}
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
