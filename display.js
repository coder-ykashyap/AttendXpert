const display = async (data) => {
    let template = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      
      table {
        border-collapse: collapse;
        width: 100%;
      }
      
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
  
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
  
  <h2>Attendance Report</h2>
  
  <table id="attendanceTable">
  <thead>
  <tr>
        <th>Subject</th>
        <th>Total Lectures</th>
        <th>Presents</th>
        <th>Absents</th>
        <th>Percentage (%)</th>
        <th>Advice</th>
      </tr>
    </thead>
    <tbody>
    {tbody}
    </tbody>
  </table>
  </body>
  </html>
  `;
    var tbody = "";
  
    for (const [subject, info] of Object.entries(data)) {
      let p = (info.Pr/info.TL)*100;
      tbody =
        tbody +
        `<tr>
      <td>${subject}</td>
      <td>${info.TL}</td>
      <td>${info.Pr}</td>
      <td>${info.Ab}</td>
      <td>${p}</td>
      <td>${info.Advice}</td>
      </tr>
      `;
    }
  
    // console.log(tbody);
    return template.replace("{tbody}", tbody);
  };
  
  module.exports = display;
  