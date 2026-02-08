# 📝 SmartWorksheet Generator

A React-based web application that generates customizable, printable math worksheets for kids to practice arithmetic operations.

## Features

- **Multiple Problem Types**: Addition, subtraction, multiplication, and division
- **Customizable Difficulty**: Control the number of digits for each operation type
- **Word Problems**: Optional contextual math problems with currency support
- **Flexible Configuration**: Choose number of questions (5-50) and worksheet title
- **Answer Key**: Option to include answers for checking work
- **Export Options**: Print directly or download as PDF
- **Live Preview**: See your worksheet before printing or exporting
- **Advanced Settings**: Fine-tune digit counts, currency symbols, and word problem quantities

## How to Use

### 1. Configure Your Worksheet

**Select Problem Types:**
- Check or uncheck the boxes for Addition, Subtraction, Multiplication, and Division
- At least one problem type must be selected

**Set Number of Questions:**
- Choose between 5 and 50 questions using the number input

**Customize Title:**
- Enter a custom title for your worksheet (e.g., "Math Practice - Week 1")

**Word Problems (Optional):**
- Check "Include Word Problems" to add contextual math problems
- Word problems use real-world scenarios with currency

**Answer Key:**
- Check "Include Answer Key in PDF" to include solutions at the end

### 2. Advanced Settings (Optional)

Click the **⚙️ Advanced Settings** button to access additional options:

- **Digit Settings**: Control complexity for each operation type
  - Addition: 1-5 digits per number
  - Subtraction: 1-5 digits per number
  - Multiplication: Set separate digits for multiplicand and multiplier
  - Division: Control divisor digit count
  
- **Word Problems**: 
  - Set how many word problems to include (1-10)
  - Choose currency symbol (₹, $, €, £, ¥)

Click **Apply** to save your advanced settings.

### 3. Generate Worksheet

Click the **🎲 Generate Worksheet** button to create your worksheet with the selected configuration.

### 4. Review and Export

Once generated, you'll see a live preview of your worksheet. Use the action buttons:

- **🖨️ Print**: Opens the browser print dialog for immediate printing
- **📄 Download PDF**: Exports the worksheet as a PDF file you can save and share

The worksheet includes:
- Your custom title at the top
- Problems arranged in a clean, easy-to-read layout
- Space for students to write answers
- Answer key on a separate page (if enabled)

### Tips for Best Results

- Start with 2-digit numbers for younger students
- Mix different problem types to provide variety
- Use word problems to practice reading comprehension alongside math
- Generate multiple worksheets with the same settings for consistent practice
- Print answer keys separately to use as a teaching tool

## Technologies

- React 19
- Vite
- jsPDF (PDF generation)
- ESLint
