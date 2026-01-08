import { Toaster } from 'sonner';
import './globals.css';

export const metadata = {
  title: 'Task Manager',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
     <Toaster position="top-right" richColors />
    </html>
  );
}
