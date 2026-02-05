import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI音乐生成器 - 基于ACE-Step",
  description: "使用AI技术根据描述生成音乐，支持多种风格和歌词",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        {children}
      </body>
    </html>
  );
}
