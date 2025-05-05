"use client";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import MailOffcanvas from "./MailOffcanvas";
import Link from "next/link";
import Image from "next/image";
import EmailReadPanel from "./EmailReadPanel";
import OpenEmail from "./OpenEmail";

import icon_1 from "@/assets/images/dashboard/icon/icon_26.svg";
import icon_2 from "@/assets/images/dashboard/icon/icon_27.svg";
import icon_3 from "@/assets/images/dashboard/icon/icon_43.svg";

const MessageBody = () => {
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <div className="row gx-0 align-items-center">
          <MailOffcanvas />
        </div>

        <div className="bg-white card-box border-20 p0 mt-30">
          <div className="message-wrapper">
            <div className="row gx-0">
              <div className="message-sidebar pt-20">
                <div className="ps-3 pe-3 ps-xxl-4 pe-xxl-4">
                  <div
                    className="message_filter d-flex align-items-center justify-content-between mb-20"
                    id="module_btns"
                  >
                    <button className="filter_btn active">All</button>
                    <button className="filter_btn">
                      <span style={{ background: "#FF4545" }}></span> Morning
                    </button>
                    <button className="filter_btn">
                      <span style={{ background: "#3BDA84" }}></span> Afternoon
                    </button>
                    <button className="filter_btn">
                      <span style={{ background: "#50C0FF" }}></span> Evening
                    </button>
                  </div>
                </div>
                
              </div>

              {/* Mobile iPhone-style horizontal calendar view */}
             

              {/* Optional: Open email panel */}
              {/* <OpenEmail /> */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
