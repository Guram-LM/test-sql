import { useCreateWithModal } from "../../component/hook/handleSubmit";
import ErrorModal from "../../component/modal/errorModal/ErrorModal";
import SuccessModal from "../../component/modal/successModal/SuccessModal";
import ResourceForm from "../../component/resourceForm/ResourceForm";


export default function CreateFeedback() {

  const {
    handleSubmit,
    isPending,
    successOpen,
    errorOpen,
    setSuccessOpen,
    setErrorOpen
  } = useCreateWithModal("feedback");

  return (
    <> 
      <ResourceForm
        type="feedback"
        onSubmit={handleSubmit}
        loading={isPending}
      />

      {successOpen && (
        <SuccessModal onClose={() => setSuccessOpen(false)} />
      )}

      {errorOpen && (
        <ErrorModal onClose={() => setErrorOpen(false)} />
      )}
    </>
  );
}