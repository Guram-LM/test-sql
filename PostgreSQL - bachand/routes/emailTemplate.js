export const emailTemplate = ({ title, code, subtitle }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="
  margin:0;
  padding:0;
  background:#0f172a;
  font-family:Arial, sans-serif;
">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0">
        <table width="420" style="
          background:#020617;
          border-radius:16px;
          padding:32px;
          color:#e5e7eb;
          box-shadow:0 20px 40px rgba(0,0,0,.4)
        ">
          <tr>
            <td align="center">
              <h2 style="margin:0 0 10px;color:#a855f7">
                ${title}
              </h2>
              <p style="opacity:.8;margin-bottom:24px">
                ${subtitle}
              </p>

              <div style="
                font-size:32px;
                letter-spacing:6px;
                font-weight:bold;
                background:#020617;
                border:1px dashed #a855f7;
                padding:16px 24px;
                border-radius:12px;
                display:inline-block;
                margin-bottom:24px;
                color:#fff;
              ">
                ${code}
              </div>

              <p style="font-size:13px;opacity:.6">
                კოდი მოქმედია 5 წუთის განმავლობაში
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
