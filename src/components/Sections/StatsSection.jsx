// src/components/Sections/StatsSection.jsx
import React, { useState, useEffect } from 'react';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    students: 0,
    games: 0,
    success: 0
  });

  const stats = [
    {
      id: 'students',
      target: 50,
      suffix: 'K+',
      label: 'Students Enrolled',
      gradient: 'from-cyan-400 to-purple-400'
    },
    {
      id: 'games',
      target: 2000,
      suffix: '+',
      label: 'Games Published',
      gradient: 'from-green-400 to-teal-400'
    },
    {
      id: 'success',
      target: 95,
      suffix: '%',
      label: 'Success Rate',
      gradient: 'from-pink-400 to-red-400'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters when section comes into view
            stats.forEach((stat) => {
              let current = 0;
              const increment = stat.target / 100;
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                  current = stat.target;
                  clearInterval(timer);
                }
                setCounters(prev => ({
                  ...prev,
                  [stat.id]: Math.floor(current)
                }));
              }, 20);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="relative z-10 py-20 px-4" aria-labelledby="stats-title">
      <div className="max-w-4xl mx-auto">
        <h2 id="stats-title" className="sr-only">Our Success Statistics</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="group">
              <div 
                className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                aria-label={`${stat.target}${stat.suffix} ${stat.label}`}
              >
                {counters[stat.id]}{stat.suffix}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;