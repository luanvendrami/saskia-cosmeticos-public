"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FiMapPin,
  FiHome,
  FiTruck,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { DeliveryInfo } from "../../interfaces/delivery";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import GenericModal from "../../components/GenericModal";

// Create a custom theme with pink primary color to match the existing design
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff69b4",
    },
    error: {
      main: "#ef4444",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "12px",
          "& .MuiInput-root": {
            "&:before": {
              borderBottomColor: "#d1d5db",
            },
            "&:after": {
              borderBottomColor: "#ff69b4",
            },
            "&.Mui-focused:after": {
              borderBottomColor: "#ff69b4",
              transform: "scaleX(1)",
              transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            },
            "& input": {
              fontSize: "14px",
              padding: "8px 0",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#ff69b4",
            },
            fontSize: "14px",
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            fontSize: "12px",
          },
        },
      },
    },
  },
});

/**
 * Delivery Modal Page props
 */
interface DeliveryModalPageProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCheckout?: (deliveryInfo: DeliveryInfo) => void;
}

/**
 * Delivery Modal Page
 *
 * A modal for collecting delivery information from users.
 * Uses the GenericModal component for the modal structure.
 */
export default function DeliveryModalPage({
  isOpen: propIsOpen = false,
  onClose = () => {},
  onCheckout = () => {},
}: DeliveryModalPageProps) {
  // Determine if this is a standalone page or a modal
  const isStandalonePage =
    typeof window !== "undefined" &&
    window.location.pathname.includes("/feature/delivery-modal");

  // For standalone page, always show content
  // For modal usage, follow the isOpen prop
  const [isModalOpen, setIsModalOpen] = useState(propIsOpen);

  // Update modal state when prop changes
  useEffect(() => {
    setIsModalOpen(propIsOpen);
  }, [propIsOpen]);

  // Delivery method state
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">(
    "pickup"
  );

  /**
   * Delivery address form state
   */
  const [address, setAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    zipCode: "",
    complement: "",
    reference: "",
    state: "",
  });

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ViaCEP loading state
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");
  const [isAddressFromCep, setIsAddressFromCep] = useState(false);
  const [filledByCep, setFilledByCep] = useState<Record<string, boolean>>({});

  // Input focus state
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    // Simplified validation that only checks required fields
    const newErrors: Record<string, string> = {};
    let formValid = true;

    if (deliveryType === "delivery") {
      // Only validate empty fields before submission
      if (!address.street) formValid = false;
      if (!address.number) formValid = false;
      if (!address.neighborhood) formValid = false;
      if (!address.city) formValid = false;
      if (!address.zipCode) formValid = false;
      if (!address.state) formValid = false;
      if (!address.complement) formValid = false;
      if (!address.reference) formValid = false;
    }

    if (formValid) {
      onCheckout({
        deliveryType,
        address: deliveryType === "delivery" ? address : undefined,
      });
      closeModal();
    }
  }, [deliveryType, address, onCheckout, closeModal]);

  /**
   * Fetches address information from ViaCEP API
   *
   * @param cep - The CEP (postal code) to lookup
   */
  const fetchAddressFromCep = async (cep: string) => {
    setIsLoadingCep(true);
    setCepError("");

    // Remove any non-numeric characters to ensure proper format
    const cleanCep = cep.replace(/\D/g, "");

    // Only proceed if we have 8 digits
    if (cleanCep.length !== 8) {
      setIsLoadingCep(false);
      // Show error for incomplete CEP
      if (cleanCep.length > 0) {
        setCepError("CEP não encontrado");
        // Clear address fields for incomplete CEP
        setAddress((prev) => ({
          ...prev,
          street: "",
          number: "",
          neighborhood: "",
          city: "",
          complement: "",
          reference: "",
          state: "",
          // Keep the zipCode as entered by the user
          zipCode: formatCepInput(cleanCep),
        }));
        setFilledByCep({});
        setIsAddressFromCep(false);
      }
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data = await response.json();

      // ViaCEP returns an error property when CEP is not found
      if (data.erro) {
        setCepError("CEP não encontrado");
        setIsAddressFromCep(false);

        // Clear all address fields when CEP is not found
        setAddress((prev) => ({
          ...prev,
          street: "",
          number: "",
          neighborhood: "",
          city: "",
          complement: "",
          reference: "",
          state: "",
          // Keep the zipCode as entered by the user
          zipCode: formatCepInput(cleanCep),
        }));

        // Reset filledByCep tracking
        setFilledByCep({});
        setIsLoadingCep(false);
        return;
      }

      // Track which fields were filled by the API
      const fieldsFilledByCep: Record<string, boolean> = {};

      // Update address with the data from ViaCEP
      setAddress((prev) => {
        const newAddress = { ...prev };

        // Map ViaCEP response to our address fields
        if (data.logradouro) {
          newAddress.street = data.logradouro;
          fieldsFilledByCep.street = true;
        }

        if (data.bairro) {
          newAddress.neighborhood = data.bairro;
          fieldsFilledByCep.neighborhood = true;
        }

        if (data.localidade) {
          newAddress.city = data.localidade;
          fieldsFilledByCep.city = true;
        }

        if (data.uf) {
          newAddress.state = data.uf;
          fieldsFilledByCep.state = true;
        }

        // Keep the formatted zipCode
        newAddress.zipCode = formatCepInput(cleanCep);

        return newAddress;
      });

      setFilledByCep(fieldsFilledByCep);
      setIsAddressFromCep(Object.keys(fieldsFilledByCep).length > 0);

      // Clear any errors for fields that were populated
      const newErrors = { ...errors };
      if (fieldsFilledByCep.street) delete newErrors.street;
      if (fieldsFilledByCep.neighborhood) delete newErrors.neighborhood;
      if (fieldsFilledByCep.city) delete newErrors.city;
      if (fieldsFilledByCep.state) delete newErrors.state;
      setErrors(newErrors);
    } catch (error) {
      // Failed to fetch CEP data - silent error
      setCepError("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setIsLoadingCep(false);
    }
  };

  /**
   * Formats a CEP input with mask: 00000-000
   *
   * @param value - The raw CEP string
   * @returns Formatted CEP string
   */
  const formatCepInput = (value: string): string => {
    // Remove any non-numeric characters
    const digits = value.replace(/\D/g, "");
    // Apply the mask: 00000-000
    return digits.length > 5
      ? `${digits.substring(0, 5)}-${digits.substring(5, 8)}`
      : digits;
  };

  /**
   * Handles CEP input change
   */
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCepInput(value);

    setAddress((prev) => ({
      ...prev,
      zipCode: formattedValue,
    }));

    // Clear the error if it was previously set
    if (errors.zipCode) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.zipCode;
        return newErrors;
      });
    }

    // Clear the CEP error
    setCepError("");

    // If CEP changed & has 8 digits (excluding the mask), fetch the address
    const cleanCep = formattedValue.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      fetchAddressFromCep(cleanCep);
    } else if (cleanCep.length > 0 && cleanCep.length < 8) {
      // User is typing, clear the address data from CEP
      setIsAddressFromCep(false);
      setFilledByCep({});
    }
  };

  /**
   * Updates address state
   */
  const updateAddress = (field: string, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear the error if it was previously set
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Handles input focus
   */
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  /**
   * Handles input blur
   */
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocusedField(null);

    // Only validate required fields on blur if the user has interacted with them
    const field = e.target.id;
    const value = e.target.value;

    // Only show errors for empty required fields after user interaction
    if (
      value === "" &&
      field !== "complement" &&
      field !== "reference" &&
      e.target.required
    ) {
      setErrors((prev) => ({
        ...prev,
        [field]: "", // Use empty error message to prevent showing red text
      }));
    }
  };

  // Calculate if the form is complete based on delivery type
  const isFormComplete =
    deliveryType === "pickup" ||
    (!!address.street &&
      !!address.number &&
      !!address.neighborhood &&
      !!address.city &&
      !!address.zipCode &&
      !!address.state &&
      !!address.complement &&
      !!address.reference);

  return (
    <ThemeProvider theme={theme}>
      {(isStandalonePage || isModalOpen) && (
        <>
          <style jsx global>{`
            /* Mobile optimizations for form fields */
            @media (max-width: 640px) {
              .MuiInput-root input,
              .MuiInput-root textarea {
                font-size: 16px !important; /* Prevents zoom on iOS */
              }

              .field-zoom {
                transform: scale(1.02);
                transition: transform 0.2s;
              }
            }
          `}</style>
          <GenericModal
            isOpen={isStandalonePage || isModalOpen}
            onClose={closeModal}
            title={
              <div className="flex items-center">
                <FiTruck
                  className="w-5 h-5 text-pink-500 mr-2"
                  suppressHydrationWarning
                />
                <span className="text-base sm:text-lg">
                  Informações de Entrega
                </span>
              </div>
            }
            maxWidth="md"
            dataModalType="delivery-modal"
            className="p-0 mx-2 max-h-[95vh] sm:max-h-[90vh] w-full" // Adjusted padding and height for mobile
            footerContent={
              <div className="flex justify-end w-full px-4 py-3">
                <button
                  onClick={handleSubmit}
                  disabled={deliveryType === "delivery" && !isFormComplete}
                  className={`w-full border rounded-md py-3 px-4 font-medium text-white transition-colors text-base 
                    ${
                      deliveryType === "pickup" || isFormComplete
                        ? "bg-[var(--primary-color)] border-transparent hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        : "bg-gray-400 border-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {deliveryType === "delivery" && !isFormComplete
                    ? "Preencha as informações"
                    : "Continuar para o WhatsApp"}
                </button>
              </div>
            }
          >
            <div className="p-4 sm:p-6 pt-0">
              {/* Delivery Type Selection */}
              <div className="my-4">
                <p className="text-sm text-gray-600 mb-3">
                  Como deseja receber seu pedido?
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("pickup")}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border text-sm font-medium shadow-sm min-h-[70px]
                      ${
                        deliveryType === "pickup"
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    <FiHome
                      className="mb-1 sm:mr-2 w-5 h-5"
                      suppressHydrationWarning
                    />
                    <span className="text-center">Retirar na Loja</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("delivery")}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border text-sm font-medium shadow-sm min-h-[70px]
                      ${
                        deliveryType === "delivery"
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    <FiTruck
                      className="mb-1 sm:mr-2 w-5 h-5"
                      suppressHydrationWarning
                    />
                    <span className="text-center">Entrega</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address Form */}
              {deliveryType === "delivery" && (
                <div className="mt-4 sm:mt-6">
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <FiMapPin
                      className="mr-1 text-pink-500"
                      suppressHydrationWarning
                    />
                    Endereço de Entrega
                  </p>

                  {/* CEP Field */}
                  <TextField
                    variant="standard"
                    label="CEP"
                    required
                    fullWidth
                    id="zipCode"
                    value={address.zipCode}
                    onChange={handleCepChange}
                    onFocus={() => handleFocus("zipCode")}
                    onBlur={handleBlur}
                    error={!!cepError}
                    helperText={cepError || ""}
                    className={focusedField === "zipCode" ? "field-zoom" : ""}
                    placeholder="00000-000"
                    InputProps={{
                      inputProps: { maxLength: 9 },
                      endAdornment: isLoadingCep ? (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ) : null,
                    }}
                  />

                  {/* Street and Number row */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="col-span-2">
                      <TextField
                        variant="standard"
                        label="Rua"
                        required
                        fullWidth
                        id="street"
                        value={address.street}
                        onChange={(e) =>
                          updateAddress("street", e.target.value)
                        }
                        onFocus={() => handleFocus("street")}
                        onBlur={handleBlur}
                        error={false}
                        helperText=""
                        disabled={filledByCep.street}
                        className={
                          focusedField === "street" ? "field-zoom" : ""
                        }
                      />
                    </div>
                    <div>
                      <TextField
                        variant="standard"
                        label="Número"
                        required
                        fullWidth
                        id="number"
                        value={address.number}
                        onChange={(e) =>
                          updateAddress("number", e.target.value)
                        }
                        onFocus={() => handleFocus("number")}
                        onBlur={handleBlur}
                        error={false}
                        helperText=""
                        className={
                          focusedField === "number" ? "field-zoom" : ""
                        }
                        placeholder="Ex: 123"
                      />
                    </div>
                  </div>

                  {/* Neighborhood and City row */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <TextField
                        variant="standard"
                        label="Bairro"
                        required
                        fullWidth
                        id="neighborhood"
                        value={address.neighborhood}
                        onChange={(e) =>
                          updateAddress("neighborhood", e.target.value)
                        }
                        onFocus={() => handleFocus("neighborhood")}
                        onBlur={handleBlur}
                        error={false}
                        helperText=""
                        disabled={filledByCep.neighborhood}
                        className={
                          focusedField === "neighborhood" ? "field-zoom" : ""
                        }
                      />
                    </div>
                    <div>
                      <TextField
                        variant="standard"
                        label="Cidade"
                        required
                        fullWidth
                        id="city"
                        value={address.city}
                        onChange={(e) => updateAddress("city", e.target.value)}
                        onFocus={() => handleFocus("city")}
                        onBlur={handleBlur}
                        error={false}
                        helperText=""
                        disabled={filledByCep.city}
                        className={focusedField === "city" ? "field-zoom" : ""}
                      />
                    </div>
                  </div>

                  {/* State */}
                  <TextField
                    variant="standard"
                    label="Estado"
                    required
                    fullWidth
                    id="state"
                    value={address.state}
                    onChange={(e) => updateAddress("state", e.target.value)}
                    onFocus={() => handleFocus("state")}
                    onBlur={handleBlur}
                    error={false}
                    helperText=""
                    disabled={filledByCep.state}
                    className={focusedField === "state" ? "field-zoom" : ""}
                    InputProps={{
                      inputProps: {
                        maxLength: 2,
                        style: { textTransform: "uppercase" },
                      },
                    }}
                  />

                  {/* Complement */}
                  <TextField
                    variant="standard"
                    label="Complemento"
                    required
                    fullWidth
                    id="complement"
                    value={address.complement}
                    onChange={(e) =>
                      updateAddress("complement", e.target.value)
                    }
                    onFocus={() => handleFocus("complement")}
                    onBlur={handleBlur}
                    error={false}
                    helperText=""
                    className={
                      focusedField === "complement" ? "field-zoom" : ""
                    }
                    placeholder="Apto, Bloco, etc."
                  />

                  {/* Reference */}
                  <TextField
                    variant="standard"
                    label="Ponto de Referência"
                    required
                    fullWidth
                    id="reference"
                    value={address.reference}
                    onChange={(e) => updateAddress("reference", e.target.value)}
                    onFocus={() => handleFocus("reference")}
                    onBlur={handleBlur}
                    error={false}
                    helperText=""
                    className={focusedField === "reference" ? "field-zoom" : ""}
                    placeholder="Ex: Próximo ao mercado"
                  />
                </div>
              )}
            </div>
          </GenericModal>
        </>
      )}
    </ThemeProvider>
  );
}
