import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../assets/css/discover.css";

// Static Data from your list
const PUBLIC_JOBS = [
  {
    id: 8,
    company: "Amazon",
    title: "Software Development Engineer",
    batch: "2021-2025",
    experience: "Freshers",
    salary: "₹18 LPA+",
    logo: "https://logo.clearbit.com/amazon.com",
    tags: ["FAANG", "Direct Test"],
  }, 
  {
    id: 5,
    company: "Tech Mahindra",
    title: "Associate Software Engineer",
    batch: "2022-2026",
    experience: "Freshers",
    salary: "₹3.25 - ₹5.5 LPA",
    logo: "https://logo.clearbit.com/techmahindra.com",
    tags: ["Mass Hiring", "Entry Level"],
  },
  {
    id: 2,
    company: "Coursera",
    title: "Associate Software Engineer",
    batch: "2023-2026",
    experience: "0-2 Years",
    salary: "High Growth",
    logo: "https://logo.clearbit.com/coursera.org",
    tags: ["Product", "Remote Possible"],
  },
  {
    id: 1,
    company: "HCLTech",
    title: "Graduate Trainee",
    batch: "2021-2026",
    experience: "Freshers",
    salary: "Best in Industry",
    logo: "https://logo.clearbit.com/hcltech.com",
    tags: ["Mega Drive", "Any Graduate"],
  },
  {
    id: 3,
    company: "Infosys",
    title: "Specialist Programmer",
    batch: "2024-2026",
    experience: "Freshers",
    salary: "₹9.5 LPA - ₹21 LPA",
    logo: "https://logo.clearbit.com/infosys.com",
    tags: ["High Package", "Coding Specialist"],
  },
  {
    id: 4,
    company: "EY GDS",
    title: "SAP Consultant / Trainee",
    batch: "2021-2026",
    experience: "Freshers",
    salary: "Competitive",
    logo: "https://logo.clearbit.com/ey.com",
    tags: ["Consulting", "Direct Interview"],
  },
  {
    id: 6,
    company: "Cognizant",
    title: "GenC & GenC Next Trainee",
    batch: "2022-2026",
    experience: "Freshers",
    salary: "₹4 LPA - ₹6.75 LPA",
    logo: "https://logo.clearbit.com/cognizant.com",
    tags: ["IT Services", "Bulk Hiring"],
  },
  {
    id: 7,
    company: "Accenture",
    title: "System & App Services Associate",
    batch: "2022-2026",
    experience: "0-11 Months",
    salary: "₹4.6 LPA",
    logo: "https://logo.clearbit.com/accenture.com",
    tags: ["MNC", "Pan India"],
  },
];

export default function Discover() {
  const navigate = useNavigate();

  const handleApply = () => {
    // Redirect to signup to capture the user
    navigate("/signup?redirect=jobs");
  };

  return (
    <>
      <Helmet>
  <title>Discover Jobs & Internships | Curson</title>
  <meta
    name="description"
    content="Explore 1000+ active job openings and internships for freshers and experienced professionals. Filter by company, salary, and location. Join Curson to apply."
  />
  {/* ✅ THIS TELLS GOOGLE THIS IS THE MAIN PAGE */}
  <link rel="canonical" href="https://www.curson.in/discover" />
  
  {/* Social Media / SEO Boosters */}
  <meta property="og:title" content="Discover Jobs & Internships | Curson" />
  <meta property="og:description" content="Find your next career move. Browse jobs from top companies like Amazon, Google, and more." />
  <meta property="og:url" content="https://www.curson.in/discover" />
  <meta property="og:type" content="website" />
</Helmet>

      <div className="discover-container">
        {/* Navbar */}
        <header className="navbar">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Curson
            </Link>
            <div className="landing-nav-right">
              <Link to="/login" className="nav-link-simple">
                Login
              </Link>
              <Link to="/signup" className="btn btn-nav-signup">
                Sign up
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="discover-hero">
          <div className="container">
            <h1>Discover Your Next Opportunity</h1>
            <p>
              Explore top jobs from industry leaders. <br />
              <span className="highlight-text">Join Curson</span> to unlock full details and apply with one click.
            </p>
          </div>
        </section>

        {/* Jobs Grid */}
        <section className="jobs-section">
          <div className="container">
            <div className="jobs-grid">
              {PUBLIC_JOBS.map((job) => (
                <div key={job.id} className="job-card-public">
                  <div className="job-card-header">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="company-logo"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                    />
                    <div>
                      <h3 className="job-role">{job.title}</h3>
                      <p className="job-company">{job.company}</p>
                    </div>
                  </div>

                  <div className="job-tags">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="job-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="job-details">
                    <div className="detail-item">
                      <span className="icon">🎓</span> {job.batch}
                    </div>
                    <div className="detail-item">
                      <span className="icon">💼</span> {job.experience}
                    </div>
                    <div className="detail-item">
                      <span className="icon">💰</span> {job.salary}
                    </div>
                  </div>

                  {/* UPDATED BUTTON: Removed Lock Icon */}
                  <button className="btn-apply-lock" onClick={handleApply}>
                    <span>Apply Now</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="more-jobs-cta">
              <h3>1K+ More Jobs Available</h3>
              <p>Create your free account to view all opportunities.</p>
              <Link to="/signup" className="btn btn-hero-primary">
                View All Jobs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}