import { useState } from "react";
import { Send, User, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";

export const Contact = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "", // Note: Maps to 'phone' when sent to the backend
    lineId: "",
    message: "",
  });

  // UI States to handle user interaction status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const content = {
    EN: {
      title: "Get In Touch",
      subtitle: "Drop a line for inquiries or collaborations",
      lblName: "Your Name",
      lblEmail: "Email Address",
      lblTel: "Telephone Number",
      lblLine: "LINE ID (Optional)",
      lblMsg: "Your Message",
      btnSend: "Send Message",
      btnSending: "Sending...",
      successMsg: "Message sent successfully to database!",
      errorMsg: "Connection failed. Please check your backend api.",
    },
    TH: {
      title: "ติดต่อสอบถาม",
      subtitle: "ส่งข้อความเพื่อติดต่องานหรือสอบถามข้อมูลเพิ่มเติม",
      lblName: "ชื่อ-นามสกุลของคุณ",
      lblEmail: "ที่อยู่อีเมล",
      lblTel: "เบอร์โทรศัพท์ติดต่อ",
      lblLine: "LINE ID (ถ้ามี)",
      lblMsg: "ข้อความของคุณ",
      btnSend: "ส่งข้อความ",
      btnSending: "กำลังส่งข้อความ...",
      successMsg: "บันทึกข้อความลงฐานข้อมูลสำเร็จ!",
      errorMsg: "เกิดข้อผิดพลาด กรุณาตรวจสอบการเชื่อมต่อระบบหลังบ้าน",
    },
  };

  const current = content[lang];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Convert React state property fields to match your backend model criteria ('tel' -> 'phone')
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.tel,
      lineId: formData.lineId,
      message: formData.message,
    };

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        // Reset form variables upon successful delivery
        setFormData({ name: "", email: "", tel: "", lineId: "", message: "" });
      } else {
        setSubmitStatus("error");
        console.error("Server validation issue:", result.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network interface connection failure:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-zinc-100 border-t border-zinc-900/60"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent uppercase">
            {current.title}
          </h2>
          <p className="text-zinc-500 font-mono text-xs tracking-wider mt-2 uppercase">
            // {current.subtitle}
          </p>
          <div className="w-24 h-px bg-zinc-700 mx-auto mt-4" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-linear-to-b from-zinc-900/50 to-neutral-950 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-5"
        >
          {/* Status Feedback Banners */}
          {submitStatus === "success" && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              ✓ {current.successMsg}
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400 text-xs font-mono">
              ✕ {current.errorMsg}
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono tracking-wider text-zinc-400 block uppercase">
              {current.lblName} <span className="text-zinc-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                <User size={16} />
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 transition-all font-medium disabled:opacity-50"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono tracking-wider text-zinc-400 block uppercase">
              {current.lblEmail} <span className="text-zinc-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 transition-all font-medium disabled:opacity-50"
              />
            </div>
          </div>

          {/* Tel & Line Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tel */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono tracking-wider text-zinc-400 block uppercase">
                {current.lblTel} <span className="text-zinc-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  name="tel"
                  required
                  value={formData.tel}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 transition-all font-medium disabled:opacity-50"
                />
              </div>
            </div>

            {/* LINE ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono tracking-wider text-zinc-400 block uppercase">
                {current.lblLine}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-xs font-mono tracking-tighter">
                  LN
                </span>
                <input
                  type="text"
                  name="lineId"
                  value={formData.lineId}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 transition-all font-medium disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono tracking-wider text-zinc-400 block uppercase">
              {current.lblMsg} <span className="text-zinc-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-4 text-zinc-600">
                <MessageSquare size={16} />
              </span>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 transition-all font-medium resize-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Button with Loading Indicator State */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-linear-to-b from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-200 hover:text-white font-bold text-sm tracking-widest py-3 rounded-xl border border-zinc-600/40 shadow-inner transition-all duration-200 active:scale-99 cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin mt-0.5" />
                  <span>{current.btnSending}</span>
                </>
              ) : (
                <>
                  <span>{current.btnSend}</span>
                  <Send size={14} className="mt-0.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
