"use client";
import "../content-page.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { heroServices } from "@/components/Hero/heroServices";

const Page = () => {
  return (
    <div className="content-page">
      <section className="content-header">
        <div className="container">
          <Copy delay={0.8}>
            <h1>Services built for modern companies</h1>
            <p className="lg">
              From fintech platforms to AI automation — we design, build, and
              scale technology that moves your business forward.
            </p>
          </Copy>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="content-grid">
            {heroServices.map((service) => (
              <div className="content-card" key={service.name}>
                <Copy animateOnScroll={true}>
                  <h3>{service.name}</h3>
                  <p>
                    End-to-end delivery across strategy, engineering, and launch
                    — tailored to your product goals.
                  </p>
                </Copy>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
