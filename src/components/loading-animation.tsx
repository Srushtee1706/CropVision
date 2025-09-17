"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sprout, CloudRain, Sun, Thermometer } from "lucide-react"

interface LoadingAnimationProps {
  cropType: string
}

export function LoadingAnimation({ cropType }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: Sprout, text: `Analyzing ${cropType} growth patterns...`, duration: 800 },
    { icon: CloudRain, text: "Processing weather data...", duration: 700 },
    { icon: Thermometer, text: "Evaluating soil conditions...", duration: 600 },
    { icon: Sun, text: "Calculating yield predictions...", duration: 900 },
  ]

  useEffect(() => {
    let totalTime = 0
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0)

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index)
      }, totalTime)

      totalTime += step.duration
    })

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, totalDuration / 100)

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = steps[currentStep]?.icon || Sprout

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CurrentIcon className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin border-t-primary"></div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-balance">Analyzing Your Crop Data</h3>
              <p className="text-lg text-muted-foreground">{steps[currentStep]?.text || "Processing..."}</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground">{progress}% Complete</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                      index <= currentStep ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    <StepIcon className="h-6 w-6" />
                    <span className="text-xs text-center">
                      {step.text.split(" ")[0]} {step.text.split(" ")[1]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
