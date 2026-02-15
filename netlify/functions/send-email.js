const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { name, email, subject, message } = JSON.parse(event.body);

        // Validate input
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        // Create transporter using environment variables
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this to your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // Use app password for Gmail
            }
        });

        // Email 1: Notification to you
        const notificationEmail = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Message</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin-bottom: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">From</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;"><strong>${name}</strong></p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin-bottom: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Email</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin-bottom: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Subject</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">${subject}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin-bottom: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
                <p style="color: #334155; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">Sent from your portfolio website</p>
            </div>
          </div>
        </div>
      `
        };

        // Email 2: Auto-reply confirmation to the visitor
        const autoReplyEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thanks for reaching out! 🚀",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 40px; border-radius: 16px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 20px;">✉️</div>
            <h1 style="color: white; margin: 0 0 10px 0; font-size: 32px; font-weight: 800;">Message Received!</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 18px;">Thanks for getting in touch, ${name}</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 16px; margin-top: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
            <p style="color: #334155; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="color: #334155; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
              Thank you for reaching out! I've received your message about <strong>"${subject}"</strong> and I'll get back to you as soon as possible.
            </p>

            <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 24px; border-radius: 12px; border-left: 4px solid #06b6d4; margin: 30px 0;">
              <p style="color: #64748b; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Message:</p>
              <p style="color: #1e293b; margin: 0; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</p>
            </div>

            <p style="color: #334155; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
              I typically respond within 24-48 hours. In the meantime, feel free to check out my portfolio or connect with me on social media.
            </p>

            <p style="color: #334155; font-size: 16px; line-height: 1.8; margin: 0;">
              Best regards,<br>
              <strong style="color: #06b6d4; font-size: 18px;">Parveen Garg</strong>
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
              This is an automated confirmation email
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Sent from Portfolio | <a href="mailto:${process.env.EMAIL_USER}" style="color: #06b6d4; text-decoration: none;">${process.env.EMAIL_USER}</a>
            </p>
          </div>
        </div>
      `
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(notificationEmail),
            transporter.sendMail(autoReplyEmail)
        ]);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Email sent successfully'
            })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send email',
                details: error.message
            })
        };
    }
};
