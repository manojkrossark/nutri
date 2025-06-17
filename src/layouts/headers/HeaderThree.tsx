"use client";
import NavMenu from "./Menu/NavMenu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import LoginModal from "@/modals/LoginModal";
import Offcanvas from "./Menu/Offcanvas";

import logo_1 from "@/assets/images/logo/CromaAlto.png";

const HeaderThree = () => {
  const { sticky } = UseSticky();
  const [offCanvas, setOffCanvas] = useState<boolean>(false);

  return (
    <>
      <header
        className={`theme-main-menu menu-overlay menu-style-five sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
        <div className="inner-content gap-one">
          <div className="top-header position-relative">
            <div className="d-flex align-items-center">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "42px",
                      fontWeight: 400,
                      fontFamily: "'Segoe UI', sans-serif",
                    }}
                  >
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      A
                    </span>
                    <span style={{ color: "#2ac56c" }}>l</span>
                    <span style={{ color: "#2ac56c" }}>t</span>
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      o
                    </span>
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      .
                    </span>
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      n
                    </span>
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      u
                    </span>
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      t
                    </span>
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      r
                    </span>
                    <span
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      i
                    </span>
                  </div>
                </Link>
              </div>

              <div className="right-widget ms-auto me-3 me-lg-0 order-lg-4">
                <ul className="d-flex align-items-center style-none">
                  <li
                    className="d-flex align-items-center login-btn-one"
                    style={sticky ? { color: "#000" } : { color: "#fff" }}
                  >
                    <i className="fa-regular fa-lock"></i>
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      className="fw-500 tran3s"
                      style={sticky ? { color: "#000" } : { color: "#fff" }}
                    >
                      Login{" "}
                      <span
                        className="d-none d-sm-inline-block"
                        style={sticky ? { color: "#000" } : { color: "#fff" }}
                      >
                        / Sign up
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      <LoginModal />
    </>
  );
};

export default HeaderThree;
