"use client";
import "./sample-project.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">AI-Powered Automation</p>
          <h1>AgentFlow AI</h1>
        </Copy>
      </section>

      <section className="project-banner-img">
        <div className="project-banner-img-wrapper">
          <img src="/project/sample-project-1.jpg" alt="" />
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>
              AgentFlow AI is an autonomous automation platform that helps
              businesses deploy intelligent agents across workflows — from
              customer support to data processing and beyond.
            </h3>
          </div>

          <div className="details">
            <p>Cycle</p>
            <h3>2025</h3>
          </div>

          <div className="details">
            <p>Form</p>
            <h3>SaaS Platform</h3>
          </div>

          <div className="details">
            <p>Medium</p>
            <h3>AI & Product Engineering</h3>
          </div>

          <div className="details">
            <p>Company</p>
            <h3>Rizzbrand Technologies</h3>
          </div>
        </Copy>
      </section>

      <section className="project-images">
        <div className="project-images-container">
          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-2.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-3.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-4.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-5.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-6.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Assembly</p>
            <h3>Amara Singh</h3>
          </div>

          <div className="details">
            <p>Sound</p>
            <h3>Kenji Mori</h3>
          </div>

          <div className="details">
            <p>Direction of Form</p>
            <h3>Lina Duarte</h3>
          </div>

          <div className="details">
            <p>Production</p>
            <h3>Isolde Rey</h3>
          </div>

          <div className="details">
            <p>Vision Lead</p>
            <h3>Felix Turner</h3>
          </div>
        </Copy>
      </section>

      <section className="next-project">
        <Copy animateOnScroll={true}>
          <p style={{ marginBottom: "1rem" }}>02 - 05</p>
          <h2>Next</h2>
        </Copy>

        <div className="next-project-img">
          <div className="next-project-img-wrapper">
            <img src="/project/next-project.jpg" alt="" />
          </div>
        </div>

        <Copy animateOnScroll={true}>
          <h3>ChainForge</h3>
        </Copy>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
