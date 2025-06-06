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
                  {/* <li className="d-none d-md-inline-block ms-3 ms-xl-4 me-xl-4  text-white"> */}
                  {/*  <Link href="/dashboard/add-property" className="btn-five md rounded-0" target="_blank"><span>Add Listing</span> <i className="fa-thin fa-arrow-up-right"></i></Link> */}
                  {/* </li> */}
                  {/* <li className="d-none d-xl-block  text-white">
                    <button
                      onClick={() => setOffCanvas(true)}
                      style={{ cursor: "pointer" }}
                      className="sidenavbtn rounded-circle tran3s  text-white"
                      type="button"
                    >
                      <i className="fa-sharp fa-light fa-bars-filter "></i>
                    </button>
                  </li> */}
                </ul>
              </div>

              {/*    <div className="order-lg-2 d-none d-xxl-block">
                        <p className="m0 email-text ps-5 pe-5">Our Email <Link href="#" className="tran3s fw-500 ms-2">askhomy@demo.com</Link></p>
                     </div> */}

              {/* <nav className="navbar navbar-expand-lg p0 ms-lg-5 order-lg-3">
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <NavMenu />
                </div>
              </nav> */}
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
