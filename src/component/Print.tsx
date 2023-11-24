import RNPrint from 'react-native-print';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
export const printDescription = async (patientData: any, user: any) => {

    await RNPrint.print({
        html: `
        <html>
        <head>
          <style>
            /* CSS styles for header and footer */
            header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              height:200px;
              background-color:none;
              color: black;
              text-align: center;
              line-height: 50px;
            }
            footer {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              height: 30px;
              background-color: gray;
              color: white;
              line-height: 30px;
              padding-left:30px;
            }
            table, th, td {
                border: 1px solid black;
                text-align:center;
              }
          </style>
        </head>
        <body style="margin-top:0px">
          <header>
          <div style="width: 100%;">
    <div style="display: flex; justify-content: center; align-items: center;">
        <img src=${user?.user.hospitalLogo} style="width: 100px; height: 100px;" alt="Hospital Logo" />
        <h4 style="margin-top: 35px; margin-left: 15px;">${user?.user.hospitalName}</h4>
    </div>
    <div style="margin-top: 10px;">
        <div style="margin-bottom:-20px">${user?.user.hospitalAddress}</div>
        <span>Contact: ${user?.user.hospitalContact}</span>
    </div>
</div>

          </header>
            <div style="width: 800px; margin-right: 50px; margin-top:200px">
              <div class="card" style="border: 2px solid black;">
              <div style="font-weight: bold; border-bottom: 2px solid black;">
    <div style="padding: 20px;">
        <div style="display: flex; flex-wrap: wrap;">
            <div style="flex: 1 0 33.333333%; max-width: 33.333333%;">
                <div style="height: 10px;">
                ${patientData.pid}            </div>
            </div>
            <div style="flex: 1 0 33.333333%; max-width: 33.333333%; display: flex; justify-content: flex-end;">
                <div>
                    <div>Name: ${patientData.name}</div>
                    <div>Age/Sex: ${patientData.page}/${patientData.pGender}</div>
                    <div>Address: ${patientData.pAddress}</div>
                    <div>Mobile No: ${patientData.pMobileNo}</div>
                </div>
            </div>
            <div style="flex: 1 0 33.333333%; max-width: 33.333333%; display: flex; justify-content: flex-end;">
                <div>
                    <div>OPD Case No: ${patientData.opdCaseNo}</div>
                    <div>OPD id: ${patientData.opduid}</div>
                    <div>Date: ${patientData.consultingDate}</div>
                    <div>Consulting Dr.: Dr ${patientData.drName}</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div style="display: flex; flex-wrap: wrap; padding: 20px;">
    <div style="flex: 0 0 50%; max-width: 50%;">
        <span><b>Diagnosis: ${patientData.diagnosis}</b></span>
    </div>
    <div style="flex: 0 0 50%; max-width: 50%;">
        <span><b>Follow up:${patientData.followup}</b></span>
    </div>
</div>

<div class="text-center" style="display: flex; justify-content: center; background-color: gainsboro; margin-left: 1px; margin-right: 1px; border-bottom: 2px solid black; border-top: 2px solid black;">
<h4 style="margin: 0; padding: 10px;">PRESCRIPTION</h4>
</div>

<div style="padding: 20px;">
<div style="margin-top: 20px;">
    <label><b>RX(Advice on OPD):</b></label>
    <div style="border: 1px solid #dee2e6; border-radius: 0.25rem;">
        <table style="width: 100%; border-collapse: collapse;">
            <thead style="background-color: #f8f9fa;">
                <tr>
                    <th style="padding: 8px;">Medicine Name</th>
                    <th style="padding: 8px;">Frequency</th>
                    <th style="padding: 8px;">Day</th>
                    <th style="padding: 8px;">Total</th>
                    <th style="padding: 8px;">Advice</th>
                </tr>
            </thead>
            <tbody>
            ${patientData.prescription.map((item: any, index: any) => `
            <tr key=${index}>
                <td style="padding: 8px;">${item.medicine}</td>
                <td style="padding: 8px;">${item.frequency.M}-${item.frequency.A}-${item.frequency.E}-${item.frequency.N}</td>
                <td style="padding: 8px;">${item.days}</td>
                <td style="padding: 8px;">${item.total}</td>
                <td style="padding: 8px;">${item.advice}</td>
            </tr>
        `).join('')}}
               
            </tbody>
        </table>
    </div>
</div>
</div>
<div style="padding: 20px; width: 95%;">
<div><b>General instructions:</b></div>
<div style="border: 2px solid black; border-radius: 0.25rem; padding: 10px;">
    <b>${patientData.generalInstruction}</b><br>
</div>
</div>
              </div>
            </div>
            <footer><span><b>Powered by:</b> Skyban Technology Pvt Ltd</span></footer>
            </body>
          </html>
          `
    });
}