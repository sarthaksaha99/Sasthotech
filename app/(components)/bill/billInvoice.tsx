import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { dataUri } from "./image";

function getBase64FromImageUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    var img = new Image();

    img.setAttribute("crossOrigin", "anonymous");

    // Properly assign the onload event handler to the image
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; // Use img.naturalWidth instead of this.naturalWidth
      canvas.height = img.naturalHeight; // Use img.naturalHeight instead of this.naturalHeight

      var ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };

    img.onerror = function () {
      resolve(
        "https://th.bing.com/th/id/R.6c8d162699a8610897f43452840ac181?rik=zd%2fat%2buvr6CTFQ&riu=http%3a%2f%2fih0.redbubble.net%2fimage.207973242.9515%2fsticker%2c375x360.u4.png&ehk=%2bkIsEJ49lfePiWubYKj3%2bugQKbxiij724tDmTNhHEQk%3d&risl=&pid=ImgRaw&r=0"
      );
    };

    img.src = url;
  });
}

export const pdfDownLoad = (
  tableRow: any,
  btn: string,
  bill: any,
  diagnosticInfo: any,
  preparedBy: string
) => {
  console.log("Hi");
  var company_logo = {
    w: 80,
    h: 50,
  };

  var fontSizes = {
    HeadTitleFontSize: 18,
    Head2TitleFontSize: 16,
    TitleFontSize: 14,
    SubTitleFontSize: 12,
    NormalFontSize: 10,
    SmallFontSize: 8,
  };
  var lineSpacing = {
    NormalSpacing: 12,
  };
  async function generatePDF() {
    var doc = new jsPDF("p", "pt");
    var rightStartCol1 = 400;
    var rightStartCol2 = 480;
    var InitialstartX = 40;
    var startX = 40;
    var InitialstartY = 0;
    var startY = 0;
    var lineHeights = 12;
    doc.setFontSize(fontSizes.SubTitleFontSize);
    doc.setFont("helvetica", "bold");
    var width = doc.internal.pageSize.getWidth();
    // // doc.setFontType("bold");
    var imageUrl = diagnosticInfo.logo;

    var dataURL = await getBase64FromImageUrl(imageUrl);
    console.log(dataURL);
    doc.addImage(
      dataURL,
      "JPEG",
      width / 4,
      (startY += 10),
      company_logo.w,
      company_logo.h
    );

    doc.text(
      diagnosticInfo.name,
      width / 4 + company_logo.w + 6,
      (startY += 15),
      {
        align: "left",
      }
    );
    doc.text(
      diagnosticInfo.address,
      width / 4 + company_logo.w + 6,
      (startY += 15),
      {
        align: "left",
      }
    );
    doc.text(
      "Contact No" + "0190000000" + " " + "Email: " + "abc@gmail.com",
      width / 4 + company_logo.w + 6,
      (startY += 15),
      {
        align: "left",
      }
    );
    doc.line(
      0,
      startY + lineSpacing.NormalSpacing,
      width,
      startY + lineSpacing.NormalSpacing
    );

    doc.setFontSize(fontSizes.Head2TitleFontSize);
    // doc.setFontType("bold");

    doc.setFontSize(fontSizes.NormalFontSize);
    doc.setFont("helvetica", "bold");

    //-------Customer Info Billing---------------------
    var startBilling = startY;

    startY += 40;
    doc.setFontSize(16);
    doc.text(
      "Invoice #:" + bill.labId,
      startX,
      (startY += lineSpacing.NormalSpacing)
    );
    startY += 20;
    doc.setFontSize(fontSizes.NormalFontSize + 3);
    doc.text(
      "Patient Information",
      startX,
      (startY += lineSpacing.NormalSpacing)
    );
    startY += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text(
      "Name : " + bill.name,
      startX,
      (startY += lineSpacing.NormalSpacing)
    );
    // doc.setFontType("normal");
    doc.text(
      "Age : " + bill.age,
      startX,
      (startY += lineSpacing.NormalSpacing)
    );
    // doc.setFontType("bold");
    doc.text(
      "Gender : " + bill.gender,
      startX,
      (startY += lineSpacing.NormalSpacing)
    );
    doc.text(
      "Mobile : " + (bill.phone || "019"),
      startX,
      (startY += lineSpacing.NormalSpacing)
    );
    startY = startBilling;
    var infoX = width / 3;
    startY += 40;
    doc.setFontSize(18);
    doc.text("" + "", infoX, (startY += lineSpacing.NormalSpacing));
    startY += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSizes.NormalFontSize + 3);
    doc.text("Other Information", infoX, (startY += lineSpacing.NormalSpacing));

    startY += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text(
      "Billed By : " + preparedBy,
      infoX,
      (startY += lineSpacing.NormalSpacing)
    );
    // doc.setFontType("normal");

    doc.text(
      "Doctor Name : " + bill.doctorNameFix || "Self",
      infoX,
      (startY += lineSpacing.NormalSpacing)
    );
    startY = startBilling;
    var infoX = (2 * width) / 3;
    startY += 40;
    doc.setFontSize(18);
    doc.text("" + "", infoX, (startY += lineSpacing.NormalSpacing));
    startY += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSizes.NormalFontSize + 3);
    doc.text("Date of Issue", infoX, (startY += lineSpacing.NormalSpacing));

    startY += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text(bill.date, infoX, (startY += lineSpacing.NormalSpacing));
    startY = startBilling;
    var infoX = (3 * width) / 4;
    startY += 40;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Amount" + "", infoX, (startY += lineSpacing.NormalSpacing));
    startY += 10;
    doc.setFontSize(fontSizes.NormalFontSize + 3);
    doc.text("", infoX, (startY += lineSpacing.NormalSpacing));

    startY += 5;
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text("", infoX, (startY += lineSpacing.NormalSpacing));

    doc.setFontSize(20);
    //  doc.setFontStyle("normal");
    startY += 60;
    (startY = startY += 30),
      doc.text(
        "Billing Details",
        width / 2,
        (startY += lineSpacing.NormalSpacing + 2),
        {
          align: "center",
        }
      );
    startY += 30;
    var columns = ["SL No", "Test Name", "Type", "Net Fee"];
    autoTable(doc, { startY: startY, head: [columns], body: tableRow });
    //-------Invoice Footer---------------------
    var rightcol1 = 340;
    var rightcol2 = 430;
    //const v=
    let finalY = (doc as any).lastAutoTable.finalY;
    startY = finalY + 30;
    doc.setFontSize(fontSizes.NormalFontSize);

    // doc.setFontType("bold");

    // doc.setFontType("bold");
    doc.text(
      "For " + diagnosticInfo.name + ",",
      rightcol2,
      (startY += lineSpacing.NormalSpacing + 10)
    );
    doc.text(
      "Authorised Signatory",
      rightcol2,
      (startY += lineSpacing.NormalSpacing + 10)
    );
    doc.setFontSize(10);
    startY += 30;
    doc.text(
      "In association with www.sasthotech.com",
      width / 2,
      (startY += lineSpacing.NormalSpacing + 10),
      {
        align: "center",
      }
    );
    if (btn === "print") {
      doc.autoPrint();
      doc.save("bill.pdf");
    } else doc.save("InvoiceTemplate.pdf");
  }
  generatePDF();
};
