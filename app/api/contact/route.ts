import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
	name?: string;
	email?: string;
	phone?: string;
	details?: string;
};

const getRequiredEnv = (name: string) => {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
};

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");

export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ContactPayload;
		const name = body.name?.trim() ?? "";
		const email = body.email?.trim() ?? "";
		const phone = body.phone?.trim() ?? "";
		const details = body.details?.trim() ?? "";

		if (!name || !email) {
			return NextResponse.json(
				{ message: "Укажите имя и email." },
				{ status: 400 },
			);
		}

		const smtpUser = getRequiredEnv("SMTP_USER");

		const transporter = nodemailer.createTransport({
			host: getRequiredEnv("SMTP_HOST"),
			port: Number(process.env.SMTP_PORT ?? "465"),
			secure: process.env.SMTP_SECURE !== "false",
			auth: {
				user: smtpUser,
				pass: getRequiredEnv("SMTP_PASSWORD"),
			},
		});

		const recipient = process.env.CONTACT_FORM_TO ?? smtpUser;
		const fromAddress = process.env.CONTACT_FORM_FROM ?? smtpUser;
		const subject = `Новая заявка с сайта от ${name}`;

		await transporter.sendMail({
			from: fromAddress,
			to: recipient,
			replyTo: email,
			subject,
			text: [
				"Новая заявка с сайта",
				`Имя: ${name}`,
				`Email: ${email}`,
				`Телефон: ${phone || "Не указан"}`,
				`Комментарий: ${details || "Не указан"}`,
			].join("\n"),
			html: `
				<h2>Новая заявка с сайта</h2>
				<p><strong>Имя:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Телефон:</strong> ${escapeHtml(phone || "Не указан")}</p>
				<p><strong>Комментарий:</strong><br />${escapeHtml(details || "Не указан").replaceAll("\n", "<br />")}</p>
			`,
		});

		return NextResponse.json({ message: "Заявка отправлена." });
	} catch (error) {
		console.error("Contact form submission failed", error);

		return NextResponse.json(
			{ message: "Не удалось отправить заявку. Проверьте настройки почты." },
			{ status: 500 },
		);
	}
}
