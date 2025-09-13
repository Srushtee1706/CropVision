"use client";

import { useState } from "react";
import styles from "./CropPredictionForm.module.css"; // Import the CSS Module

export default function CropPredictionForm() {
  const [formData, setFormData] = useState({
    district: "",
    cropType: "",
    sowingDate: "",
    season: "",
  });

  const [results, setResults] = useState<null | {
    predictedYield: string;
    irrigation: string;
    fertilizer: string;
    pestAlert: string;
  }>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate an API call with sample data
      const sampleData = {
        predictedYield: "3.5 tons/hectare",
        irrigation: "Water daily in the morning",
        fertilizer: "Apply NPK 20-20-20 once a week",
        pestAlert: "No major pests detected",
      };
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResults(sampleData);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to fetch prediction. Try again!");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeading} text-align="center">
        🌾 Crop Yield Prediction (Odisha)
      </h2>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* District */}
        <div className="flex flex-col">
          <label className={styles.label}>District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={styles.inputField}
            required
          >
            <option value="">Select District</option>
            <option value="angul">Angul</option>
            <option value="balangir">Balangir</option>
            <option value="balasore">Balasore</option>
            <option value="bargarh">Bargarh</option>
            <option value="bhadrak">Bhadrak</option>
            <option value="boudh">Boudh</option>
            <option value="cuttack">Cuttack</option>
            <option value="deogarh">Deogarh</option>
            <option value="dhenkanal">Dhenkanal</option>
            <option value="gajapati">Gajapati</option>
            <option value="ganjam">Ganjam</option>
            <option value="jagatsinghpur">Jagatsinghpur</option>
            <option value="jajpur">Jajpur</option>
            <option value="jharsuguda">Jharsuguda</option>
            <option value="kalahandi">Kalahandi</option>
            <option value="kandhamal">Kandhamal</option>
            <option value="kendrapara">Kendrapara</option>
            <option value="kendujhar">Kendujhar</option>
            <option value="khordha">Khordha</option>
            <option value="koraput">Koraput</option>
            <option value="malkangiri">Malkangiri</option>
            <option value="mayurbhanj">Mayurbhanj</option>
            <option value="nabarangpur">Nabarangpur</option>
            <option value="nayagarh">Nayagarh</option>
            <option value="nuapada">Nuapada</option>
            <option value="puri">Puri</option>
            <option value="rayagada">Rayagada</option>
            <option value="sambalpur">Sambalpur</option>
            <option value="subarnapur">Subarnapur (Sonepur)</option>
            <option value="sundargarh">Sundargarh</option>
          </select>
        </div>

        {/* Crop Type */}
        <div className="flex flex-col">
          <label className={styles.label}>Crop</label>
          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            className={styles.inputField}
            required
          >
            <option value="">Select Crop</option>
            <option value="paddy">Paddy</option>
            <option value="wheat">Wheat</option>
            <option value="maize">Maize</option>
            <option value="pulses">Pulses</option>
            <option value="oilseeds">Oilseeds</option>
          </select>
        </div>

        {/* Sowing Date */}
        <div className="flex flex-col">
          <label className={styles.label}>Sowing Date</label>
          <input
            type="date"
            name="sowingDate"
           
            value={formData.sowingDate}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>

        {/* Season */}
        <div className="flex flex-col">
          <label className={styles.label}>Season</label>
          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            className={styles.inputField}
            required
          >
            <option value="">Select Season</option>
            <option value="kharif">Kharif</option>
            <option value="rabi">Rabi</option>
            <option value="summer">Summer</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className={styles.submitButton}
          >
            🚀 Get Prediction
          </button>
        </div>
      </form>

      {/* Results */}
      {results && (
        <div className={styles.resultsContainer}>
          <h3 className={styles.resultsHeading}>
            🌟 Prediction Results
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={styles.resultItem}>
              <p className={styles.resultLabel}>Predicted Yield</p>
              <p className={styles.resultValue}>{results.predictedYield}</p>
            </div>
            <div className={styles.resultItem}>
              <p className={styles.resultLabel}>Irrigation Recommendation</p>
              <p className={styles.resultValue}>{results.irrigation}</p>
            </div>
            <div className={styles.resultItem}>
              <p className={styles.resultLabel}>Fertilizer Plan</p>
              <p className={styles.resultValue}>{results.fertilizer}</p>
            </div>
            <div className={styles.resultItem}>
              <p className={styles.resultLabel}>Pest/Disease Alert</p>
              <p className={styles.resultValue}>{results.pestAlert}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
