import { useState } from "react";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";

export const Contact = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    lineId: "",
    message: "",
  });

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
      successMsg: "Form built! Ready to hook up to your backend.",
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
      successMsg: "โครงสร้างฟอร์มพร้อมใช้งาน! สามารถเชื่อมระบบหลังบ้านได้ทันที",
    },
  };

  const current = content[lang];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, this alerts the user. Later you can link this to Formspree, EmailJS, or your backend API.
    alert(current.successMsg);
    console.log("Submitted Data:", formData);
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-zinc-100 border-t border-zinc-900/60"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent uppercase">
            {current.title}
          </h2>
          <p className="text-zinc-500 font-mono text-xs tracking-wider mt-2 uppercase">
            // {current.subtitle}
          </p>
          <div className="w-24 h-px bg-zinc-700 mx-auto mt-4" />
        </div>

        {/* Contact Form Dashboard */}
        <form
          onSubmit={handleSubmit}
          className="bg-linear-to-b from-zinc-900/50 to-neutral-950 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-5"
        >
          {/* Row 1: Name Field */}
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
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 focus:ring-1 focus:ring-zinc-700 transition-all placeholder-zinc-700 font-medium"
              />
            </div>
          </div>

          {/* Row 2: Email Field */}
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
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 focus:ring-1 focus:ring-zinc-700 transition-all placeholder-zinc-700 font-medium"
              />
            </div>
          </div>

          {/* Grid Layout for Tel & LINE ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tel Field */}
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
                  className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 focus:ring-1 focus:ring-zinc-700 transition-all placeholder-zinc-700 font-medium"
                />
              </div>
            </div>

            {/* LINE ID Field */}
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
                  className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 focus:ring-1 focus:ring-zinc-700 transition-all placeholder-zinc-700 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Message Field */}
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
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 focus:ring-1 focus:ring-zinc-700 transition-all placeholder-zinc-700 font-medium resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-linear-to-b from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-200 hover:text-white font-bold text-sm tracking-widest py-3 rounded-xl border border-zinc-600/40 shadow-inner transition-all duration-200 active:scale-99 cursor-pointer uppercase"
            >
              <span>{current.btnSend}</span>
              <Send size={14} className="mt-0.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
