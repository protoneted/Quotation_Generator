const converter = require('number-to-words');
import {Images} from '../assets/Images'
import { image0, image1, image2, image3 } from './base64Img';
export const pdfpdf = (formData) => {
    const {
        ConsumerNumber,
        CustomerName,
        CustomerAddress,
        CustomerMobile,
        CustomerEmail,
        Customertype,
        NoOfPanel,
        panelWattPeak,
        sellingRate,
        gstPercent,
        noOfPhase,
        meterCharges,
        structureCharges,
        panelBrandName,
        panelBrandCharges,
        inverterBrand,
        inverterCapacity,
        inverterCharges,
        noOfMeter
    } = formData;

    const CustomerReqKW = (NoOfPanel * panelWattPeak / 1000).toFixed(2)
    let subsidyAmmount;    
    const d = new Date();
    const todayDate = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
    if (Customertype === 'House-Hold') {
        if (CustomerReqKW <= 2) {
            subsidyAmmount = (CustomerReqKW * 30000).toFixed(2)
        } else if (CustomerReqKW > 2) {
            if (CustomerReqKW > 3) {
                subsidyAmmount = (2 * 30000 + 1 * 18000).toFixed(2);
            } else if (CustomerReqKW <= 3) {
                subsidyAmmount = (2 * 30000 + (CustomerReqKW - 2) * 18000).toFixed(2)
            }
        };
    } else {
        subsidyAmmount = (CustomerReqKW * 18000).toFixed(2)
    }
    const taxableAmmount = (sellingRate * CustomerReqKW).toFixed(2)
    const noOfPhaseText = noOfPhase == 1 ? 'single' : 'three';
    const totalWithTax = Number(Number(taxableAmmount) + (taxableAmmount * gstPercent) / 100).toFixed(2)
    const totalMeterCharge = (noOfMeter * meterCharges).toFixed(2);
    const totalStructureCharge = (structureCharges * CustomerReqKW).toFixed(2)
    const totalPanelBrandCharge = (panelBrandCharges * CustomerReqKW).toFixed(2)
    const totalInverterBrandCharge = Number(inverterCharges).toFixed(2)
    const totalWithSubsidy = (Number(totalWithTax) + Number(totalMeterCharge) + Number(totalStructureCharge) + Number(totalPanelBrandCharge) + Number(totalInverterBrandCharge)).toFixed(2)
    
    return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A4 Table Structure</title>
    <style>
        body {
            display: block;
            justify-content: center;
            align-items: center;
            margin: 0;
            background-color: #f0f0f0;
            /* Light gray background */
        }

        .a4-container {
            width: 210mm;
            /* A4 width */
            height: 277mm;
            /* A4 height */
            border: 5px solid black;
            /* Black border for the frame */
            background-color: white;
            /* White background */
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1mm;
            /* Optional padding inside the frame */
            box-sizing: border-box;
        }

        .a4-table {
            width: 100%;
            height: 100%;
            border-collapse: collapse;
        }

        .a4-table th,
        .a4-table td {
            border: 1px solid black;
            /* Table cell borders */
            text-align: left;
            padding: 0px;
            /* Cell padding */
            font-size: 14px;
            /* Adjust as needed */
        }
        .inner-table{
            width: 100%;
            height: 100%;
            border-collapse: collapse;
        }

        .inner-table td{
            border: 1px solid black;
            /* Table cell borders */
            text-align: center;
            padding: 0px;
            /* Cell padding */
            font-size: 14px;
        }

        .inner-table td{
            border: 1px solid black;
            /* Table cell borders */
            text-align: center;
            padding: 0px;
            /* Cell padding */
            font-size: 14px;
        }

        .a4-table th {
            background-color: #d3ead4;
            /* Light green header background */
        }
        p {
            margin-bottom: 2px;
            margin-top: 0px;
            margin-left: 2px;
        }
        h2,h4,h5{
            margin-bottom: 3px;
            margin-top: 0px;
        }
        .bottom-table{
            margin-left: 2px;
            margin-top: -25px;
        }
        .bottom-table td{
            padding-right: 30px;
            padding-left: 30px;
            border: 0px solid;
        }

        .bold-font{
            font-weight: bold;
        }

        .left-text p{
            text-align: left;
        }

        p span {
  padding-left: 40px
}
    </style>
</head>

<body>
    <div class="a4-container">
        <table class="a4-table">
            <tbody>
                <tr style="height: 11%;">
                    <td colspan="2" width="18%">
                        <img width="139" height="92" src="data:image/jpg;base64,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">
                    </td>
                    <td colspan="3">
                        <h2>KRISHNA ENTERPRISE</h2>
                        <p>264,CENTAL BAZZAR MALL,NAVSARI</p>
                        <p>KRISHNA PATEL - +918758777152</p>
                        <h4>GSTIN : 24C0HPP3931C1Z6</h4>
                        <p>E-mail: <a href="">krishna.enterprise.6196@gmail.com</a></p>
                    </td>
                    <td colspan="1">
                        <p>Estimate</p>
                        <p>No:</p>
                        <p>Date:</p>
                        <p>SALES PERSON:</p>
                        <p>Phone No.:</p>
                    </td>
                    <td colspan="2">
                        <p>-</p>
                        <p>-</p>
                        <p>${todayDate}</p>
                        <p>KRISHNA ENTERPRISE</p>
                        <p>8758777152</p>
                    </td>
                </tr>
                <tr style="height: 13%;">
                    <td colspan="5">
                        <p>Customer Details:
                        </p>
                        <p>${CustomerName}
                        </p>
                        <p>${CustomerAddress}
                        </p>
                        <p>MOB. +91${CustomerMobile}.
                        </p>
                        <p>Email Id: ${CustomerEmail}</p>
                        <p style="font-weight: bold">Subject: Estimate for ${CustomerReqKW} KW Solar Rooftop Project</p>
                    </td>
                    <td colspan="2">
                        <p>Consumer Number
                        </p>
                        <p>Current Capacity
                        </p>
                        <p>ExtendCapacity
                        </p>
                        <p>Total Capacity
                        </p>
                    </td>
                    <td>
                        <p> ${ConsumerNumber}</p>
                        <p> 0.00 KW
                        </p>
                        <p> ${CustomerReqKW} KW
                        </p>
                        <p> ${CustomerReqKW} KW
                        </p>
                    </td>
                </tr>
                <tr style="height: 1%;">
                    <td colspan="8" style="border-top: 0px solid; border-bottom: 0px solid;">
                        <p style="font-weight: bold; margin-bottom: 4  px;">Commercial Details:</p>
                    </td>
                </tr>
                <tr style="height: 43%;">
                    <td colspan="8">
                        <table class="inner-table">
                            <tbody>
                                <tr style="background-color: #a7e8d2;">
                                    <td>
                                        <p class="bold-font">Sr No.</p>
                                    </td>
                                    <td>
                                        <p class="bold-font">Item Description</p>
                                    </td>
                                    <td><p class="bold-font">Qty</p></td>
                                    <td><p class="bold-font">Rate</p></td>
                                    <td><p class="bold-font">Taxable Amt</p></td>
                                    <td><p class="bold-font">CGST</p></td>
                                    <td><p class="bold-font">SGST</p></td>
                                    <td><p class="bold-font">Amount</p></td>
                                </tr>
                                <tr>
                                    <td rowspan="4"><p>1</p></td>
                                    <td rowspan="4" class="left-text">
                                        <p class="bold-font">Solar Rooftop Project ${CustomerReqKW}KW <br> ${NoOfPanel} X Panels ${panelWattPeak} Watt.</p>
                                        <p>On Grid Inverter</p>
                                        <p>AC & DC Protection Device</p>
                                        <p>Earthing Road - 03 Rods</p>
                                        <p>Lighting Arrester - 1</p>
                                    </td>
                                    <td rowspan="4">
                                        <p>${CustomerReqKW} KW</p>
                                    </td>
                                    <td rowspan="">
                                        <p class="bold-font"> ₹ ${sellingRate}</p>
                                    </td>
                                    <td rowspan="4"><p> ₹ ${taxableAmmount}</p></td>
                                    <td rowspan="3"><p> ₹ ${(((taxableAmmount * gstPercent) / 100) / 2).toFixed(2)}</p></td>
                                    <td rowspan="3"><p> ₹ ${(((taxableAmmount * gstPercent) / 100) / 2).toFixed(2)}</p></td>
                                    <td rowspan="4"><p class="bold-font"> ₹ ${totalWithTax}</p></td>
                                    
                                </tr>
                                <tr><td><p>${gstPercent} %</p></td></tr>
                                <tr><td><p> ₹ ${(sellingRate * gstPercent) / 100}</p></td></tr>
                                <tr>
                                    <td><p> ₹ ${(Number(sellingRate) + Number(sellingRate * gstPercent) / 100).toFixed(2)}</p></td>
                                    <td><p>${(gstPercent/2).toFixed(2)} %</p></td>
                                    <td><p>${(gstPercent/2).toFixed(2)} %</p></td>
                                </tr>
                                <tr>
                                    <td rowspan="4"><p>2</p></td>
                                    <td colspan="7" class="left-text"><p class="bold-font">Govt. Subsidy as per National Portal</p></td>
                                </tr>
                                <tr>
                                    <td colspan="5" class="left-text"><p class="bold-font">Bench Mark Cost As Per MNRE Rate </p></td>
                                <td><p></p></td>
                                <td><p style="color: red;">Subsidy Get Back</p></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="left-text"><p>1.0 - 3.00 kW -  Subsidy</p></td>
                                <td colspan="2"><p class="bold-font"> ${CustomerReqKW} KW</p></td>
                                <td><p>₹ ${subsidyAmmount}</p></td>
                                <td rowspan="2"><p class="bold-font">₹ ${subsidyAmmount}</p></td>
                            </tr>
                            <tr>
                                <td colspan="6"><p class="bold-font"> Total Subsidy</p></td>
                            </tr>
                            <tr>
                                <td><p>3</p></td>
                                <td colspan="3" class="left-text"><p>Bidirectional Meter Charge For ${noOfPhaseText} Phase</p></td>
                                <td colspan="2"><p>${noOfMeter}</p></td>
                                <td><p>₹ ${meterCharges}</p></td>
                                <td><p class="bold-font">₹ ${totalMeterCharge}</p></td>
                            </tr>
                            <tr>
                                <td rowspan="3"><p>4</p></td>
                                <td colspan="3" class="left-text"><p>Elevated Structure Cost</p></td>
                                <td colspan="2" rowspan="3"><p> ${CustomerReqKW} KW</p></td>
                                <td rowspan="3"><p> ₹ ${structureCharges}</p></td>
                                <td rowspan="3"><p class="bold-font"> ₹ ${totalStructureCharge}</p></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="left-text"><p> Structure in Hot-dip Galvanizing</p></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="left-text"><p>Upper Side 8 Lower Side 5</p></td>
                            </tr>
                            <tr>
                                <td><p>5</p></td>
                                <td colspan="3" class="left-text"><p class="bold-font">(L&T MCB 32A.) AC Side.</p></td>
                                <td colspan="2"><p>1</p></td>
                                <td><p></p></td>
                                <td><p class="bold-font"> ₹ 0</p></td>
                            </tr>
                            <tr>
                                <td rowspan="4"><p>6</p></td>
                                <td colspan="7" class="left-text"><p class="bold-font"> B.O.M</p></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="left-text"><p> PANEL <span>${panelBrandName}</span> </p></td>
                                <td colspan="2"><p> ${CustomerReqKW} KW</p></td>
                                <td><p> ₹ ${panelBrandCharges}</p></td>
                                <td><p class="bold-font"> ₹ ${totalPanelBrandCharge}</p></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="left-text"><p>WIRES <span>POLYCAB, HAWELLS, RR</span></p></td>
                                <td colspan="2"><p></p></td>
                                <td><p>-</p></td>
                                <td><p></p></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="left-text"><p>INVERTER <span>${inverterBrand}</span></p></td>
                                <td colspan="2"><p> ${inverterCapacity} KW</p></td>
                                <td><p> ₹ ${totalInverterBrandCharge}</p></td>
                                <td><p> ₹ ${totalInverterBrandCharge}</p></td>
                            </tr>
                            <tr>
                                <td><p>7</p></td>
                                <td colspan="6" class="left-text"><p> Total System Cost</p></td>
                                <td><p class="bold-font"> ₹ ${totalWithSubsidy}</p></td>
                            </tr>
                            <tr>
                                <td rowspan="3" colspan="5" class="left-text"><p> Total in Words : ${converter.toWords(totalWithSubsidy)}</p></td>
                                <td colspan="2"><p> Subsidy Get Back</p></td>
                                <td><p> ₹ ${subsidyAmmount}</p></td>
                            </tr>
                            <tr>
                                <td colspan="2"><p> Actual System Price</p></td>
                                <td><p> ₹ ${totalWithSubsidy}</p></td>
                            </tr>
                            <tr>
                                <td colspan="2"><p>Grand Total</p></td>
                                <td><p> ₹ ${(totalWithSubsidy - subsidyAmmount).toFixed(2)}</p></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height: 32%;">
                    <td colspan="8">
                        <div class="bottom-table">
                        <h3>Required Documents List</h3>
                        <table style="margin-left: 25px; margin-bottom: 10px;">
                            <tbody>
                                <tr>
                                    <td><p>Adhar Card</p></td>
                                    <td><p>Vera Bill</p></td>
                                    <td><p>Cancel Cheq</p></td>
                                    <td style="background-color: #a7e8d2;"><p>KRISHNA ENTERPRISE</p></td>
                                </tr>
                                <tr>
                                    <td><p>Electricity bill</p></td>
                                    <td><p>PAN Card</p></td>
                                    <td><p>Passport Size Photo</p></td>
                                    <td style="background-color: #a7e8d2;"><p>A/C NO -06500210000687</p></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td style="background-color: #a7e8d2;"><p>IFSC - UCBA0000650</p></td>
                                </tr>

                            </tbody>
                        </table>
                        <h5> TERMS & CONDITION :</h5>

 <ul>
    <li> 30 Years Performance Warranty On Solar Panels.</li>
    <li> 7 Year Warranty On Solar On-Grid Inverter.</li>
    <li> 5 Years Operational and Maintanace Warranty On System.</li>
    <li> Warranty On Products Will Depends On The Manufacturere's Terms & Condition.</li>
    <li> Any Physical Damage Wont't Be Considered In Warranty.</li>
    <li> If You Have Any Questions Concerning This Quotation, Please Contact To KRISHNA PATEL on: +918758777152</li>

 </ul>

 Our Pleasure Doing Business With You
</div>
<h4 style="margin-top: 30px;"> /*  This Is Computer Generated Invoice No Signature  Required.</h4>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
`
}