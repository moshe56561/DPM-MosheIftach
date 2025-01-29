import { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./authForm.css";
import { eFormType } from "../enums/enums";

interface AuthFormProps {
  error?: string;
  loading: boolean;
  onSubmit: (email: string, password: string) => void;
  type: eFormType.LOGIN | eFormType.REGISTER;
}

const AuthForm = ({ error, loading, onSubmit, type }: AuthFormProps) => {
  // Explicitly typing the state values

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password confirmation for register type
    if (type === eFormType.REGISTER && password !== passwordConfirm) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError(""); // Reset password error if valid

    onSubmit(email, password);
  };

  const handleRegisterClick = () => {
    navigate(`/${eFormType.REGISTER}`);
  };

  const handleBackToLogin = () => {
    navigate(`/${eFormType.LOGIN}`);
  };

  return (
    <Container maxWidth="xs">
      <Box className="form-container">
        <Typography variant="h4" component="h1" className="form-title">
          {type === eFormType.LOGIN ? "Login" : "Register"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} className="form-box">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          {type === eFormType.REGISTER && (
            <TextField
              label="Confirm Password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="form-input"
              required
            />
          )}
          {passwordError && (
            <Typography color="error" className="error-message">
              {passwordError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="form-submit"
            disabled={loading}
          >
            {type === eFormType.LOGIN ? "Login" : "Register"}
          </Button>
        </Box>
        {error && <Typography className="error-message">{error}</Typography>}
        {type === eFormType.LOGIN && (
          <Button
            variant="text"
            color="primary"
            onClick={handleRegisterClick}
            style={{ marginTop: "8px" }}
          >
            Don’t have an account? Register
          </Button>
        )}
        {type === eFormType.REGISTER && (
          <Button
            variant="text"
            color="primary"
            onClick={handleBackToLogin}
            style={{ marginTop: "8px" }}
          >
            Back to Login
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default AuthForm;
