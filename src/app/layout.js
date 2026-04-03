export const metadata = {
  title: 'Τι τύπο γήρανσης έχετε και ποια εξέταση ταιριάζει σε εσάς; | Dr. Μαρία Θανάσουλα',
  description: 'Ανακαλύψτε τον τύπο γήρανσής σας με βάση τα 12 Hallmarks of Aging. Δωρεάν τεστ 2 λεπτών από τη Dr. Μαρία Θανάσουλα.',
  openGraph: {
    title: 'Τι τύπο γήρανσης έχετε και ποια εξέταση ταιριάζει σε εσάς;',
    description: 'Δωρεάν τεστ αντιγήρανσης 2 λεπτών - Μάθετε ποια εξέταση ταιριάζει σε εσάς',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
