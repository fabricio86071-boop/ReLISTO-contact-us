import { useState } from "react";

const BOARD_ID = "9YiWLzDr3PeTdW4aF";
const API_KEY  = "4dmBkonuSxWW+IxkJMzF7YjphODhV0wRv5mmlQFL4FM=";
const API_URL  = `https://core-api.getaptly.com/api/board/${BOARD_ID}`;

const initialFields = { name: "", email: "", phone: "", subject: "", message: "" };
const initialErrors = { name: false, email: false, phone: false, subject: false, message: false };

export default function ContactForm() {
  const [fields, setFields]   = useState(initialFields);
  const [errors, setErrors]   = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(false);

  const update = (key, val) => {
    setFields(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: false }));
  };

  const validate = () => {
    const e = {
      name:    fields.name.trim().length < 2,
      email:   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email),
      phone:   fields.phone.trim().length < 6,
      subject: fields.subject.trim().length < 2,
      message: fields.message.trim().length < 3,
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleSubmit = async () => {
    setApiError(false);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-token": API_KEY },
        body: JSON.stringify({
          EKRg9wvA87eLXEAzK: fields.name.trim(),
          TTTfBgLoa3Eo4pgfB: fields.email.trim(),
          eedxbuyJ7dsXk73ZG: fields.phone.trim(),
          WGJ4otyiADqQThZ3Z: fields.subject.trim(),
          vZKg9seNcpSAyHGdB: fields.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (key) =>
    `w-full border rounded-sm px-3.5 py-3 text-sm outline-none transition-all bg-white text-[#1a2a24] placeholder-[#b0bdb7] focus:ring-2 focus:ring-[#003846]/10 ${
      errors[key] ? "border-red-500" : "border-[#c8d4cc] focus:border-[#003846]"
    }`;

  return (
    <div className="min-h-screen bg-[#D9E2DB] flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-[560px] bg-white rounded-sm shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#003846] px-12 py-10 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-[#B1C993] opacity-20" />
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-full bg-[#B1C993] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L18 8v10H2V8L10 2z" fill="#003846" stroke="#003846" strokeWidth="0.5"/>
                <rect x="7" y="12" width="6" height="6" fill="#B1C993"/>
              </svg>
            </div>
            <span className="font-bold text-white text-lg tracking-widest uppercase" style={{ fontFamily: "'Century Gothic', 'AppleGothic', sans-serif" }}>
              ReLISTO
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Century Gothic', 'AppleGothic', sans-serif" }}>
            Get in Touch
          </h1>
          <p className="text-[#B1C993] text-sm opacity-90">Our team will respond within one business day.</p>
        </div>

        {/* Body */}
        {success ? (
          <div className="text-center px-10 py-14">
            <div className="w-16 h-16 rounded-full bg-[#B1C993] flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l6 6L22 8" stroke="#003846" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-[#003846] text-xl font-bold mb-2" style={{ fontFamily: "'Century Gothic', 'AppleGothic', sans-serif" }}>
              Message Sent!
            </h2>
            <p className="text-[#5a6a62] text-sm leading-relaxed">
              Thank you for reaching out. A member of the ReLISTO team will be in touch shortly.
            </p>
          </div>
        ) : (
          <div className="px-12 py-10">
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-sm px-3.5 py-3 text-xs text-red-700 mb-5">
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            {/* Name */}
            <div className="mb-5">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[#4C5A52] mb-1.5">Your Name</label>
              <input type="text" placeholder="Jane Smith" value={fields.name}
                onChange={e => update("name", e.target.value)} className={inputClass("name")} />
              {errors.name && <p className="text-red-500 text-[11px] mt-1">Please enter your name.</p>}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[#4C5A52] mb-1.5">Your Email</label>
              <input type="email" placeholder="jane@example.com" value={fields.email}
                onChange={e => update("email", e.target.value)} className={inputClass("email")} />
              {errors.email && <p className="text-red-500 text-[11px] mt-1">Please enter a valid email address.</p>}
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[#4C5A52] mb-1.5">Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" value={fields.phone}
                onChange={e => update("phone", e.target.value)} className={inputClass("phone")} />
              {errors.phone && <p className="text-red-500 text-[11px] mt-1">Please enter your phone number.</p>}
            </div>

            {/* Subject */}
            <div className="mb-5">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[#4C5A52] mb-1.5">Subject</label>
              <input type="text" placeholder="How can we help?" value={fields.subject}
                onChange={e => update("subject", e.target.value)} className={inputClass("subject")} />
              {errors.subject && <p className="text-red-500 text-[11px] mt-1">Please enter a subject.</p>}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[#4C5A52] mb-1.5">Message</label>
              <textarea placeholder="Tell us more about your inquiry…" value={fields.message}
                onChange={e => update("message", e.target.value)}
                rows={4} className={`${inputClass("message")} resize-y leading-relaxed`} />
              {errors.message && <p className="text-red-500 text-[11px] mt-1">Please enter your message.</p>}
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3.5 bg-[#003846] hover:bg-[#004f61] disabled:bg-[#4C5A52] text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
              style={{ fontFamily: "'Century Gothic', 'AppleGothic', sans-serif" }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Sending…
                </span>
              ) : "Send Message"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
