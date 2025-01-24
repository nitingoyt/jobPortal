import React from "react";
import medical_records from "../medicalRecords";

function Records() {
  return (
    <div className="patient-profile-container" id="profile-view">
      {medical_records.map((userRecord, index) => {
        return (
          <div key={index} className="layout-row justify-content-center">
            <div id="patient-profile" data-testid="patient-profile" className="mx-auto">
              <h4 id="patient-name">{userRecord.data[0]?.userName}</h4>
              <h5 id="patient-dob">DOB: {userRecord.data[0]?.userDob}</h5>
              <h5 id="patient-height">Height: {userRecord.data[0]?.meta.height} cm</h5>
            </div>
            <button className="mt-10 mr-10" data-testid="next-btn">
              Next
            </button>

            <table id="patient-records-table">
              <thead id="table-header">
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Weight</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody id="table-body" data-testid="patient-table">
                {userRecord.data.map((record, recordIndex) => (
                  <tr key={recordIndex}>
                    <td>{recordIndex + 1}</td>
                    <td>{new Date(record.timestamp).toLocaleDateString()}</td>
                    <td>{record.diagnosis.name}</td>
                    <td>{record.meta.weight} kg</td>
                    <td>{record.doctor.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default Records;