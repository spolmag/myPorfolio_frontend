import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  ToggleLeft,
  ToggleRight,
  Trash2,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Loader2,
  ListFilter,
  Settings,
  X,
  User,
  Lock,
  Save,
} from "lucide-react";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_BASE = rawApiUrl.endsWith("/") ? rawApiUrl : `${rawApiUrl}/`;

export const Dashboard = ({ lang, adminUser, onLogout, onAdminUserUpdate }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 🛠️ 1. PROFILE MANAGEMENT CONTROL STATES:
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newUserName, setNewUserName] = useState(adminUser?.userName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);

  const content = {
    EN: {
      title: "Operational Dashboard",
      subtitle: "System Inquiries & Client Message Streams",
      tableClient: "Client / Identity",
      tableMsg: "Message Payload",
      tableTime: "Timestamp (TH)",
      tableStatus: "Ticket Control",
      statusOpen: "Active Inquiry",
      statusClosed: "Archived / Closed",
      btnOpen: "Close Ticket",
      btnClose: "Reopen Ticket",
      btnDelete: "Purge Document",
      emptyMsg: "No client communications recorded in database cluster.",
      tabAll: "All Logs",
      tabActive: "Open Tickets",
      tabClosed: "Archived",
      settingsTitle: "Admin Settings",
      settingsSubtitle: "Modify operational profile records",
      lblUser: "Update Display Name",
      lblCurrPass: "Current Password",
      lblNewPass: "New Password",
      btnSaveProfile: "Save Profile Name",
      btnSavePass: "Update Password",
    },
    TH: {
      title: "แผงควบคุมผู้ดูแลระบบ",
      subtitle: "รายการข้อความติดต่อสอบถามจากหน้าเว็บไซต์",
      tableClient: "ข้อมูลผู้ติดต่อ",
      tableMsg: "รายละเอียดข้อความ",
      tableTime: "วัน-เวลาที่ส่ง (ไทย)",
      tableStatus: "การจัดการตั๋ว",
      statusOpen: "กำลังดำเนินการ",
      statusClosed: "ปิดงานแล้ว",
      btnOpen: "ปิดงาน",
      btnClose: "เปิดงานใหม่",
      btnDelete: "ลบข้อความ",
      emptyMsg: "ไม่พบข้อความติดต่อสอบถามในระบบฐานข้อมูล",
      tabAll: "ข้อความทั้งหมด",
      tabActive: "กำลังดำเนินการ",
      tabClosed: "ปิดงานแล้ว",
      settingsTitle: "ตั้งค่าผู้ดูแลระบบ",
      settingsSubtitle: "แก้ไขข้อมูลโปรไฟล์การใช้งานระบบ",
      lblUser: "เปลี่ยนชื่อผู้ใช้งาน",
      lblCurrPass: "รหัสผ่านปัจจุบัน",
      lblNewPass: "รหัสผ่านใหม่",
      btnSaveProfile: "บันทึกชื่อโปรไฟล์",
      btnSavePass: "เปลี่ยนรหัสผ่าน",
    },
  };

  const current = content[lang];

  // Sync message data collections on mount phase
  useEffect(() => {
    let isMounted = true;
    const syncBackendData = async () => {
      try {
        const response = await fetch(`${API_BASE}api/contact`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        if (isMounted && response.ok && result.success) {
          setContacts(result.data);
        }
      } catch (error) {
        console.error("Failed to sync backend collections data stack:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    syncBackendData();
    return () => {
      isMounted = false;
    };
  }, []);

  // 🛠️ TOGGLE TICKET STATE (isClosed) via PUT
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE}api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isClosed: !currentStatus }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setContacts((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isClosed: !currentStatus } : item,
          ),
        );
        showNotification("Status adjusted seamlessly.");
      }
    } catch (error) {
      console.error("Failed to mutate ticket flag status:", error);
    }
  };

  // 🛠️ PURGE THE ENTIRE DOCUMENT FROM MONGODB VIA DELETE
  const handleDeleteMessage = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently execute deletion on this document?",
      )
    )
      return;
    try {
      const response = await fetch(`${API_BASE}api/contact/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setContacts((prev) => prev.filter((item) => item._id !== id));
        showNotification("Document purged successfully.");
      }
    } catch (error) {
      console.error("Purge method execution fault:", error);
    }
  };

  // 🧠 FIXED: Added the missing helper function loop to clear compile errors
  const showNotification = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  // 🛠️ 2. SUBMIT USERNAME UPDATE TO EXPRESS
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const response = await fetch(`${API_BASE}api/user/me/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userName: newUserName }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        showNotification(
          lang === "TH"
            ? "อัปเดตชื่อผู้ใช้งานสำเร็จ!"
            : "Username updated successfully!",
        );
        onAdminUserUpdate({ ...adminUser, userName: newUserName });
      } else {
        showNotification(result.error?.message || "Profile update failed.");
      }
    } catch {
      showNotification("Network error updating profile.");
    } finally {
      setSettingsLoading(false);
    }
  };

  // 🛠️ 3. SUBMIT PASSWORD CHANGE TO EXPRESS
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const response = await fetch(`${API_BASE}api/user/me/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        showNotification(
          lang === "TH"
            ? "เปลี่ยนรหัสผ่านสำเร็จ!"
            : "Password changed successfully!",
        );
        setCurrentPassword("");
        setNewPassword("");
      } else {
        showNotification(
          result.error?.message || "Incorrect current password.",
        );
      }
    } catch {
      showNotification("Network error changing password.");
    } finally {
      setSettingsLoading(false);
    }
  };

  // Dynamic formatting calculation tool tracking local Bangkok times offset
  const formatToThaiTime = (utcString) => {
    if (!utcString) return "";
    const dateObj = new Date(utcString);
    const dateStr = dateObj.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Bangkok",
    });
    const timeStr = dateObj.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    });
    return `${dateStr} - ${timeStr} น.`;
  };

  // Client filtering evaluation loop arrays matrix
  const filteredContacts = contacts.filter((c) => {
    if (activeTab === "active") return c.isClosed === false;
    if (activeTab === "closed") return c.isClosed === true;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-zinc-100 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Control Banner Header */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-zinc-800 pb-6 mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent uppercase">
              {current.title}
            </h2>
            <p className="text-zinc-500 font-mono text-xs tracking-wider mt-1 uppercase">
              // Operator:{" "}
              {adminUser?.userName === "Suttipong Polmag" && lang === "TH"
                ? "สุทธิพงษ์ ผลมาก"
                : adminUser?.userName || "Admin"}{" "}
              ({adminUser?.role || "authenticated"})
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all cursor-pointer shadow-md flex items-center space-x-1.5 text-xs font-mono font-bold uppercase"
            >
              <Settings size={14} className="animate-spin-slow" />
              <span className="hidden sm:inline">SETTINGS</span>
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold px-4 py-2 rounded-xl bg-rose-950/20 text-rose-400 border border-rose-900/40 hover:bg-rose-950/40 hover:text-rose-300 transition-all cursor-pointer shadow-md"
            >
              <span>DISCONNECT PORTAL</span>
              <LogOut size={12} />
            </button>
          </div>
        </div>

        {/* Segmented Filter Tabs link bar */}
        <div className="flex items-center space-x-2 mb-6 bg-neutral-900/40 p-1.5 rounded-xl border border-zinc-900 w-fit max-w-full overflow-x-auto">
          <div className="px-2 text-zinc-500 hidden sm:block">
            <ListFilter size={14} />
          </div>
          {[
            { id: "all", label: current.tabAll },
            { id: "active", label: current.tabActive },
            { id: "closed", label: current.tabClosed },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all cursor-pointer shrink-0 uppercase ${
                activeTab === tab.id
                  ? "bg-zinc-800 text-white border border-zinc-700 shadow-inner"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {feedbackMsg && (
          <div className="fixed top-20 right-4 z-50 p-3 rounded-xl bg-zinc-900 border border-zinc-700 font-mono text-xs text-zinc-300 shadow-xl">
            {feedbackMsg}
          </div>
        )}

        {/* Industrial Dashboard Grid Display Table */}
        {isLoading ? (
          <div className="text-center font-mono text-xs text-zinc-600 flex items-center justify-center space-x-2 py-12">
            <Loader2 size={14} className="animate-spin" />
            <span>// BUFFERING SYNC STREAM...</span>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center font-mono text-xs text-zinc-500 bg-neutral-900/20 border border-zinc-800 p-12 rounded-2xl">
            // {current.emptyMsg}
          </div>
        ) : (
          <div className="overflow-x-auto bg-linear-to-b from-zinc-900/30 to-neutral-950 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-md">
            <table className="w-full text-left text-sm border-collapse min-w-200">
              <thead className="bg-neutral-950 font-mono text-xs tracking-wider text-zinc-400 border-b border-zinc-800 uppercase">
                <tr>
                  <th className="p-4 w-1/4">{current.tableClient}</th>
                  <th className="p-4 w-2/5">{current.tableMsg}</th>
                  <th className="p-4 w-1/5">{current.tableTime}</th>
                  <th className="p-4 text-center w-1/5">
                    {current.tableStatus}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 font-medium">
                {filteredContacts.map((c) => (
                  <tr
                    key={c._id}
                    className={`hover:bg-zinc-900/20 transition-colors ${c.isClosed ? "opacity-40 bg-neutral-950/20" : ""}`}
                  >
                    <td className="p-4 align-top space-y-1.5">
                      <div className="font-bold text-zinc-200 text-base">
                        {c.name}
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                        <Mail size={12} className="text-zinc-600" />
                        <span className="truncate max-w-45">{c.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                        <Phone size={12} className="text-zinc-600" />
                        <span>{c.phone}</span>
                      </div>
                      {c.lineId && (
                        <div className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-900/60 w-fit px-1.5 py-0.5 rounded border border-zinc-800">
                          LN: {c.lineId}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-zinc-300 leading-relaxed text-xs max-h-32 overflow-y-auto whitespace-pre-wrap bg-neutral-950/40 border border-zinc-900 p-3 rounded-xl font-sans">
                        {c.message}
                      </p>
                    </td>
                    <td className="p-4 align-top font-mono text-xs text-zinc-400 pt-5">
                      {formatToThaiTime(c.createdAt)}
                    </td>
                    <td className="p-4 align-top text-center space-y-3 pt-5">
                      <button
                        onClick={() => handleToggleStatus(c._id, c.isClosed)}
                        className={`inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all border ${
                          c.isClosed
                            ? "bg-neutral-900 text-zinc-500 border-zinc-800 hover:border-zinc-700"
                            : "bg-emerald-950/20 text-emerald-400 border-emerald-900/40 hover:bg-emerald-950/40"
                        }`}
                      >
                        {c.isClosed ? (
                          <AlertCircle size={10} />
                        ) : (
                          <CheckCircle2 size={10} />
                        )}
                        <span>
                          {c.isClosed
                            ? current.statusClosed
                            : current.statusOpen}
                        </span>
                      </button>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleToggleStatus(c._id, c.isClosed)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm"
                          title={
                            c.isClosed ? current.btnClose : current.btnOpen
                          }
                        >
                          {c.isClosed ? (
                            <ToggleLeft size={16} />
                          ) : (
                            <ToggleRight size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(c._id)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-rose-900/60 text-zinc-500 hover:text-rose-400 transition-all cursor-pointer shadow-sm"
                          title={current.btnDelete}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* 🛠️ SLIDE-OUT INDUSTRIAL SETTINGS SIDEBAR COMPONENT PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 z-50 bg-neutral-950 border-l border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.9)] transform transition-transform duration-300 ease-in-out backdrop-blur-md p-6 flex flex-col justify-between ${
          isSettingsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Top Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
            <div>
              <h3 className="text-base font-black tracking-widest text-zinc-200 uppercase">
                {current.settingsTitle}
              </h3>
              <p className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">
                // {current.settingsSubtitle}
              </p>
            </div>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-1 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-zinc-800 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
          <div className="space-y-6">
            {/* Form Part A: Change Profile Name */}
            <form onSubmit={handleUpdateProfile} className="space-y-2">
              <label className="text-[10px] font-mono tracking-wider text-zinc-400 block uppercase">
                {current.lblUser}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
                  <User size={14} />
                </span>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  disabled={settingsLoading}
                  className="w-full bg-neutral-900/60 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-hidden focus:border-zinc-500 font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={settingsLoading}
                className="w-full flex items-center justify-center space-x-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-[10px] py-2 rounded-lg border border-zinc-700/50 cursor-pointer uppercase font-mono"
              >
                <Save size={12} />
                <span>{current.btnSaveProfile}</span>
              </button>
            </form>

            {/* Form Part B: Change Password */}
            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 block uppercase">
                  {current.lblCurrPass}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
                    <Lock size={14} />
                  </span>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={settingsLoading}
                    className="w-full bg-neutral-900/60 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-hidden focus:border-zinc-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 block uppercase">
                  {current.lblNewPass}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
                    <Lock size={14} />
                  </span>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={settingsLoading}
                    className="w-full bg-neutral-900/60 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-hidden focus:border-zinc-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={settingsLoading}
                className="w-full flex items-center justify-center space-x-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-[10px] py-2 rounded-lg border border-zinc-700/50 cursor-pointer uppercase font-mono"
              >
                <Lock size={12} />
                <span>{current.btnSavePass}</span>
              </button>
            </form>
          </div>
        </div>
        <div className="text-center text-[9px] font-mono text-zinc-600 uppercase pt-4">
          // SYSTEM_CORE_V1.0
        </div>
      </div>

      {/* Sidebar Background Dim Overlay */}
      {isSettingsOpen && (
        <div
          onClick={() => setIsSettingsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        />
      )}
    </div>
  );
};
