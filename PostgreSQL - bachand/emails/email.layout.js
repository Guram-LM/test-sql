/* ================================================================
   BASE TEMPLATE & COMPONENTS
   Author: Nutsa Bakhtadze
================================================================ */

export function baseTemplate({ title, content }) {
    return `
    <div style="background:#0b0f14;padding:40px 0;font-family:Arial, sans-serif;">
      <div style="max-width:520px;margin:auto;background:#111827;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.3);">
  
        <!-- Header -->
        <div style="padding:30px;text-align:center;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-bottom:2px solid #4f46e5;">
          <h1 style="margin:0;color:white;font-size:20px;letter-spacing:1px;">
            NUTSA BAKHTADZE
          </h1>
          <p style="margin:5px 0 0;color:#e5e7eb;font-size:13px;">
            ${title}
          </p>
        </div>
  
        <!-- Body -->
        <div style="padding:30px;color:#e5e7eb;line-height:1.6;">
          ${content}
        </div>
  
        <!-- Footer -->
        <div style="padding:20px;text-align:center;color:#6b7280;font-size:12px;border-top:1px solid #1f2937;">
          © ${new Date().getFullYear()} <a href="https://nutsabakhtadze.com" style="color:#6366f1;text-decoration:none;">nutsabakhtadze.com</a>
        </div>
  
      </div>
    </div>
    `;
  }
  
  /* ================================================================
     COMPONENTS
  ================================================================ */
  
  export function otpBox(code) {
    return `
      <div style="
        margin:25px 0;
        padding:20px;
        text-align:center;
        font-size:32px;
        letter-spacing:8px;
        background:#1f2937;
        border-radius:12px;
        color:#ffffff;
        font-weight:bold;
        box-shadow: 0 2px 12px rgba(0,0,0,0.5);
      ">
        ${code}
      </div>
    `;
  }
  
  export function paragraph(text) {
    return `<p style="font-size:14px;color:#cbd5e1;line-height:1.6;margin:0 0 16px;">${text}</p>`;
  }
  
  export function divider() {
    return `<div style="width:40px;height:2px;background:#6366f1;margin:28px auto;"></div>`;
  }
  
  export function note(text) {
    return `<p style="font-size:12px;color:#9ca3af;font-style:italic;margin-top:16px;">${text}</p>`;
  }