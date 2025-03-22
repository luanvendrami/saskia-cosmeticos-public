"use client";

import { useState, useEffect } from "react";
import {
  FiX,
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

/**
 * CheckoutModal props
 */
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (deliveryInfo: DeliveryInfo) => void;
}

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
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#ff69b4",
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
          },
        },
      },
    },
  },
});

/**
 * CheckoutModal component
 * Displays a modal with options for pickup or delivery
 * Shows address form if delivery is selected
 */
export default function DeliveryModal({
  isOpen,
  onClose,
  onCheckout,
}: CheckoutModalProps) {
  // Delivery method state
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">(
    "pickup"
  );

  // Address form state
  const [address, setAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    zipCode: "",
    complement: "",
    reference: "",
    state: "", // Added state to fix the type error
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

  /**
   * Handles form submission
   */
  const handleSubmit = () => {
    // Reset errors
    const newErrors: Record<string, string> = {};

    if (deliveryType === "delivery") {
      // Validate address fields
      if (!address.street) newErrors.street = "Rua é obrigatória";
      if (!address.number) newErrors.number = "Número é obrigatório";
      if (!address.neighborhood)
        newErrors.neighborhood = "Bairro é obrigatório";
      if (!address.city) newErrors.city = "Cidade é obrigatória";
      if (!address.zipCode) newErrors.zipCode = "CEP é obrigatório";
      if (!address.state) newErrors.state = "Estado é obrigatório";
    }

    setErrors(newErrors);

    // If there are no errors, proceed with checkout
    if (Object.keys(newErrors).length === 0) {
      onCheckout({
        deliveryType,
        address: deliveryType === "delivery" ? address : undefined,
      });
    }
  };

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
      console.error("Erro ao buscar CEP:", error);
      setCepError("Erro ao buscar CEP. Tente novamente.");
      setIsAddressFromCep(false);
    } finally {
      setIsLoadingCep(false);
    }
  };

  /**
   * Formats the CEP as the user types
   */
  const formatCepInput = (value: string): string => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 5) {
      return digits;
    }

    return `${digits.substring(0, 5)}-${digits.substring(5, 8)}`;
  };

  /**
   * Handles CEP input change with formatting
   */
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCepInput(e.target.value);
    updateAddress("zipCode", formattedCep);

    // If CEP was completely erased, clear all fields
    if (formattedCep === "") {
      setAddress((prev) => ({
        ...prev,
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        complement: "",
        reference: "",
        state: "",
        zipCode: "", // Also ensure zipCode is empty
      }));

      // Reset related states
      setCepError("");
      setFilledByCep({});
      setIsAddressFromCep(false);
    }
  };

  // Update address field
  const updateAddress = (field: string, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for the field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // If updating CEP and it has exactly 8 digits, fetch address info
    // This triggers the lookup as the user types
    if (field === "zipCode" && value.replace(/\D/g, "").length === 8) {
      fetchAddressFromCep(value);
    }
  };

  /**
   * Handles input field focus
   */
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  /**
   * Handles input field blur
   */
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocusedField(null);

    // If leaving the CEP field, trigger the search
    const fieldId = e.target.id;
    if (fieldId === "zipCode" && address.zipCode) {
      const cleanCep = address.zipCode.replace(/\D/g, "");

      // Check if CEP has less than 8 digits
      if (cleanCep.length < 8 && cleanCep.length > 0) {
        setCepError("CEP não encontrado");

        // Clear all address fields
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
          zipCode: address.zipCode,
        }));

        // Reset filledByCep tracking
        setFilledByCep({});
        setIsAddressFromCep(false);
        return;
      }

      // If CEP has exactly 8 digits, proceed with the search
      if (cleanCep.length === 8) {
        fetchAddressFromCep(address.zipCode);
      }
    }
  };

  // Control body scroll when modal state changes
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;

      // Prevent background scrolling when modal is open - more robust approach
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Reset form when modal is closed
      setAddress({
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        zipCode: "",
        complement: "",
        reference: "",
        state: "",
      });
      setErrors({});
      setCepError("");
      setIsAddressFromCep(false);
      setDeliveryType("pickup");
      setFilledByCep({});

      // Restore scrolling and scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    // Cleanup function to ensure scroll is restored if component unmounts while modal is open
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Check if all required fields are filled for delivery
  const isFormComplete =
    deliveryType === "pickup" ||
    (!!address.street &&
      !!address.number &&
      !!address.neighborhood &&
      !!address.city &&
      !!address.zipCode &&
      !!address.state);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        data-modal-type="delivery-modal"
      >
        {/* Backdrop - add onClick with stopPropagation and onClose */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          data-modal-backdrop="true"
        />

        {/* Modal */}
        <div
          className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden transform z-10 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          data-modal-content="true"
        >
          {/* Animation styles */}
          <style jsx global>{`
            @keyframes border-select {
              0% {
                width: 0;
                left: 50%;
                transform: scaleX(0);
              }
              100% {
                width: 100%;
                left: 0;
                transform: scaleX(1);
              }
            }

            .MuiInput-root.field-zoom {
              animation: field-zoom 0.5s ease-in-out;
            }

            @keyframes field-zoom {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
              100% {
                transform: scale(1);
              }
            }

            /* Make the underline animation smoother for standard variant */
            .MuiInput-root:after {
              transition: transform 300ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
              transform-origin: center;
              transform: scaleX(0);
            }

            .MuiInput-root.Mui-focused:after {
              transform: scaleX(1);
              animation: border-select 0.3s ease-out;
            }
          `}</style>

          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-pink-50 to-white">
            <h2 className="text-lg font-medium text-gray-900">
              Finalizar Compra
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="rounded-md bg-white p-2 hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Escolha como deseja receber seu pedido:
            </p>

            {/* Delivery Options */}
            <div className="space-y-3 mb-6">
              {/* Pickup Option */}
              <label
                className={`
                block border rounded-lg p-4 cursor-pointer transition-colors
                ${
                  deliveryType === "pickup"
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:bg-gray-50"
                }
              `}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="deliveryType"
                    className="mt-1 text-pink-500 focus:ring-pink-500"
                    checked={deliveryType === "pickup"}
                    onChange={() => setDeliveryType("pickup")}
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <FiHome className="w-5 h-5 text-pink-500 mr-2" />
                      <span className="font-medium text-gray-900">
                        Retirada no local
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Retire seu pedido diretamente em nossa loja
                    </p>
                  </div>
                </div>
              </label>

              {/* Delivery Option */}
              <label
                className={`
                block border rounded-lg p-4 cursor-pointer transition-colors
                ${
                  deliveryType === "delivery"
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:bg-gray-50"
                }
              `}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="deliveryType"
                    className="mt-1 text-pink-500 focus:ring-pink-500"
                    checked={deliveryType === "delivery"}
                    onChange={() => setDeliveryType("delivery")}
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <FiTruck className="w-5 h-5 text-pink-500 mr-2" />
                      <span className="font-medium text-gray-900">Entrega</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Receba seu pedido no endereço informado
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Address Form - Only shown when delivery is selected */}
            {deliveryType === "delivery" && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <FiMapPin className="mr-2 text-pink-500" />
                  Dados de Entrega
                </h3>

                {/* Shipping notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                  <p className="text-blue-700 text-sm">
                    O frete será calculado por um de nossos atendentes no
                    WhatsApp
                  </p>
                </div>

                {/* CEP Field - First to allow auto-complete */}
                <TextField
                  variant="standard"
                  label="CEP"
                  fullWidth
                  required
                  id="zipCode"
                  value={address.zipCode}
                  onChange={handleCepChange}
                  onFocus={() => handleFocus("zipCode")}
                  onBlur={handleBlur}
                  error={!!errors.zipCode || !!cepError}
                  helperText={
                    errors.zipCode ||
                    cepError ||
                    (isAddressFromCep
                      ? "Endereço preenchido automaticamente"
                      : "")
                  }
                  className={focusedField === "zipCode" ? "field-zoom" : ""}
                  placeholder="00000-000"
                  InputProps={{
                    endAdornment: isLoadingCep ? (
                      <InputAdornment position="end">
                        <CircularProgress size={20} color="primary" />
                      </InputAdornment>
                    ) : null,
                    inputProps: {
                      maxLength: 9,
                    },
                  }}
                  FormHelperTextProps={{
                    style: {
                      color:
                        cepError || errors.zipCode
                          ? "#ef4444"
                          : isAddressFromCep
                          ? "#10b981"
                          : "inherit",
                    },
                  }}
                />

                {/* Street and Number row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <TextField
                      variant="standard"
                      label="Rua"
                      required
                      fullWidth
                      id="street"
                      value={address.street}
                      onChange={(e) => updateAddress("street", e.target.value)}
                      onFocus={() => handleFocus("street")}
                      onBlur={handleBlur}
                      error={!!errors.street}
                      helperText={errors.street}
                      disabled={filledByCep.street}
                      className={focusedField === "street" ? "field-zoom" : ""}
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
                      onChange={(e) => updateAddress("number", e.target.value)}
                      onFocus={() => handleFocus("number")}
                      onBlur={handleBlur}
                      error={!!errors.number}
                      helperText={errors.number}
                      className={focusedField === "number" ? "field-zoom" : ""}
                      placeholder="Ex: 123"
                    />
                  </div>
                </div>

                {/* Neighborhood and City row */}
                <div className="grid grid-cols-2 gap-3">
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
                      error={!!errors.neighborhood}
                      helperText={errors.neighborhood}
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
                      error={!!errors.city}
                      helperText={errors.city}
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
                  error={!!errors.state}
                  helperText={errors.state}
                  disabled={filledByCep.state}
                  className={focusedField === "state" ? "field-zoom" : ""}
                  InputProps={{
                    inputProps: { maxLength: 2 },
                  }}
                />

                {/* Complement */}
                <TextField
                  variant="standard"
                  label="Complemento"
                  fullWidth
                  id="complement"
                  value={address.complement}
                  onChange={(e) => updateAddress("complement", e.target.value)}
                  onFocus={() => handleFocus("complement")}
                  onBlur={handleBlur}
                  className={focusedField === "complement" ? "field-zoom" : ""}
                  placeholder="Apto, Bloco, etc."
                />

                {/* Reference */}
                <TextField
                  variant="standard"
                  label="Ponto de Referência"
                  fullWidth
                  id="reference"
                  value={address.reference}
                  onChange={(e) => updateAddress("reference", e.target.value)}
                  onFocus={() => handleFocus("reference")}
                  onBlur={handleBlur}
                  className={focusedField === "reference" ? "field-zoom" : ""}
                  placeholder="Ex: Próximo ao mercado"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={deliveryType === "delivery" && !isFormComplete}
                className={`w-full border rounded-md py-3 px-4 font-medium text-white transition-colors
                  ${
                    isFormComplete
                      ? "bg-[var(--primary-color)] border-transparent hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      : "bg-gray-400 border-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {!isFormComplete && deliveryType === "delivery" ? (
                  <div className="flex items-center justify-center">
                    <FiAlertCircle className="mr-2" />
                    Preencha todos os campos obrigatórios
                  </div>
                ) : (
                  "Continuar para o WhatsApp"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
