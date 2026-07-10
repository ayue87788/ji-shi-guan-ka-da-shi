import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '即使闯关大师 - 汉语让步复句学习游戏',
  description:
    '通过趣味闯关游戏，帮助中高级汉语学习者（HSK4级以上）彻底掌握"即使......也......"让步复句的用法。',
  keywords: ['汉语学习', 'HSK', '即使也', '让步复句', '中文语法', '闯关游戏'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
