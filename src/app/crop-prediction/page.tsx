"use client";
import CropPredictionForm from '../../components/CropPredictionForm';


export default function CropPredictionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
        🌾 Crop Yield Prediction (Odisha)
      </h1>

      <p className="max-w-3xl text-center text-gray-700 mb-10">
        Use our AI-powered platform to predict crop yields using weather, soil, and historical data.
        Get recommendations on irrigation, fertilizer, and pest management to optimize your farming.
      </p>

      <CropPredictionForm />
    </main>
  );
}
