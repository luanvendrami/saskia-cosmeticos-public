"use client";

import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Fade,
  Chip,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ModalPromocional() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const lastVisit = localStorage.getItem("lastVisitTime");
      const currentTime = new Date().getTime();

      if (
        !lastVisit ||
        currentTime - parseInt(lastVisit) > 24 * 60 * 60 * 1000
      ) {
        const timer = setTimeout(() => {
          setOpen(true);
          localStorage.setItem("lastVisitTime", currentTime.toString());
        }, 1500);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };


  const handleBackdropClick = (event: {}, reason: string) => {
    if (reason === "backdropClick") {
      handleClose();
    }
  };


  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!mounted) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleBackdropClick}
        aria-labelledby="promo-dialog-title"
        maxWidth="sm"
        fullWidth
        onClick={handleContentClick}
        disableScrollLock
        sx={{
          backdropFilter: "blur(5px)",
          "& .MuiDialog-paper": {
            backgroundImage:
              "linear-gradient(135deg, #fff6fb 0%, #fff6fb 100%)",
            overflowY: "visible",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={{
          enter: 700,
          exit: 500,
        }}
      >
        <DialogContent
          sx={{
            px: 3,
            pt: { xs: 3, sm: 4 },
            pb: { xs: 3, sm: 4 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#666",
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#000",
              },
              padding: "5px",
              width: "32px",
              height: "32px",
            }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              top: -18,
              right: -18,
              width: 100,
              height: 100,
              background: "linear-gradient(45deg, #ff69b4, #ff8dc7)",
              borderRadius: "50%",
              opacity: 0.1,
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -15,
              left: -15,
              width: 70,
              height: 70,
              background: "linear-gradient(45deg, #ff69b4, #ff8dc7)",
              borderRadius: "50%",
              opacity: 0.1,
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", mb: 1 }}>
            <Chip
              icon={<StarIcon fontSize="small" />}
              label="OFERTA ESPECIAL"
              color="primary"
              size="small"
              sx={{
                mb: 2,
                fontWeight: 500,
                px: 1,
                backgroundColor: "rgba(255, 105, 180, 0.15)",
                color: "#ff4bac",
                border: "1px solid rgba(255, 105, 180, 0.3)",
                "& .MuiChip-icon": {
                  color: "#ff4bac",
                },
              }}
            />
          </Box>

          <Typography
            variant="h6"
            color="text.primary"
            fontWeight="bold"
            sx={{
              mb: 2.5,
              fontSize: "1.4rem",
              letterSpacing: "0.3px",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #ff69b4, #ff1493)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              maxWidth: "280px",
              mx: "auto",
              lineHeight: 1.3,
            }}
          >
            10% de desconto em toda a loja
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3.5,
              maxWidth: "260px",
              mx: "auto",
              lineHeight: 1.5,
              fontSize: "0.9rem",
            }}
          >
            Utilize o código abaixo em qualquer compra com pagamento via PIX ou
            à vista
          </Typography>

          <Box
            sx={{
              p: 2,
              mx: "auto",
              maxWidth: "200px",
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
              border: "1px solid",
              borderColor: "rgba(255, 105, 180, 0.3)",
              mb: 3.5,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -1,
                left: -1,
                right: -1,
                bottom: -1,
                borderRadius: 3,
                padding: "1px",
                background:
                  "linear-gradient(45deg, rgba(255, 105, 180, 0.5), rgba(255, 255, 255, 0), rgba(255, 105, 180, 0.3), rgba(255, 255, 255, 0))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              },
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              letterSpacing={3}
              sx={{
                fontFamily: "monospace",
                fontSize: "1.3rem",
              }}
            >
              PROMO10
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClose}
            startIcon={<LocalOfferIcon />}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              fontSize: "0.95rem",
              letterSpacing: "0.5px",
            }}
          >
            Aproveitar Agora
          </Button>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2,
              color: "text.secondary",
              fontSize: "0.75rem",
              fontStyle: "italic",
            }}
          >
            *Válido por tempo limitado
          </Typography>
        </DialogContent>
      </Dialog>

      {process.env.NODE_ENV === "development" && (
        <Box
          sx={{
            position: "fixed",
            left: 16,
            bottom: 16,
            zIndex: 10000,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={() => {
              localStorage.removeItem("lastVisitTime");
              setOpen(false);
              setTimeout(() => window.location.reload(), 500);
            }}
            sx={{
              bgcolor: "background.default",
              fontSize: "0.7rem",
            }}
          >
            Reset Timer (Dev)
          </Button>
        </Box>
      )}
    </>
  );
}
