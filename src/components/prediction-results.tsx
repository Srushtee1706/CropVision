"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  TrendingUp,
  Droplets,
  Thermometer,
  Sun,
  CloudRain,
  Leaf,
  BarChart3,
  RefreshCcw,
} from "lucide-react";
import { CropFormData, PredictionData2 } from "@/app/crop-prediction/page";
import { downloadBlob } from "@/lib/downloadPdf";
import { Button } from "./ui/button";
import { useState } from "react";
import { format } from "date-fns";

interface PredictionResultsProps {
  data: PredictionData2;
  formData: CropFormData;
  pdfString: string;
  onStartOver: () => void
}

export function PredictionResults({
  data,
  formData,
  pdfString,
  onStartOver
}: PredictionResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    const formatedDate = format(formData.sow_date,"yyyy-MM-dd")
    const requestData = {
      crop: formData.crop,
      season: formData.season,
      sowing_date: formatedDate,
      district: formData.district,
    };

    try {
      // 1. Make the API call from your component
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/download-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      // 2. Get the raw response data as a Blob
      const pdfBlob = await response.blob();

      // 3. Pass the Blob to your utility function to trigger the download
      downloadBlob(pdfBlob, `crop_report_${requestData.crop}.pdf`);
    } catch (err: any) {
      console.error("Failed to download report:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-balance text-foreground">
            Crop Yield Prediction Results
          </h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Based on your {formData.crop} cultivation in {formData.district}{" "}
          district
        </p>
        <div>
          <Button onClick={onStartOver} size={"lg"} variant={"outline"} className="text-black">
            <RefreshCcw /> Re-predict
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Harvest Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {Math.floor(data.predicted_harvest_days)}
              </div>
              <div className="text-sm text-muted-foreground">
                Days to Harvest
              </div>
              <div className="text-xs text-muted-foreground">
                Expected harvest:{" "}
                {new Date(
                  Date.now() + data.predicted_harvest_days * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Estimated Yield
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {data.predicted_yield_kg_per_ha}
              </div>
              <div className="text-sm text-muted-foreground">kg/ha</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Leaf className="h-5 w-5 text-primary" />
              Soil Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">pH Level</span>
                <span className="font-semibold">
                  {data.predicted_soil_conditions.soil_pH}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nitrogen</span>
                  <span className="">
                    {data.predicted_soil_conditions.soil_N_kg_ha}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phosphorus</span>
                  <span className="">
                    {data.predicted_soil_conditions.soil_P_kg_ha}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Potassium</span>
                  <span className="">
                    {data.predicted_soil_conditions.soil_K_kg_ha}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Recommended Fertilizer (N-P-K)
            </CardTitle>
            <CardDescription>
              Optimal nutrient ratios for your {formData.crop} crop
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Nitrogen (N)</span>
                  <span className="text-sm font-bold">
                    {data.predicted_fertilizer_recommendation.N} kg/ha
                  </span>
                </div>
                <Progress
                  value={
                    (data.predicted_fertilizer_recommendation.N / 200) * 100
                  }
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Phosphorus (P)</span>
                  <span className="text-sm font-bold">
                    {data.predicted_fertilizer_recommendation.P} kg/ha
                  </span>
                </div>
                <Progress
                  value={
                    (data.predicted_fertilizer_recommendation.P / 100) * 100
                  }
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Potassium (K)</span>
                  <span className="text-sm font-bold">
                    {data.predicted_fertilizer_recommendation.K} kg/ha
                  </span>
                </div>
                <Progress
                  value={
                    (data.predicted_fertilizer_recommendation.K / 80) * 100
                  }
                  className="h-2"
                />
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                Apply fertilizers in 2-3 split doses for optimal nutrient uptake
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              Predicted Environmental Conditions
            </CardTitle>
            <CardDescription>
              Predicted environmental conditions during harvest/season
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Temperature (Season Avg.)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.predicted_environmental_conditions.season_avg_temp_c} C
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Rainfall (Season total)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {
                    data.predicted_environmental_conditions
                      .season_total_rainfall_mm
                  } mm
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-cyan-500" />
                  <span className="text-sm font-medium">Humidity (Season Avg.)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.predicted_environmental_conditions.season_avg_humidity} %
                </p>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                Monitor weather conditions regularly and adjust irrigation
                accordingly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Additional Recommendations</CardTitle>
          <CardDescription>
            Tips to maximize your crop yield and quality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Pest Management</h4>
              <p className="text-sm text-muted-foreground">
                Regular monitoring for common {formData.crop} pests. Consider
                integrated pest management practices.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Water Management</h4>
              <p className="text-sm text-muted-foreground">
                Maintain optimal soil moisture levels. {formData.irrigationType}{" "}
                irrigation is suitable for your setup.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Soil Health</h4>
              <p className="text-sm text-muted-foreground">
                Regular soil testing recommended. Consider organic matter
                addition for {formData.soilType} soil.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Harvest Timing</h4>
              <p className="text-sm text-muted-foreground">
                Monitor crop maturity indicators. Harvest at optimal time for
                best quality and yield.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex w-full items-center justify-center">
        <Button className="rounded-3xl hover:scale-110" size={"lg"} onClick={handleDownload} disabled={isLoading}>
          {isLoading ? "Generating Report..." : "Download Report"}
        </Button>
      </div>
    </div>
  );
}
