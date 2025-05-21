"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import axios from "axios";

import OpenEye from "@/assets/images/icon/icon_68.svg";
import { BASE_API_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface FormData {
  identifier: string; // email or phone
  password: string;
}

interface LoginFormProps {
  closeModal: () => void;
}

// Simple phone regex
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

const LoginForm = ({ closeModal }: LoginFormProps) => {
  const router = useRouter();
  const schema = yup.object({
    identifier: yup
      .string()
      .required("Email or phone is required")
      .test(
        "is-email-or-phone",
        "Enter a valid email or phone number",
        (value) =>
          !!value &&
          (yup.string().email().isValidSync(value) || phoneRegex.test(value))
      ),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/auth/login`, {
        identifier: data.identifier,
        password: data.password,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      toast.success("Login successful!", { position: "top-center" });
      reset();
      closeModal?.();
      // ✅ Redirect after successful login
      router.push("/home-one");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.detail || "Login failed. Check credentials.",
        { position: "top-center" }
      );
    }
  };

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email or Phone*</label>
            <input
              type="text"
              {...register("identifier")}
              placeholder="Enter your email or phone number"
            />
            <p className="form_error">{errors.identifier?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Enter Password"
              className="pass_log_id"
            />
            <span className="placeholder_icon">
              <span
                className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}
              >
                <Image
                  onClick={togglePasswordVisibility}
                  src={OpenEye}
                  alt=""
                />
              </span>
            </span>
            <p className="form_error">{errors.password?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <Link href="#">Forget Password?</Link>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-two w-100 text-uppercase d-block mt-20"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
