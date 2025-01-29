// Login.tsx
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetRegistrationSuccess } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import AuthForm from "../reusable_components/authForm";
import { useEffect } from "react";
import { eFormType } from "../enums/enums";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(resetRegistrationSuccess()); // Reset registration success to null on login page visit
    if (user) {
      navigate("/dashboard");
    }
  }, [user, dispatch]);

  const handleSubmit = async (email: string, password: string) => {
    await dispatch(loginUser({ email, password }) as any);
  };

  return (
    <AuthForm
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      type={eFormType.LOGIN}
    />
  );
};

export default Login;
