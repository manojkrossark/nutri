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

interface FormData {
  name: string;
  email?: string | null;
  phone?: string | null;
  password: string;
}

const RegisterForm = () => {
  // Custom validation schema that requires at least one of email or phone
  const schema = yup
    .object({
      name: yup.string().required().label("Name"),
      email: yup.string().email().nullable(),
      phone: yup.string().nullable(),
      password: yup.string().required().label("Password"),
    })
    .test("email-or-phone", "Email or phone is required", (value) => {
      return !!value?.email || !!value?.phone;
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(`${BASE_API_URL}/auth/signup`, {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        password: data.password,
      });
      toast("Registration successful", { position: "top-center" });
      reset();
    } catch (err) {
      toast.error("Registration failed");
      console.error(err);
    }
  };

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () =>
    setPasswordVisibility(!isPasswordVisible);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Name*</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter Your Name"
            />
            <p className="form_error">{errors.name?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter Your Email"
            />
            <p className="form_error">{errors.email?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Phone</label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Enter Phone Number"
            />
            <p className="form_error">{errors.phone?.message}</p>
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
                  alt="toggle"
                />
              </span>
            </span>
            <p className="form_error">{errors.password?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember2" />
              <label htmlFor="remember2">
                By hitting the &quot;Register&quot; button, you agree to the{" "}
                <Link href="#">Terms & Conditions</Link> and{" "}
                <Link href="#">Privacy Policy</Link>.
              </label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-two w-100 text-uppercase d-block mt-20"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
