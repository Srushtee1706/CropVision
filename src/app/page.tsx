"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const featureColumns = document.querySelectorAll(".feature-column");
    const odishaImg = document.querySelector(".odisha-img");
    const odishaText = document.querySelector(".odisha-text");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    featureColumns.forEach((col) => observer.observe(col));

    const odishaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            odishaObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (odishaImg) odishaObserver.observe(odishaImg);
    if (odishaText) odishaObserver.observe(odishaText);

    const snakeContainer = document.getElementById("snake-container");
    const dots: { el: HTMLDivElement; x: number; y: number }[] = [];
    const dotCount = 15;
    const delay = 6;

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("snake-dot");
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

        dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${
          1 - index * 0.05
        })`;
        dot.el.style.opacity = `${1 - index * 0.05}`;

        x = dot.x - delay;
        y = dot.y - delay;
      });

      requestAnimationFrame(animateSnake);
    }

    animateSnake();
  }, []);

  return (
    <>
      <div id="snake-container"></div>
      <main className="hero-section">
        <div className="hero-left">
          <div className="content-wrapper">
            <p className="subtitle">
              AI-Powered Crop Yield Prediction for Odisha
            </p>
            <h1 className="title">CROP VISION</h1>
            <p className="description">
              “An AI-powered platform for Odisha&apos;s farmers that predicts crop
              yields using weather, soil, and historical data. It provides
              regional-language insights to optimize farming practices and boost
              productivity by 10% or more.”
            </p>
            <button className="learn-more-btn">LEARN MORE</button>
          </div>
        </div>
        <div className="hero-right"></div>
      </main>

      <section className="features-container">
        <div className="features-left">
          <h1>
            OUR <br />
            <strong>FEATURES</strong>
          </h1>
        </div>
        <div className="features-right">
          <div className="feature-column">
            <div className="circle-img">
              <img src="/image copy 5.png" alt="CROP YIELD PREDICTION" />
            </div>
            <h2>CROP YIELD PREDICTION</h2>
            <p>
              A scalable web & mobile solution that helps small-scale farmers
              boost productivity by 10% using AI-driven insights, with regional
              language support for accessibility.
            </p>
            <Link href="/crop-prediction" className="feature-button">
              Check it
            </Link>
          </div>

          <div className="feature-column">
            <div className="circle-img">
              <img src="/image copy 6.png" alt="Loan" />
            </div>
            <h2>LOAN REQUIRY</h2>
            <p>
              Easily apply for agricultural loans and track their status. Get
              guidance on the right loan type and repayment options.
            </p>
            <a href="#" className="feature-button">
              Check it
            </a>
          </div>

          <div className="feature-column">
            <div className="circle-img">
              <img src="/image copy 7.png" alt="Schemes" />
            </div>
            <h2>GOVERNMENT SCHEMES</h2>
            <p>
              Stay informed about the latest government schemes and subsidies
              for farmers, all in one place.
            </p>
            <a href="#" className="feature-button">
              Check it
            </a>
          </div>
        </div>
      </section>

      <section id="odisha-farmers">
        <div className="odisha-container">
          <div className="odisha-img">
            <img src="/image.png" alt="Odisha Farmers" />
          </div>
          <div className="odisha-text">
            <h2>Odisha Farmers</h2>
            <p>
              Odisha&apos;s farmers form the backbone of the state&apos;s economy, with
              nearly 70% of the population engaged in agriculture. They
              cultivate a wide range of crops, including rice, pulses, oilseeds,
              and vegetables, contributing significantly to both local
              consumption and national food supply. The state&apos;s diverse
              agro-climatic conditions allow for multiple cropping seasons,
              enabling farmers to maximize yield throughout the year. Despite
              challenges such as unpredictable rainfall, pests, and market
              fluctuations, Odisha&apos;s farmers demonstrate resilience and
              innovation, often adopting modern farming techniques and
              sustainable practices. Government initiatives and agricultural
              schemes further support them with access to irrigation, quality
              seeds, and credit facilities. Beyond economic contributions, these
              farmers preserve traditional knowledge, maintain soil fertility,
              and uphold the cultural heritage of Odisha&apos;s rural communities.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-container">
          {/* <div className="footer-logo">
            <img src="/image_5c9213.jpg" alt="Farmus Logo" />
          </div> */}
          <ul className="social-links">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
          <p className="footer-text">
            &copy; 2025 CropVision. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
