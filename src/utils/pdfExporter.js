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

            // Capture the page as canvas, clipped strictly to the page's own
            // box so nothing (e.g. the footer) can bleed past the A4 boundary
            const canvas = await html2canvas(page, {
                scale: 2, // Higher quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: page.offsetWidth,
                height: page.offsetHeight,
                windowWidth: page.offsetWidth,
                windowHeight: page.offsetHeight
            });

            // Convert canvas to image
            const imgData = canvas.toDataURL('image/png');

            // Every worksheet page is a fixed A4 box, so draw it at the
            // exact A4 dimensions rather than deriving height from the
            // canvas aspect ratio (which can drift from rounding).
            const imgWidth = pageWidth;
            const imgHeight = pageHeight;

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
