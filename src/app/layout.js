import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { JobsProvider } from "../context/JobsContext";
import { SavedJobsProvider } from "../context/SavedJobsContext";
import { ApplicationsProvider } from "../context/ApplicationsContext";
import { CVProvider } from "../context/CVContext";
import { CompaniesProvider } from "../context/CompaniesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OpportunityRadar - Job Portal",
  description: "Find your next opportunity",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="icon" 
          href="/logo.png" 
          type="image/png"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CVProvider>
            <JobsProvider>
              <SavedJobsProvider>
                <ApplicationsProvider>
                  <CompaniesProvider>
                    {children}
                  </CompaniesProvider>
                </ApplicationsProvider>
              </SavedJobsProvider>
            </JobsProvider>
          </CVProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
