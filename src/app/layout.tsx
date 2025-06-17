"use client";

import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import GAnalytics from "@/components/Analytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta
          name="keywords"
          content="Real estate, Property sale, Property buy"
        />
        <meta
          name="description"
          content="Homy is a beautiful website template designed for Real Estate Agency."
        />
        <meta property="og:site_name" content="Homy" />
        <meta property="og:url" content="https://creativegigstf.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Homy - Real Estate React Next js Template"
        />
        <meta name="og:image" content="images/assets/ogg.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0D1A1C" />
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
        <link rel="tn" href="/favicon.png" sizes="any" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap"
        />
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-RQVKH27CH6`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RQVKH27CH6', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="main-page-wrapper">
          <Provider store={store}>
            {children}
            <Analytics />
            <GAnalytics />
          </Provider>
        </div>
      </body>
    </html>
  );
}
