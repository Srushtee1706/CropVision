"use client";
import { useState } from 'react';
import CropPredictionForm, { formSchema } from '../../components/CropPredictionForm';
import { LoadingAnimation } from '@/components/loading-animation';
import { PredictionResults } from '@/components/prediction-results';
import z from 'zod';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'sonner';


export interface CropFormData {
  district: string
  crop: string
  season: string
  sow_date: Date
  farmSize?: number
  soilType?: string
  irrigationType?: string
  previousCrop?: string
}

export interface PredictionData2 {
  predicted_environmental_conditions: {
    season_total_rainfall_mm: number,
    season_avg_temp_c: number,
    season_avg_humidity: number
  },
  predicted_soil_conditions: {
    soil_pH: number,
    soil_N_kg_ha: number,
    soil_P_kg_ha: number,
    soil_K_kg_ha: number,
    organic_carbon_pct: number,
    soil_moisture_pct: number
  },
  predicted_fertilizer_recommendation: {
    N: number,
    P: number,
    K: number
  },
  predicted_yield_kg_per_ha: number,
  predicted_harvest_days: number
}

export default function CropPredictionPage() {
  const [currentStep, setCurrentStep] = useState<"form" | "loading" | "results">("form")
  const [formData, setFormData] = useState<CropFormData | null>(null)
  const [predictionData2, setPredictionData2] = useState<PredictionData2 | null>(null)
  const [pdf, setPdf] = useState<string | null>(null);

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
  setFormData(data);
  setCurrentStep("loading");

  try {
    const formatedDate = format(data.sow_date, "yyyy-MM-dd");

    const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`, {
      district: data.district,
      crop: data.crop,
      season: data.season,
      sowing_date: formatedDate
    });
    const resp2 = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/download-report`, {
      district: data.district,
      crop: data.crop,
      season: data.season,
      sowing_date: formatedDate
    });
    setPdf(resp2.data);

    setPredictionData2(resp.data);
    setCurrentStep("results");

  } catch (err: any) {
    if (err.response) {
      toast.error(err.response.data.detail, {
        position: "bottom-center"
      });
    } else {
      toast.error(err.message);
    }
    setCurrentStep("form"); 
  }
};
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex w-full flex-col items-center p-6">
      <h1 className="text-7xl font-extrabold text-green-700 mb-6 text-center">
        Crop Yield Predictor
      </h1>

      {currentStep === "form" && <CropPredictionForm onSubmit={handleFormSubmit} />}

        {currentStep === "loading" && <LoadingAnimation cropType={formData?.crop || "crop"} />}

        {currentStep === "results" && predictionData2 && formData && pdf && (
          <PredictionResults data={predictionData2} formData={formData}  pdfString={pdf} />
        )}
    </main>
  );
}