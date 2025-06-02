"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_API_URL } from "@/utils/constants";
import { toast } from "react-toastify";

type FormData = {
  firstName: string;
  lastName?: string;
  mobile?: string | null;
  email?: string | null;
  objectives?: string;
};

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().optional(),
    email: yup.string().email().nullable(),
    phone: yup.string().nullable(),
    objectives: yup.string().optional(),
  })
  .test("email-or-phone", "Email or phone is required", (value) => {
    return !!value?.email || !!value?.phone;
  });

const WaitlistForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post(`${BASE_API_URL}/waitlist/add`, {
        first_name: data.firstName,
        last_name: data.lastName || null,
        mobile: data.mobile || null,
        email: data.email || null,
        objectives: data.objectives || null,
      });

      toast("Successfully added to waitlist!", { position: "top-center" });
      reset();
      setValue("mobile", "");
    } catch (err) {
      toast.error("Failed to join waitlist");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Join the Waitlist</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label>First Name</label>
            <input
              style={styles.input}
              placeholder="Enter Your First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span style={styles.error}>{errors.firstName.message}</span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label>Last Name</label>
            <input
              style={styles.input}
              placeholder="Enter Your Last Name"
              {...register("lastName")}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label>
              Mobile <span style={styles.required}>*</span>
            </label>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country={"in"}
                  {...field}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "12px 12px 12px 48px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                  }}
                  inputProps={{
                    placeholder: "Enter Your Mobile Number",
                    name: field.name,
                    required: true,
                  }}
                />
              )}
            />
            {errors.mobile && (
              <span style={styles.error}>{errors.mobile.message}</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label>
              Email <span style={styles.required}>*</span>
            </label>
            <input
              style={styles.input}
              placeholder="Enter Your Email"
              {...register("email")}
            />
            {errors.email && (
              <span style={styles.error}>{errors.email.message}</span>
            )}
          </div>
        </div>

        <div style={styles.textareaGroup}>
          <label>What are your health objectives</label>
          <textarea
            style={styles.input}
            placeholder="Enter Your Health Objectives"
            {...register("objectives")}
            rows={4}
          />
        </div>

        <p style={styles.consent}>
          By clicking the send button, you are giving us consent to call or send
          you an SMS, even if your number is listed under do-not-disturb
        </p>

        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default WaitlistForm;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "720px",
    margin: "60px auto",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    fontFamily: "Inter, sans-serif",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "28px",
    marginBottom: "30px",
    color: "#222",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  inputGroup: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  textareaGroup: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    color: "#e63946",
    fontSize: "12px",
    marginTop: "6px",
  },
  required: {
    color: "#e63946",
    fontWeight: 500,
  },
  consent: {
    fontSize: "12px",
    color: "#6c757d",
    marginTop: "-10px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "12px 32px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    alignSelf: "center",
    transition: "all 0.3s ease",
  },
  input: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "14px",
    outline: "none",
  },
};
