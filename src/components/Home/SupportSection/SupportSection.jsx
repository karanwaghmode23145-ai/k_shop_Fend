import React from "react";
import "./SupportSection.css";

import support_1 from "../../../assets/support-1.png";
import support_2 from "../../../assets/support-2.png";
import support_3 from "../../../assets/support-3.png";
import support_4 from "../../../assets/support-4.png";

const supportData = [
  {
    icon: support_1,
    title: "Free Shipping",
    desc: "Enjoy free shipping on all orders",
  },
  {
    icon: support_2,
    title: "Support 24/7",
    desc: "We’re here to help anytime, day or night",
  },
  {
    icon: support_3,
    title: "Money Return",
    desc: "30-day money-back guarantee",
  },
  {
    icon: support_4,
    title: "Order Discount",
    desc: "Save more with exclusive offers",
  },
];

export default function SupportSection() {
  return (
    <div className="support-area">
      <div className="container">
        <div className="grid">
          {supportData.map((item, index) => (
            <div className="support-card" key={index}>
              <div className="icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <div>
                 <h5>{item.title}</h5>
              <p>{item.desc}</p>
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
