import React from 'react';

const HearingSchedulePage = () => {
  const dummySchedule = [
    { id: 1, date: "2024-09-01", caseTitle: "Case 001: John Doe vs State", time: "10:00 AM" },
    { id: 2, date: "2024-09-02", caseTitle: "Case 002: Jane Smith vs City", time: "02:00 PM" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hearing Schedule</h2>
      <ul>
        {dummySchedule.map((hearing) => (
          <li key={hearing.id} className="p-4 bg-white shadow mb-2">
            <h3 className="font-semibold">{hearing.caseTitle}</h3>
            <p>Date: {hearing.date}</p>
            <p>Time: {hearing.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HearingSchedulePage;
