import { useState } from "react";
import { useCreateResource } from "../../services/queries/mutations/useCreateResource";
import type { ResourceType } from "../../services/queries/query/useFetchResources";


export function useCreateWithModal(resourceType: ResourceType) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const { mutate, isPending } = useCreateResource(resourceType);

  const handleSubmit = (
    values: any,
    file?: File | null,
    resetForm?: () => void
  ) => {
    mutate(
      { values, file },
      {
        onSuccess: () => {
          resetForm?.();
          setSuccessOpen(true);
        },
        onError: () => {
          setErrorOpen(true);
        }
      }
    );
  };

  return {
    handleSubmit,
    isPending,
    successOpen,
    setSuccessOpen,
    errorOpen,
    setErrorOpen
  };
}