import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF() {
    const content = document.getElementById('worksheet-content');

    if (!content) {
        console.error('Worksheet content not found');
        return;
    }

    try {
        // Get all worksheet pages
        const pages = content.querySelectorAll('.worksheet-page');

        if (pages.length === 0) {
            console.error('No worksheet pages found');
            return;
        }

        // Create PDF (A4 size: 210mm x 297mm)
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];

            // Capture the page as canvas
            const canvas = await html2canvas(page, {
                scale: 2, // Higher quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // Convert canvas to image
            const imgData = canvas.toDataURL('image/png');

            // Calculate dimensions to fit A4
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * pageWidth) / canvas.width;

            // Add new page if not the first page
            if (i > 0) {
                pdf.addPage();
            }

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `worksheet_${timestamp}.pdf`;

        // Save the PDF
        pdf.save(filename);

        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

export function printWorksheet() {
    window.print();
}
