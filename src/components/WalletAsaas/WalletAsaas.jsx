import { useState } from "react";
import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Divider,
  CircularProgress,
} from "@mui/material";

export default function WalletAsaas({ amount, productName, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Customer
    name: "",
    email: "",
    cpfCnpj: "",
    phone: "",

    // Address
    postalCode: "",
    addressNumber: "",

    // Card
    holderName: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    ccv: "",
    installments: 1,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pagar = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://api.morgannaerafael.com.br/pagamento-cartao",
        {
          value: amount,
          productName: productName,
          installments: Number(form.installments),

          customer: {
            name: form.name,
            email: form.email,
            cpfCnpj: form.cpfCnpj,
            phone: form.phone,
          },

          creditCard: {
            holderName: form.holderName,
            number: form.number.replace(/\s/g, ""),
            expiryMonth: form.expiryMonth,
            expiryYear: form.expiryYear,
            ccv: form.ccv,
          },

          creditCardHolderInfo: {
            name: form.name,
            email: form.email,
            cpfCnpj: form.cpfCnpj,
            postalCode: form.postalCode,
            addressNumber: form.addressNumber,
            phone: form.phone,
          },
        },
      );

      console.log(response.data);

      if (onPaymentSuccess) {
        onPaymentSuccess();
      }

      alert("Pagamento realizado com sucesso!");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.error?.errors?.[0]?.description ||
          "Erro ao processar pagamento",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 2,
      }}
    >
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Finalizar Pagamento
          </Typography>

          <Typography color="text.secondary" mb={3}>
            Preencha seus dados para concluir a compra.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Dados do cliente */}
          <Typography variant="h6" mb={2}>
            Dados do Cliente
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nome completo"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Telefone"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="CPF/CNPJ"
                value={form.cpfCnpj}
                onChange={(e) => handleChange("cpfCnpj", e.target.value)}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Endereço */}
          <Typography variant="h6" mb={2}>
            Endereço de Cobrança
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="CEP"
                value={form.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Número"
                value={form.addressNumber}
                onChange={(e) => handleChange("addressNumber", e.target.value)}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Cartão */}
          <Typography variant="h6" mb={2}>
            Dados do Cartão
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nome impresso no cartão"
                value={form.holderName}
                onChange={(e) => handleChange("holderName", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Número do cartão"
                value={form.number}
                onChange={(e) => handleChange("number", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <TextField
                fullWidth
                label="Mês"
                placeholder="12"
                value={form.expiryMonth}
                onChange={(e) => handleChange("expiryMonth", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <TextField
                fullWidth
                label="Ano"
                placeholder="2030"
                value={form.expiryYear}
                onChange={(e) => handleChange("expiryYear", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <TextField
                fullWidth
                label="CVV"
                value={form.ccv}
                onChange={(e) => handleChange("ccv", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Parcelas"
                value={form.installments}
                onChange={(e) => handleChange("installments", e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}x
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
            }}
            onClick={pagar}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : `Pagar R$:${amount}`}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
