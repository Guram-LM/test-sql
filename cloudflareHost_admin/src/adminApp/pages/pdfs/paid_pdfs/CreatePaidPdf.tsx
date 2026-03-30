import PdfForm from "../PdfForm";

const CreatePaidPdf = () => {
 

  return (
    <PdfForm endpoint="/pdf/admin/paid-pdfs" buttonText="ფასიანი PDF-ის შექმნა" mode="paid" />
  );
};

export default CreatePaidPdf;