import React, { useState } from 'react';

const TimeSchedule = () => {
  // State to store the base time (B3 input from user)
  const [baseTime, setBaseTime] = useState('');
  
  // Table rows data
  const rows = [
    { task: 'Doors Open', startD: 37, endD: 37, F: 0 },
    { task: 'Catering', startD: 36, endD: 25, F: 11 },
    { task: 'Cleaning', startD: 29, endD: 22, F: 7 },
    { task: 'Passengers Deplaned', startD: 37, endD: 29, F: 8 },
    { task: 'Engineering (Clearance)', startD: 37, endD: 25, F: 12 },
    { task: 'Cabin Crew Reported at Aircraft', startD: 55, endD: 55, F: 0 },
    { task: 'Security Checks', startD: 29, endD: 23, F: 6 },
    { task: 'Pilots Onboard', startD: 30, endD: 30, F: 0 },
    { task: 'Catering Handover', startD: 23, endD: 23, F: 0 },
    { task: 'Boarding Clearance', startD: 22, endD: 22, F: 0 },
    { task: 'Passengers Boarding', startD: 22, endD: 7, F: 15 },
    { task: 'GNS Notification to Aircraft', startD: 13, endD: 12, F: 1 },
    { task: 'Engg. Paperwork completed', startD: 4, endD: 4, F: 0 },
    { task: 'All Paperwork completed', startD: 4, endD: 4, F: 0 },
    { task: 'Ground staff Offboard', startD: 4, endD: 4, F: 0 },
    { task: 'Doors Closed', startD: 3, endD: 3, F: 0 },
    // Add more rows as needed for 'Below the Wing'
    { task: 'Chocks On', startD: 40, endD: 40, F: 0 },
    { task: 'Fuel Bowser Reporting', startD: 40, endD: 40, F: 0 },
    { task: 'Bag/Cargo Offload', startD: 38, endD: 27, F: 11 },
    { task: 'Fuelling', startD: 36, endD: 15, F: 21 },
    { task: 'Bag/Cargo Loading', startD: 27, endD: 12, F: 15 },
    { task: 'GNS Bag Offload', startD: 12, endD: 5, F: 7 },
    { task: 'Hold Closed', startD: 5, endD: 5, F: 0 },
    { task: 'Engineers Ready to Pushback', startD: 3, endD: 3, F: 0 },
    { task: 'Tow/Tractor Connected', startD: 3, endD: 3, F: 0 },
    { task: 'Chocks Off', startD: 0, endD: 0, F: 0 }
  ];

  // Helper function to calculate time based on minutes added to the base time
  const addMinutesToTime = (time, minutesToAdd) => {
    const [hour, minute] = time.split(':').map(Number);
    const result = new Date();
    result.setHours(hour);
    result.setMinutes(minute + minutesToAdd);
    return result.toTimeString().slice(0, 5); // Return HH:MM format
  };

  // Function to calculate the start and end times based on baseTime input
  const calculateTimes = () => {
    if (!baseTime) return [];
    return rows.map(row => {
      const startTime = addMinutesToTime(baseTime, -row.startD); // Start time based on Start D-
      const endTime = addMinutesToTime(baseTime, -row.endD); // End time based on End D-
      const timeTaken = row.F; // Placeholder for now, can customize logic for time taken
      return {
        ...row,
        startTime,
        endTime,
        timeTaken
      };
    });
  };

  const outputRows = calculateTimes();

  return (
    <div>
      <h1>Precision Time Schedule (PTS)</h1>

      {/* Time Input for B3 */}
      <div>
        <label>Enter Base Time (B3): </label>
        <input 
          type="time"
          value={baseTime}
          onChange={(e) => setBaseTime(e.target.value)} 
        />
      </div>

      {/* Render the table */}
      <table border={1} cellPadding={5} style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Start (D-)</th>
            <th>End (D-)</th>
            <th>F (Difference)</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {outputRows.map((row, index) => (
            <tr key={index}>
              <td>{row.task}</td>
              <td>{row.startD}</td>
              <td>{row.endD}</td>
              <td>{row.F}</td>
              <td>{row.startTime}</td>
              <td>{row.endTime}</td>
              <td>{row.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSchedule;
