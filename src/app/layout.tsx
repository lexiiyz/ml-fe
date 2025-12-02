import './globals.css';

export const metadata = {
  title: 'Fregie | Deteksi Buah & Sayur Cerdas',
  description: 'Aplikasi berbasis AI untuk mengidentifikasi jenis dan tingkat kematangan buah dan sayur.',

  icons: {
    icon: '/logo.ico', 
    shortcut: '/logo.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}