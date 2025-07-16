package com.example.demo.Entity;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class PdfGenerator {

    public static ByteArrayInputStream generatePolicyPdf(String policyNumber, String userName, String vehicleInfo, String date) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Fonts
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10);

            // Title
            Paragraph title = new Paragraph("Automobile Insurance Policy", titleFont);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" ")); // Spacer

            // Body
            document.add(new Paragraph("Policy Number: " + policyNumber, normalFont));
            document.add(new Paragraph("Issued To: " + userName, normalFont));
            document.add(new Paragraph("Vehicle Details: " + vehicleInfo, normalFont));
            document.add(new Paragraph("Issued Date: " + date, normalFont));
            document.add(new Paragraph("Status: ACTIVE", normalFont));
            document.add(new Paragraph(" ")); // Spacer

            // Footer
            Paragraph footer = new Paragraph("Thank you for trusting the Automobile Insurance System.", footerFont);
            footer.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(footer);

        } catch (DocumentException e) {
            throw new RuntimeException("Error generating PDF: " + e.getMessage(), e);
        } finally {
            document.close();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
