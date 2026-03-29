import transporter from "../config/mailer.js";
import { db } from "../database/db.js";
import { events, my_events, partner_events } from "../database/schema.js";
import { eq } from "drizzle-orm";
import { sendPushToAll } from "./push.js";

// ============================================================
// HELPER — local დროის ფორმატირება
// ============================================================

function formatLocalDate(eventUtc, utcOffset) {
  const localMs = new Date(eventUtc).getTime() + Number(utcOffset || 0) * 60_000;
  const d = new Date(localMs);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    date: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
    time: `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`,
  };
}

function buildMeetingBlock(event) {
  if (event.meeting_type === "online") {
    const parts = [];
    if (event.platform) parts.push(`<strong>Platform:</strong> ${event.platform}`);
    if (event.meeting_link) {
      parts.push(`<a href="${event.meeting_link}" style="color:#7C3AED;font-weight:bold;">🔗 Join Meeting</a>`);
    }
    return parts.join("&nbsp;&nbsp;|&nbsp;&nbsp;");
  }
  if (event.meeting_type === "offline") {
    const loc = [event.city, event.address].filter(Boolean).join(", ");
    return loc ? `📍 ${loc}` : "";
  }
  if (event.meeting_link) {
    return `<a href="${event.meeting_link}" style="color:#7C3AED;font-weight:bold;">🔗 Join Meeting</a>`;
  }
  return "";
}

function getTitle(event) {
  if (event.title_ka && event.title_en) return `${event.title_ka} / ${event.title_en}`;
  if (event.title_ka) return event.title_ka;
  if (event.title_en) return event.title_en;
  return event.title || "ივენთი";
}

function getDescription(event) {
  if (event.description_ka || event.description_en) {
    return [event.description_ka, event.description_en].filter(Boolean).join(" / ");
  }
  return event.description || "";
}

// ============================================================
// EMAIL TEMPLATES
// ============================================================

function createdEmailHtml(event) {
  const { date, time } = formatLocalDate(event.eventUtc, event.utcOffset);
  const meetingBlock = buildMeetingBlock(event);
  const title = getTitle(event);
  const description = getDescription(event);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    body{font-family:'Segoe UI',sans-serif;margin:0;padding:0;background:#f8f7ff;}
    .wrap{max-width:600px;margin:20px auto;}
    .header{background:linear-gradient(135deg,#7C3AED,#06B6D4);padding:32px;text-align:center;border-radius:16px 16px 0 0;}
    .body{background:#fff;padding:32px;border-radius:0 0 16px 16px;box-shadow:0 4px 12px rgba(124,58,237,.1);}
    .badge{display:inline-block;background:#ECFDF5;color:#059669;font-weight:bold;padding:6px 16px;border-radius:20px;font-size:14px;margin-bottom:16px;}
    h2{color:#1f2937;margin:0 0 8px;font-size:20px;}
    .desc{color:#6b7280;font-size:14px;line-height:1.6;margin:6px 0 16px;}
    .infobox{background:#F5F3FF;border-left:4px solid #7C3AED;padding:16px 20px;border-radius:8px;margin:16px 0;}
    .row{margin:8px 0;font-size:15px;color:#374151;}
    .footer{text-align:center;color:#9ca3af;font-size:12px;padding:20px;}
  </style></head><body><div class="wrap">
    <div class="header">
      <div style="font-size:52px;">✅</div>
      <div style="color:white;font-size:24px;font-weight:bold;margin-top:8px;">ივენთი შეიქმნა / Event Created</div>
    </div>
    <div class="body">
      <span class="badge">🎉 წარმატებით დაემატა / Successfully Added</span>
      <h2>${title}</h2>
      ${description ? `<p class="desc">${description}</p>` : ""}
      <div class="infobox">
        <div class="row">📅 <strong>თარიღი / Date:</strong> ${date}</div>
        <div class="row">🕐 <strong>დრო / Time:</strong> ${time}</div>
        ${event.timezone ? `<div class="row">🌍 <strong>Zone:</strong> ${event.timezone}</div>` : ""}
        ${event.reminderMinutes ? `<div class="row">⏰ <strong>შეხსენება:</strong> ${event.reminderMinutes} წუთით ადრე</div>` : ""}
        ${meetingBlock ? `<div class="row" style="margin-top:12px;">${meetingBlock}</div>` : ""}
      </div>
      <div style="background:#ECFDF5;padding:14px;border-radius:8px;text-align:center;color:#065F46;font-size:14px;">
        💡 ივენთი წარმატებით დაემატა სისტემაში!
      </div>
    </div>
    <div class="footer">ავტომატური შეტყობინება• ${new Date().toLocaleString("ka-GE")}</div>
  </div></body></html>`;
}

function reminderEmailHtml(event, minutesUntil) {
  const { date, time } = formatLocalDate(event.eventUtc, event.utcOffset);
  const meetingBlock = buildMeetingBlock(event);
  const title = getTitle(event);
  const description = getDescription(event);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    body{font-family:'Segoe UI',sans-serif;margin:0;padding:0;background:#f8f7ff;}
    .wrap{max-width:600px;margin:20px auto;}
    .header{background:linear-gradient(135deg,#7C3AED,#EC4899);padding:32px;text-align:center;border-radius:16px 16px 0 0;}
    .body{background:#fff;padding:32px;border-radius:0 0 16px 16px;}
    .badge{display:inline-block;background:#F3E8FF;color:#7C3AED;font-weight:bold;padding:6px 16px;border-radius:20px;font-size:14px;margin-bottom:16px;}
    h2{color:#1f2937;margin:0 0 8px;font-size:20px;}
    .desc{color:#6b7280;font-size:14px;line-height:1.6;margin:6px 0 16px;}
    .infobox{background:#FAF5FF;border-left:4px solid #7C3AED;padding:16px 20px;border-radius:8px;margin:16px 0;}
    .row{margin:8px 0;font-size:15px;color:#374151;}
    .big{font-size:26px;font-weight:bold;color:#7C3AED;}
    .footer{text-align:center;color:#9ca3af;font-size:12px;padding:20px;}
  </style></head><body><div class="wrap">
    <div class="header">
      <div style="font-size:52px;">⏰</div>
      <div style="color:white;font-size:24px;font-weight:bold;margin-top:8px;">Reminder</div>
    </div>
    <div class="body">
      <span class="badge">Starting soon</span>
      <h2>${title}</h2>
      ${description ? `<p class="desc">${description}</p>` : ""}
      <div class="infobox">
        <div class="row">📅 <strong>თარიღი:</strong> ${date}</div>
        <div class="row">🕐 <strong>დრო:</strong> ${time}</div>
        ${meetingBlock ? `<div class="row" style="margin-top:12px;">${meetingBlock}</div>` : ""}
        <div class="row" style="margin-top:14px;">⏰ <strong>დარჩენილ:</strong> <span class="big">${minutesUntil} წუთი</span></div>
      </div>
    </div>
    <div class="footer">Auto notification • ${new Date().toLocaleString("ka-GE")}</div>
  </div></body></html>`;
}

function startEmailHtml(event) {
  const { date, time } = formatLocalDate(event.eventUtc, event.utcOffset);
  const meetingBlock = buildMeetingBlock(event);
  const title = getTitle(event);
  const description = getDescription(event);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    body{font-family:'Segoe UI',sans-serif;margin:0;padding:0;background:#f8f7ff;}
    .wrap{max-width:600px;margin:20px auto;}
    .header{background:linear-gradient(135deg,#EC4899,#EF4444);padding:32px;text-align:center;border-radius:16px 16px 0 0;}
    .body{background:#fff;padding:32px;border-radius:0 0 16px 16px;}
    .urgent{background:#FFF1F2;border:2px solid #F43F5E;color:#BE123C;font-size:18px;font-weight:bold;padding:14px;border-radius:10px;text-align:center;margin-bottom:20px;}
    h2{color:#1f2937;margin:0 0 8px;font-size:20px;}
    .desc{color:#6b7280;font-size:14px;line-height:1.6;}
    .infobox{background:#FFF1F2;border-left:4px solid #F43F5E;padding:16px 20px;border-radius:8px;margin:16px 0;}
    .row{margin:8px 0;font-size:15px;color:#374151;}
    .live{color:#F43F5E;font-weight:bold;font-size:17px;}
    .footer{text-align:center;color:#9ca3af;font-size:12px;padding:20px;}
  </style></head><body><div class="wrap">
    <div class="header">
      <div style="font-size:52px;">🔔🔥</div>
      <div style="color:white;font-size:26px;font-weight:bold;margin-top:8px;">Event Started</div>
    </div>
    <div class="body">
      <div class="urgent">⚡ Jივენთი იწყება</div>
      <h2>${title}</h2>
      ${description ? `<p class="desc">${description}</p>` : ""}
      <div class="infobox">
        <div class="row">📅 <strong>თარიღი:</strong> ${date}</div>
        <div class="row">🕐 <strong>დრო:</strong> ${time}</div>
        ${meetingBlock ? `<div class="row" style="margin-top:12px;">${meetingBlock}</div>` : ""}
        <div class="row" style="margin-top:12px;">⚡ <strong>სტატუსი:</strong> <span class="live">Live</span></div>
      </div>
    </div>
    <div class="footer">ავტომატური შეტყობინება • ${new Date().toLocaleString("ka-GE")}</div>
  </div></body></html>`;
}

// ============================================================
// SEND CREATED NOTIFICATION
// ============================================================

export async function sendCreatedNotification(event, tableName) {
  const pushTitle = getTitle(event);
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      subject: `Event Created: ${pushTitle}`,
      html: createdEmailHtml(event),
    });
    await sendPushToAll(
      pushTitle,
      `Event created: ${event.event_date} ${event.event_time}`,
      { type: "created", eventId: event.id, table: tableName }
    );
    console.log(`Created notification sent [${tableName}/${event.id}]`);
  } catch (err) {
    console.error(`Created notification error [${tableName}]:`, err.message);
  }
}

// ============================================================
// PROCESS TABLE — Drizzle ORM (db.all/db.run ამოღებულია)
// ============================================================

const TABLE_MAP = { events, my_events, partner_events };

async function processTable(tableName) {
  const table = TABLE_MAP[tableName];
  if (!table) return;

  const now = new Date();

  let rows;
  try {
    rows = await db.select().from(table).orderBy(table.eventUtc);
  } catch {
    return;
  }

  for (const event of rows) {
    if (!event.eventUtc) continue;

    const eventTime = new Date(event.eventUtc);
    const reminderMs = Number(event.reminderMinutes || 30) * 60_000;
    const reminderTime = new Date(eventTime.getTime() - reminderMs);
    const pushTitle = getTitle(event);

    // REMINDER — notified=false, reminder window-ში
    if (!event.notified && now >= reminderTime && now < eventTime) {
      try {
        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: process.env.MAIL_TO,
          subject: `Reminder: ${pushTitle}`,
          html: reminderEmailHtml(event, event.reminderMinutes || 30),
        });
        await sendPushToAll(pushTitle, `Starts in ${event.reminderMinutes || 30} min`, {
          type: "reminder", eventId: event.id, table: tableName,
        });
        await db.update(table).set({ notified: true }).where(eq(table.id, event.id));
      } catch (err) {
        console.error(`Reminder error [${tableName}/${event.id}]:`, err.message);
      }
    }

    // START — notified=false, ივენთი დაიწყო
    if (!event.notified && now >= eventTime) {
      try {
        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: process.env.MAIL_TO,
          subject: `Event Started: ${pushTitle}`,
          html: startEmailHtml(event),
        });
        await sendPushToAll(pushTitle, "Event just started!", {
          type: "start", eventId: event.id, table: tableName,
        });
        await db.update(table).set({ notified: true }).where(eq(table.id, event.id));
      } catch (err) {
        console.error(`Start error [${tableName}/${event.id}]:`, err.message);
      }
    }
  }
}

// ============================================================
// MAIN EXPORT
// ============================================================

export async function checkAndSendEventEmails() {
  try {
    await processTable("events");
    await processTable("my_events");
    await processTable("partner_events");
  } catch (err) {
    console.error("checkAndSendEventEmails error:", err.message);
  }
}

export function startEventEmailNotifier() {
  checkAndSendEventEmails();
  setInterval(checkAndSendEventEmails, 30_000);
}