const nodemailer = require('nodemailer');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'shaikjailabdin23@gmail.com';

// Create nodemailer transporter if environment credentials exist
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

/**
 * Format standard activity notification HTML email
 */
const buildNotificationHtml = ({ title, userName, userEmail, activityType, timestamp, details }) => {
  const dateStr = timestamp.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const detailsRows = Object.entries(details || {})
    .map(([key, val]) => `<tr><td style="padding: 6px 12px; color: #a8b3c5; font-weight: 600; text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}:</td><td style="padding: 6px 12px; color: #ffffff;">${typeof val === 'object' ? JSON.stringify(val) : val}</td></tr>`)
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #07111f; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #07111f; padding: 30px 10px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #0d1b2a; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%); padding: 24px 30px; text-align: left;">
                <h1 style="margin: 0; font-size: 22px; color: #ffffff; letter-spacing: 0.5px;">HUB LEARNING • ADMIN NOTIFICATION</h1>
                <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Real-Time Engineering Platform Alert</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px;">
                <h2 style="margin: 0 0 16px; color: #00d4ff; font-size: 18px;">${title}</h2>
                <p style="margin: 0 0 20px; color: #a8b3c5; font-size: 15px; line-height: 1.6;">
                  An important user activity event was recorded on the HUB LEARNING Platform.
                </p>

                <!-- Activity Details Box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #132238; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px;">
                  <tr><td style="padding: 10px 12px; color: #a8b3c5; font-weight: 600; width: 140px;">Activity Type:</td><td style="padding: 10px 12px; color: #22c55e; font-weight: bold;">${activityType}</td></tr>
                  <tr><td style="padding: 6px 12px; color: #a8b3c5; font-weight: 600;">User Name:</td><td style="padding: 6px 12px; color: #ffffff;">${userName || 'Anonymous'}</td></tr>
                  <tr><td style="padding: 6px 12px; color: #a8b3c5; font-weight: 600;">User Email:</td><td style="padding: 6px 12px; color: #ffffff;"><a href="mailto:${userEmail}" style="color: #6c63ff; text-decoration: none;">${userEmail || 'N/A'}</a></td></tr>
                  <tr><td style="padding: 6px 12px; color: #a8b3c5; font-weight: 600;">Date:</td><td style="padding: 6px 12px; color: #ffffff;">${dateStr}</td></tr>
                  <tr><td style="padding: 6px 12px; color: #a8b3c5; font-weight: 600;">Time:</td><td style="padding: 6px 12px; color: #ffffff;">${timeStr}</td></tr>
                  ${detailsRows}
                </table>

                <div style="text-align: center; margin-top: 25px;">
                  <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/dashboard" style="display: inline-block; background: linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; font-size: 14px;">Open Admin Dashboard →</a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #07111f; padding: 16px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #6b7a90;">
                Sent automatically by HUB LEARNING Platform Security & Tracking Dispatcher.<br/>
                Confidential to Platform Administrator: ${ADMIN_EMAIL}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

/**
 * Send alert email to Admin
 */
const sendAdminNotification = async ({ title, userName, userEmail, activityType, details }) => {
  const timestamp = new Date();
  const html = buildNotificationHtml({ title, userName, userEmail, activityType, timestamp, details });

  console.log(`\n🔔 [Admin Notification Event]: ${title}`);
  console.log(`   To: ${ADMIN_EMAIL}`);
  console.log(`   Activity: ${activityType} | User: ${userName} (${userEmail})`);
  console.log(`   Time: ${timestamp.toISOString()}`);
  if (details) console.log(`   Details:`, JSON.stringify(details));

  const transporter = createTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"HUB LEARNING Platform" <${process.env.SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: `[HUB LEARNING ALERT] ${title} - ${userName || userEmail}`,
        html,
      });
      console.log(`   ✅ Email sent successfully via SMTP! MessageID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`   ❌ Failed to dispatch SMTP email:`, err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`   ℹ️ [Notice]: SMTP credentials not set in .env. Notification logged cleanly to console.`);
    return { success: true, simulated: true };
  }
};

/**
 * Send formatted weekly admin report
 */
const sendWeeklyReport = async (stats) => {
  const timestamp = new Date();
  const dateStr = timestamp.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"><title>HUB LEARNING Weekly Platform Report</title></head>
  <body style="margin: 0; padding: 0; background-color: #07111f; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #07111f; padding: 30px 10px;">
      <tr>
        <td align="center">
          <table width="650" cellpadding="0" cellspacing="0" style="max-width: 650px; width: 100%; background-color: #0d1b2a; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; overflow: hidden;">
            <tr>
              <td style="background: linear-gradient(135deg, #6c63ff 0%, #3b82f6 100%); padding: 26px 30px;">
                <h1 style="margin: 0; font-size: 22px; color: #ffffff;">📊 HUB LEARNING • WEEKLY PLATFORM REPORT</h1>
                <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Summary for the week ending ${dateStr}</p>
              </td>
            </tr>

            <tr>
              <td style="padding: 30px;">
                <h2 style="margin: 0 0 14px; color: #00d4ff; font-size: 18px;">Executive Summary</h2>
                <p style="margin: 0 0 20px; color: #a8b3c5; font-size: 14px;">Here is the real activity and user engagement summary for your platform over the past 7 days:</p>

                <!-- Statistics Grid -->
                <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 25px;">
                  <tr>
                    <td width="50%" style="background-color: #132238; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); padding: 15px;">
                      <div style="color: #a8b3c5; font-size: 12px; text-transform: uppercase;">Total Registered Users</div>
                      <div style="color: #ffffff; font-size: 24px; font-weight: bold; margin-top: 4px;">${stats.totalUsers || 0}</div>
                    </td>
                    <td width="50%" style="background-color: #132238; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); padding: 15px;">
                      <div style="color: #a8b3c5; font-size: 12px; text-transform: uppercase;">New Users This Week</div>
                      <div style="color: #22c55e; font-size: 24px; font-weight: bold; margin-top: 4px;">+${stats.newUsersThisWeek || 0}</div>
                    </td>
                  </tr>
                  <tr><td colspan="2" height="10"></td></tr>
                  <tr>
                    <td width="50%" style="background-color: #132238; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); padding: 15px;">
                      <div style="color: #a8b3c5; font-size: 12px; text-transform: uppercase;">Active Users (Past 7 Days)</div>
                      <div style="color: #38bdf8; font-size: 24px; font-weight: bold; margin-top: 4px;">${stats.activeUsers || 0}</div>
                    </td>
                    <td width="50%" style="background-color: #132238; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); padding: 15px;">
                      <div style="color: #a8b3c5; font-size: 12px; text-transform: uppercase;">Total Platform Logins</div>
                      <div style="color: #f59e0b; font-size: 24px; font-weight: bold; margin-top: 4px;">${stats.totalLogins || 0}</div>
                    </td>
                  </tr>
                </table>

                <h3 style="margin: 20px 0 10px; color: #ffffff; font-size: 16px;">Curriculum & Hub Activity</h3>
                <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #132238; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px;">
                  <tr><td style="color: #a8b3c5; border-bottom: 1px solid rgba(255,255,255,0.06);">Technical Hub Activity</td><td align="right" style="color: #ffffff; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">${stats.technicalHubActivity || 0}</td></tr>
                  <tr><td style="color: #a8b3c5; border-bottom: 1px solid rgba(255,255,255,0.06);">Coding & DSA Activity</td><td align="right" style="color: #ffffff; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">${stats.codingActivity || 0}</td></tr>
                  <tr><td style="color: #a8b3c5; border-bottom: 1px solid rgba(255,255,255,0.06);">Developer Tools Usage</td><td align="right" style="color: #ffffff; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">${stats.developerToolsActivity || 0}</td></tr>
                  <tr><td style="color: #a8b3c5; border-bottom: 1px solid rgba(255,255,255,0.06);">Project Hub Views</td><td align="right" style="color: #ffffff; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">${stats.projectViews || 0}</td></tr>
                  <tr><td style="color: #a8b3c5;">Career Hub & Roadmap Usage</td><td align="right" style="color: #ffffff; font-weight: bold;">${stats.careerHubActivity || 0}</td></tr>
                </table>

                <div style="text-align: center; margin-top: 25px;">
                  <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/dashboard" style="display: inline-block; background: linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; font-size: 14px;">Open Full Admin Analytics →</a>
                </div>
              </td>
            </tr>

            <tr>
              <td style="background-color: #07111f; padding: 16px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #6b7a90;">
                Generated for Administrator ${ADMIN_EMAIL} • HUB LEARNING Platform
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  console.log(`\n📬 [Weekly Admin Report Generated]:`);
  console.log(`   To: ${ADMIN_EMAIL}`);
  console.log(`   Summary: Total Users: ${stats.totalUsers}, New: ${stats.newUsersThisWeek}, Active: ${stats.activeUsers}, Logins: ${stats.totalLogins}`);

  const transporter = createTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"HUB LEARNING Platform" <${process.env.SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: `[HUB LEARNING] Weekly Platform Report - ${dateStr}`,
        html,
      });
      console.log(`   ✅ Weekly Report sent successfully via SMTP! MessageID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`   ❌ Failed to send Weekly Report:`, err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`   ℹ️ [Notice]: SMTP not configured. Weekly report logged to console.`);
    return { success: true, simulated: true };
  }
};

module.exports = {
  ADMIN_EMAIL,
  sendAdminNotification,
  sendWeeklyReport,
};
