export const metadata = {
  title: 'OpecChats || Auth',
  description: 'Identify yourself',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
