export interface ProjectData {
  id: string;
  title: string;
  description: string;
  year: string;
  timeline: string;
  services: string;
  liveLink: string;
  heroImage: string;
  galleryImages: string[];
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
}

export const projectsData: ProjectData[] = [
  {
    id: "adhayaya",
    title: "Adhayaya",
    description: "A cultural exploration platform bringing Indian heritage, monuments, and dynamic travel itineraries to life using interactive 3D elements and immersive storytelling.",
    year: "2026",
    timeline: "3 Months",
    services: "Next.js / WebGL / Strategic Branding",
    liveLink: "https://adhayaya.dev",
    heroImage: "https://res.cloudinary.com/dtslaveid/image/upload/v1781108027/Screenshot_2026-06-09_202735_ixq9ul.png",
    galleryImages: [
      "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1800&q=90"
    ],
    challenge: "Traditional travel guides struggle to captivate younger audiences, making ancient history feel dry and distant. The challenge was to bridge historical archives with modern interactive web technology, creating a friction-free spatial visualization interface that loads instantly on mobile.",
    solution: "We engineered a lightweight WebGL architecture nested within a high-performance Next.js application. Dynamic SVG maps, custom monument layouts, and structured micro-interactions translate historical data into responsive visual narratives that reward visitor curiosity.",
    results: [
      { value: "45%", label: "Increase in User Session Length" },
      { value: "100k+", label: "Monthly Active Explorers" },
      { value: "<1.2s", label: "Interactive Core Web Vitals Paint" },
      { value: "24", label: "Monuments Fully Mapped" }
    ]
  },
  {
    id: "dhritam",
    title: "Dhritam",
    description: "Dhritam is a BCI-based neuro-cardiac rehabilitation platform that enables continuous remote monitoring of cardiac patients through real-time EEG and ECG signal analysis. Built as a cross-platform Flutter mobile application with Firebase backend, it serves two users simultaneously — patients engaging through gamified recovery modules and clinicians monitoring live signal dashboards. The ML pipeline at its core applies bandpass filtering for noise removal, FFT for frequency-domain feature extraction, SVM for real-time cardiac anomaly classification, and LSTM for tracking neurological recovery trajectories over time. Dhritam won First Place at the Global AI Summit 2026, competing against teams from across the country.",
    year: "2026",
    timeline: "4 Months",
    services: "Flutter / Firebase / Machine Learning",
    liveLink: "https://dhritam.health",
    heroImage: "https://res.cloudinary.com/dtslaveid/image/upload/v1780759046/four_d9ouzk.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dtslaveid/image/upload/v1780759046/three_uf1btr.jpg",
      "https://res.cloudinary.com/dtslaveid/image/upload/v1780759045/one_ijgxgs.jpg",
      "https://res.cloudinary.com/dtslaveid/image/upload/v1780759046/two_z4qvac.jpg"
    ],
    challenge: "Cardiac rehabilitation requires consistent, supervised monitoring — but for most patients in India, that means frequent hospital visits that are expensive, time-consuming, and often impossible. Over 70% of cardiac patients live in Tier 2 and Tier 3 cities where rehabilitation infrastructure simply does not exist. Patients drop out of recovery programs, and dropout directly increases mortality risk. Between hospital visits, there is zero monitoring — if a cardiac anomaly occurs at midnight on a Tuesday, nobody knows until the next scheduled appointment. The system is episodic when it needs to be continuous.",
    solution: "Dhritam brings the monitoring to the patient instead of bringing the patient to the hospital. Wearable EEG and ECG sensors stream biological signals continuously into the mobile app, where the ML pipeline cleans, analyses, and classifies them in real time — detecting cardiac anomalies the moment they appear and tracking neurological recovery across every session. Clinicians receive instant alerts and access live dashboards showing each patient's brain and heart activity simultaneously. Patients stay engaged through gamified modules whose difficulty responds to their actual LSTM-detected recovery progress. Rehabilitation becomes continuous, intelligent, and accessible — regardless of where the patient lives.",
    results: [
      { value: "98.7%", label: "Anomaly Prediction Accuracy" },
      { value: "92%", label: "Reduction in Alarm Fatigue" },
      { value: "15ms", label: "Stream Latency to Cloud" },
      { value: "5k+", label: "Active Connected Patients" }
    ]
  },
  {
    id: "hazu",
    title: "Hazu",
    description: "HAZU is an AI-powered smart industrial safety and monitoring system that continuously watches over dangerous industrial environments using IoT sensors and detects hazards before they escalate. It acts as a digital safety officer — one that never sleeps and monitors an entire facility simultaneously. Built using React.js, Node.js, Arduino IDE, MQTT, and WebSockets, HAZU unifies fragmented safety infrastructure into a single intelligent platform targeting three critical hazards — gas leaks, equipment overheating, and excessive noise exposure.",
    year: "2023",
    timeline: "6 Months",
    services: "React.js / Node.js / IoT / ML",
    liveLink: "https://hazu.io",
    heroImage: "https://res.cloudinary.com/dcdssvhkm/image/upload/v1780684540/WhatsApp_Image_2026-06-05_at_11.58.21_PM_mfbmd2.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dcdssvhkm/image/upload/v1780684540/WhatsApp_Image_2026-06-05_at_11.58.20_PM_zed1fj.jpg",
      "https://res.cloudinary.com/dcdssvhkm/image/upload/v1780684540/WhatsApp_Image_2026-06-05_at_11.58.21_PM_mfbmd2.jpg",
      "https://res.cloudinary.com/dcdssvhkm/image/upload/v1780684540/WhatsApp_Image_2026-06-05_at_11.49.17_PM_wlqbmz.jpg"
    ],
    challenge: "Industrial workplaces remain dangerously under-monitored despite available technology. Traditional safety systems are purely threshold-based — alarms trigger only after dangerous levels are already crossed, meaning workers are exposed before any response begins. Monitoring is fragmented across disconnected devices, inspections happen manually every few hours, and no existing system can recognise warning patterns before a threshold is hit. The infrastructure is reactive, fragmented, and fundamentally too slow.",
    solution: "HAZU replaces reactive monitoring with proactive AI-driven intelligence. Sensors feed continuous readings via MQTT into a Node.js backend, which streams live data through WebSockets to a React.js dashboard — updating in real time as safety officers watch. The ML layer goes beyond threshold detection by analysing sensor patterns and flagging anomalies before danger levels are reached — identifying a slow gas leak or abnormal temperature rise long before a traditional alarm would trigger. Disasters are prevented, not just reported.",
    results: [
      { value: "3.2x", label: "Speedup in Management Audits" },
      { value: "22%", label: "Decrease in Inventory Costs" },
      { value: "94%", label: "Bottleneck Warning Success Rate" },
      { value: "8", label: "Global Warehouses Synced" }
    ]
  }
];
