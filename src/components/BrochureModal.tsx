'use client';
import React, { useState } from "react";

interface PopupModalProps {
  show: boolean;
  onClose: () => void;
}

const BrochureModal: React.FC<PopupModalProps> = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sendBrochureEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send email");

      const link = document.createElement("a");
      link.href = "/Pricing_FIRMITY FACILITY SOFTWARE UFIRM TECHNOLOGIES.pdf";
      link.download = "Firmity_Brochure";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle} className="clean-modal">

        {/* Close Button */}
        <button onClick={onClose} style={closeButtonStyle}>✕</button>

        {/* Form Section */}
        <div style={formContainerStyle}>
          <h2 className="modal-title">
            Download the Brochure
          </h2>

          <p className="modal-subtext">
            Enter your details to receive the Firmity brochure instantly.
          </p>

          <form onSubmit={handleSubmit} className="modal-form">
            <input type="text" name="name" placeholder="Full Name"
              value={formData.name} onChange={handleChange} required className="modal-input" />

            <input type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleChange} required className="modal-input" />

            <input type="tel" name="phone" placeholder="Phone"
              value={formData.phone} onChange={handleChange} required className="modal-input" />

            <input type="text" name="city" placeholder="City"
              value={formData.city} onChange={handleChange} className="modal-input" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="modal-button"
            >
              {isSubmitting ? "Downloading..." : "Download Brochure"}
            </button>
          </form>
        </div>
      </div>

      {/* Embedded styling — clean & responsive */}
      <style jsx>{`
        .clean-modal {
          animation: fadeIn 0.25s ease;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e3a8a;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .modal-subtext {
          text-align: center;
          font-size: 1rem;
          color: #555;
          margin-bottom: 1.5rem;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-input {
          padding: 0.8rem;
          border-radius: 0.5rem;
          border: 1px solid #ccc;
          font-size: 1rem;
          width: 100%;
          outline: none;
          transition: 0.2s;
        }

        .modal-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
        }

        .modal-button {
          background: #2563eb;
          color: white;
          padding: 0.9rem;
          font-size: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: 0.2s;
        }

        .modal-button:hover {
          background: #1e40af;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .clean-modal {
            width: 95%;
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

/* ====== New Clean Styles ====== */
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.6)",
  zIndex: 10000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.5rem"
};

const modalStyle: React.CSSProperties = {
  background: "white",
  borderRadius: "1rem",
  width: "100%",
  maxWidth: "520px",
  padding: "2rem",
  position: "relative",
  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  background: "transparent",
  border: "none",
  fontSize: "1.4rem",
  cursor: "pointer",
  color: "#444"
};

const formContainerStyle: React.CSSProperties = {
  width: "100%",
};

export default BrochureModal;
