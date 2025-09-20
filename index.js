import React, { useState, useEffect } from "react";

// Dummy data for quiz questions, careers, skills, etc.
const quizQuestions = [
  {
    id: "academic",
    title: "Academic Background",
    questions: [
      { id: "field", text: "What is your field of study?", type: "text" },
      { id: "gpa", text: "What is your GPA?", type: "number" },
      { id: "courses", text: "List relevant courses/projects", type: "text" },
    ],
  },
  {
    id: "psychometric",
    title: "Psychometric Evaluation",
    questions: [
      {
        id: "interests",
        text: "Rate your interest in these areas (1-5): Realistic, Investigative, Artistic, Social, Enterprising, Conventional",
        type: "range6",
      },
      {
        id: "personality",
        text: "Rate your personality traits (1-5): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism",
        type: "range5",
      },
      {
        id: "values",
        text: "What motivates you? (Select all that apply)",
        type: "checkbox",
        options: ["Autonomy", "Work-life balance", "High income", "Social impact"],
      },
    ],
  },
  {
    id: "skills",
    title: "Self-Assessed Skills",
    questions: [
      { id: "python", text: "Python", type: "range" },
      { id: "communication", text: "Communication", type: "range" },
      { id: "dataAnalysis", text: "Data Analysis", type: "range" },
      { id: "problemSolving", text: "Problem Solving", type: "range" },
    ],
  },
];

// Mock career matches
const careerMatches = [
  { title: "Data Scientist", score: 92 },
  { title: "Product Manager", score: 85 },
  { title: "UX Designer", score: 78 },
];

// Mock skills required for roles
const roleSkills = {
  "Data Scientist": [
    { skill: "Python", required: 4 },
    { skill: "Machine Learning", required: 4 },
    { skill: "Statistics", required: 3 },
    { skill: "Data Visualization", required: 3 },
    { skill: "Cloud Infrastructure", required: 3 },
  ],
  "Product Manager": [
    { skill: "Communication", required: 5 },
    { skill: "Project Management", required: 4 },
    { skill: "Market Research", required: 3 },
    { skill: "Agile Methodologies", required: 4 },
  ],
  "UX Designer": [
    { skill: "Creativity", required: 5 },
    { skill: "User  Research", required: 4 },
    { skill: "Prototyping", required: 4 },
    { skill: "Visual Design", required: 4 },
  ],
};

// Helper component: Range input for rating 1-5
const RangeInput = ({ label, value, onChange }) => (
  <div style={{ marginBottom: 8 }}>
    <label>
      {label}: {value}
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ marginLeft: 8 }}
      />
    </label>
  </div>
);

// Main App
export default function CareerCartographerAI() {
  // Step control: onboarding quiz, dashboard, skill gap, learning path, portfolio, chatbot
  const [step, setStep] = useState("onboarding");

  // Store user answers
  const [profile, setProfile] = useState({
    academic: {},
    psychometric: {},
    skills: {},
  });

  // Store Career Genome (mock calculation)
  const [careerGenome, setCareerGenome] = useState(null);

  // Selected career for skill gap analysis
  const [selectedCareer, setSelectedCareer] = useState(null);

  // User skill ratings for skill gap heatmap
  const [userSkills, setUser Skills] = useState({
    Python: 3,
    Communication: 3,
    "Data Analysis": 3,
    "Problem Solving": 3,
    "Machine Learning": 1,
    "Cloud Infrastructure": 1,
    Statistics: 2,
    Creativity: 3,
    "User  Research": 2,
    Prototyping: 2,
    "Visual Design": 2,
    "Project Management": 2,
    "Market Research": 2,
    "Agile Methodologies": 2,
  });

  // Learning pathway (mock)
  const [learningPathway, setLearningPathway] = useState(null);

  // Portfolio projects (mock)
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  // Chatbot messages
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi! I'm Carto, your AI career mentor. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Handle quiz input change
  const handleQuizChange = (section, questionId, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: value,
      },
    }));
  };

  // Onboarding quiz submit: generate Career Genome (mock)
  const submitOnboarding = () => {
    // Simple mock: average skill ratings + psychometric scores
    const skills = profile.skills;
    const psych = profile.psychometric;

    // Calculate mock scores for genome axes
    const technical =
      (skills.python || 0) * 1.5 +
      (skills.dataAnalysis || 0) * 1.2 +
      (psych.interests ? psych.interests[1] : 3) * 1.3;
    const analytical =
      (skills.problemSolving || 0) * 1.5 +
      (psych.personality ? psych.personality[1] : 3) * 1.2;
    const creative = (psych.interests ? psych.interests[2] : 3) * 1.5;
    const managerial = (psych.interests ? psych.interests[4] : 3) * 1.4;
    const social = (psych.interests ? psych.interests[3] : 3) * 1.3;

    setCareerGenome({
      Technical: Math.min(5, technical / 3),
      Analytical: Math.min(5, analytical / 3),
      Creative: Math.min(5, creative / 3),
      Managerial: Math.min(5, managerial / 3),
      Social: Math.min(5, social / 3),
    });

    setStep("dashboard");
  };

  // Chatbot handler (mock AI)
  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: "user", text: chatInput };
    setChatMessages((msgs) => [...msgs, userMsg]);

    // Simple mock responses based on keywords
    let botReply = "Sorry, I didn't understand that. Try asking about career matches or skill gaps.";

    const inputLower = chatInput.toLowerCase();
    if (inputLower.includes("career")) {
      botReply = `Based on your profile, your top career matches are: ${careerMatches
        .map((c) => c.title)
        .join(", ")}. You can select one to see skill gaps.`;
    } else if (inputLower.includes("data scientist")) {
      botReply =
        "A Data Scientist analyzes data to extract insights. Key skills include Python, Machine Learning, and Statistics.";
    } else if (inputLower.includes("how do i become")) {
      botReply =
        "To become a UX Designer, focus on learning user research, prototyping, and visual design. I can generate a learning pathway for you.";
    } else if (inputLower.includes("mock interview")) {
      botReply = "Let's start a mock interview. Tell me why you want this role.";
    }

    setTimeout(() => {
      setChatMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    }, 1000);

    setChatInput("");
  };

  // Generate learning pathway (mock)
  const generateLearningPathway = (career) => {
    if (career === "Data Scientist") {
      setLearningPathway([
        {
          month: 1,
          title: "Foundations of Data",
          tasks: [
            {
              week: "1-2",
              description: 'Complete "SQL Basics" course on Coursera',
              link: "https://www.coursera.org/learn/sql-basics",
            },
            {
              week: "3",
              description: 'Complete "Statistics Fundamentals" on Khan Academy',
              link: "https://www.khanacademy.org/math/statistics-probability",
            },
            {
              week: "4",
              description: "Milestone Project: Analyze a dataset and write a report",
            },
          ],
        },
        {
          month: 2,
          title: "Machine Learning & Visualization",
          tasks: [
            {
              week: "1-2",
              description: 'Complete "Intro to Machine Learning" on Coursera',
              link: "https://www.coursera.org/learn/machine-learning",
            },
            {
              week: "3-4",
              description: 'Learn "Data Visualization" with Tableau tutorials',
              link: "https://www.tableau.com/learn/training",
            },
          ],
        },
      ]);
    } else {
      setLearningPathway([
        {
          month: 1,
          title: "Getting Started",
          tasks: [
            {
              week: "1-2",
              description: "Explore foundational courses relevant to your career.",
            },
          ],
        },
      ]);
    }
  };

  // Suggest portfolio projects (mock)
  const suggestPortfolioProjects = (career) => {
    if (career === "Data Scientist") {
      setPortfolioProjects([
        {
          title: "COVID Data Tracker Web App",
          objective: "Build a web app to track COVID-19 data trends.",
          skills: ["Python", "Data Visualization", "APIs"],
          guide:
            "Use Python Flask for backend, Chart.js for visualization, and public COVID APIs for data.",
          githubLink: "",
        },
        {
          title: "Market Analysis Report",
          objective: "Conduct a market analysis for a fictional product.",
          skills: ["Data Analysis", "Report Writing", "Excel"],
          guide:
            "Collect data from surveys, analyze trends, and prepare a presentation.",
          githubLink: "",
        },
      ]);
    } else {
      setPortfolioProjects([]);
    }
  };

  // Render onboarding quiz
  const renderOnboarding = () => (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>Step 1: Build Your Career Genome</h2>
      {quizQuestions.map((section) => (
        <div key={section.id} style={{ marginBottom: 24 }}>
          <h3>{section.title}</h3>
          {section.questions.map((q) => {
            if (q.type === "text") {
              return (
                <div key={q.id} style={{ marginBottom: 12 }}>
                  <label>
                    {q.text}
                    <input
                      type="text"
                      value={profile[section.id][q.id] || ""}
                      onChange={(e) =>
                        handleQuizChange(section.id, q.id, e.target.value)
                      }
                      style={{ marginLeft: 8, width: "60%" }}
                    />
                  </label>
                </div>
              );
            }
            if (q.type === "number") {
              return (
                <div key={q.id} style={{ marginBottom: 12 }}>
                  <label>
                    {q.text}
                    <input
                      type="number"
                      value={profile[section.id][q.id] || ""}
                      onChange={(e) =>
                        handleQuizChange(section.id, q.id, e.target.value)
                      }
                      style={{ marginLeft: 8, width: 80 }}
                      min={0}
                      max={10}
                      step={0.01}
                    />
                  </label>
                </div>
              );
            }
            if (q.type === "range") {
              return (
                <RangeInput
                  key={q.id}
                  label={q.text}
                  value={profile[section.id][q.id] || 3}
                  onChange={(val) => handleQuizChange(section.id, q.id, val)}
                />
              );
            }
            if (q.type === "range6") {
              // For interests: 6 values comma separated
              const vals = profile[section.id][q.id]
                ? profile[section.id][q.id]
                : [3, 3, 3, 3, 3, 3];
              const handleInterestChange = (index, val) => {
                const newVals = [...vals];
                newVals[index] = val;
                handleQuizChange(section.id, q.id, newVals);
              };
              const labels = [
                "Realistic",
                "Investigative",
                "Artistic",
                "Social",
                "Enterprising",
                "Conventional",
              ];
              return (
                <div key={q.id} style={{ marginBottom: 12 }}>
                  <p>{q.text}</p>
                  {labels.map((label, i) => (
                    <RangeInput
                      key={label}
                      label={label}
                      value={vals[i]}
                      onChange={(val) => handleInterestChange(i, val)}
                    />
                  ))}
                </div>
              );
            }
            if (q.type === "range5") {
              // For personality: 5 values comma separated
              const vals = profile[section.id][q.id]
                ? profile[section.id][q.id]
                : [3, 3, 3, 3, 3];
              const handlePersonalityChange = (index, val) => {
                const newVals = [...vals];
                newVals[index] = val;
                handleQuizChange(section.id, q.id, newVals);
              };
              const labels = [
                "Openness",
                "Conscientiousness",
                "Extraversion",
                "Agreeableness",
                "Neuroticism",
              ];
              return (
                <div key={q.id} style={{ marginBottom: 12 }}>
                  <p>{q.text}</p>
                  {labels.map((label, i) => (
                    <RangeInput
                      key={label}
                      label={label}
                      value={vals[i]}
                      onChange={(val) => handlePersonalityChange(i, val)}
                    />
                  ))}
                </div>
              );
            }
            if (q.type === "checkbox") {
              const vals = profile[section.id][q.id] || [];
              const toggleValue = (val) => {
                if (vals.includes(val)) {
                  handleQuizChange(
                    section.id,
                    q.id,
                    vals.filter((v) => v !== val)
                  );
                } else {
                  handleQuizChange(section.id, q.id, [...vals, val]);
                }
              };
              return (
                <div key={q.id} style={{ marginBottom: 12 }}>
                  <p>{q.text}</p>
                  {q.options.map((opt) => (
                    <label key={opt} style={{ marginRight: 12 }}>
                      <input
                        type="checkbox"
                        checked={vals.includes(opt)}
                        onChange={() => toggleValue(opt)}
                      />{" "}
                      {opt}
                    </label>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
      <button onClick={submitOnboarding} style={{ padding: "8px 16px" }}>
        Submit & Generate Career Genome
      </button>
    </div>
  );

  // Render Career Genome Radar Chart (simple text-based for demo)
  const renderCareerGenome = () => {
    if (!careerGenome) return null;
    return (
      <div style={{ marginBottom: 24 }}>
        <h3>Your Career Genome</h3>
        <ul>
          {Object.entries(careerGenome).map(([axis, score]) => (
            <li key={axis}>
              <b>{axis}:</b> {score.toFixed(2)} / 5
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render Dashboard
  const renderDashboard = () => (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2>Dashboard</h2>
      {renderCareerGenome()}
      <div style={{ marginBottom: 24 }}>
        <h3>Top Career Matches</h3>
        <ul>
          {careerMatches.map((c) => (
            <li key={c.title}>
              {c.title} - <b>{c.score}% match</b>{" "}
              <button
                onClick={() => {
                  setSelectedCareer(c.title);
                  generateLearningPathway(c.title);
                  suggestPortfolioProjects(c.title);
                  setStep("skillGap");
                }}
              >
                View Skill Gap
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3>Key Strengths & Growth Areas</h3>
        <ul>
          <li>Strength: Analytical Thinking</li>
          <li>Strength: Problem Solving</li>
          <li>Strength: Communication</li>
          <li>Growth Area: Machine Learning</li>
          <li>Growth Area: Cloud Infrastructure</li>
          <li>Growth Area: Advanced Statistics</li>
        </ul>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3>Market Pulse</h3>
        <p>
          Trending Jobs: AI Engineer, Data Scientist, Cybersecurity Analyst
          <br />
          In-Demand Skills: Python, Cloud Computing, Data Visualization
        </p>
      </div>
      <button onClick={() => setStep("chatbot")} style={{ marginRight: 12 }}>
        Chat with Carto (AI Mentor)
      </button>
      <button onClick={() => setStep("portfolio")}>View Portfolio Projects</button>
    </div>
  );

  // Render Skill Gap Heatmap (simple bar chart style)
  const renderSkillGap = () =>