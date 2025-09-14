"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import styles from "./CropPredictionForm.module.css";

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

  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (!storedName) router.push("/Login-Form");
    else setUsername(storedName);

    // Snake cursor
    const snakeContainer = document.getElementById("snake-container");
    const dots: { el: HTMLDivElement; x: number; y: number }[] = [];
    const dotCount = 15;
    const delay = 6;

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add(styles["snake-dot"]);
      snakeContainer?.appendChild(dot);
      dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateSnake() {
      let x = mouseX;
      let y = mouseY;
      dots.forEach((dot, index) => {
        dot.x += (x - dot.x) * 0.3;
        dot.y += (y - dot.y) * 0.3;
        dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${1 - index * 0.05})`;
        dot.el.style.opacity = `${1 - index * 0.05}`;
        x = dot.x - delay;
        y = dot.y - delay;
      });
      requestAnimationFrame(animateSnake);
    }

    animateSnake();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      alert("Please login first!");
      router.push("/Login-Form");
      return;
    }

    const sampleData = {
      predictedYield: "3.5 tons/hectare",
      irrigation: "Water daily in the morning",
      fertilizer: "Apply NPK 20-20-20 once a week",
      pestAlert: "No major pests detected",
    };

    await new Promise((r) => setTimeout(r, 1000));
    setResults(sampleData);
  };

  if (!username) return null;

  return (
    <div className={styles.pageContainer}>
  <header className={styles.navbar}>
    <div className={styles.logo}>Crop Vision</div>
    <nav>
      <ul className={styles.navList}>
        <li><a href="/">HOME</a></li>
        <li><a href="#">ABOUT</a></li>
        <li><Link href="/crop-prediction">SERVICES</Link></li>
        <li><Link href="/Login-Form">LOGIN</Link></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </nav>
  </header>

      <div id="snake-container" className={styles.snakeContainer}></div>

      <div className={styles.formContainer}>
        <h2 className={styles.formHeading}>
          👋 Welcome, {username}! Predict your crop yield.
        </h2>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label}>District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={styles.inputField}
              required
            >
              <option value="">Select District</option>
              <option value="Angul">Angul</option>
              <option value="Balangir">Balangir</option>
              <option value="Balasore">Balasore</option>
            </select>
          </div>

          <div className={styles.field}>
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

          <div className={styles.field}>
            <label className={styles.label}>Sowing Date</label>
            <input
              type="date"
              name="sowingDate"
              value={formData.sowingDate}
              onChange={handleChange}
              className={`${styles.inputField} ${styles.sowingDateField}`}
              required
            />
          </div>

          <div className={styles.field}>
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

          <div className={styles.actionRow}>
            <button type="submit" className={styles.submitButton}>
              🚀 Get Prediction
            </button>
          </div>
        </form>

        {results && (
          <div className={styles.resultsContainer}>
            <h3 className={styles.resultsHeading}>🌟 Prediction Results</h3>
            <div className={styles.resultsGrid}>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Predicted Yield</p>
                <p className={styles.resultValue}>{results.predictedYield}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Irrigation</p>
                <p className={styles.resultValue}>{results.irrigation}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Fertilizer</p>
                <p className={styles.resultValue}>{results.fertilizer}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Pest Alert</p>
                <p className={styles.resultValue}>{results.pestAlert}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
