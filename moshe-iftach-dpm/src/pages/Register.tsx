import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import AuthForm from "../reusable_components/authForm";
import { useEffect } from "react";
import { eFormType } from "../enums/enums";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registrationSuccess } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (registrationSuccess) {
      navigate(`/${eFormType.LOGIN}`);
    }
  }, [registrationSuccess]);

  const handleSubmit = async (email: string, password: string) => {
    await dispatch(registerUser({ email, password }) as any);
  };

  return (
    <AuthForm
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      type={eFormType.REGISTER}
    />
  );
};

export default Register;
