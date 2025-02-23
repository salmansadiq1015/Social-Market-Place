"use client";
import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={MainLayout.defaultProps.description}
        />
        <meta name="keywords" content={MainLayout.defaultProps.keywords} />
        <meta name="author" content={MainLayout.defaultProps.author} />
        <meta property="og:title" content={MainLayout.defaultProps.ogTitle} />
        <meta
          property="og:description"
          content={MainLayout.defaultProps.ogDescription}
        />
        <meta property="og:image" content={MainLayout.defaultProps.ogImage} />
        <meta property="og:url" content={MainLayout.defaultProps.ogUrl} />
        <meta
          name="twitter:card"
          content={MainLayout.defaultProps.twitterCard}
        />
        <meta
          name="twitter:title"
          content={MainLayout.defaultProps.twitterTitle}
        />
        <meta
          name="twitter:description"
          content={MainLayout.defaultProps.twitterDescription}
        />
        <meta
          name="twitter:image"
          content={MainLayout.defaultProps.twitterImage}
        />
        <title>{MainLayout.defaultProps.title}</title>
      </Helmet>
      <Header />
      <main className="flex-grow overflow-hidden dark:bg-gray-950 dark:text-white text-black">
        {children}
      </main>
    </div>
  );
}

MainLayout.defaultProps = {
  title: "Social Market – Buy & Sell Social Media Accounts, Pages & Channels",
  description:
    "Social Market is the #1 trusted platform to buy and sell verified social media accounts, pages, and channels across Facebook, Instagram, YouTube, TikTok, Twitter, and more. Secure transactions, real-time analytics, and AI-driven price evaluations for seamless trading.",
  keywords:
    "buy social media accounts, sell social media pages, Instagram accounts for sale, buy YouTube channels, TikTok account marketplace, Facebook page selling, Twitter handles for sale, Snapchat accounts trading, social media flipping, influencer account marketplace, digital assets marketplace, verified social account sales",
  author: "M Salman",
  ogTitle: "Social Market – The Leading Social Media Trading Platform",
  ogDescription:
    "Join the largest marketplace for trading social media accounts and pages. Verified buyers & sellers, secure transactions, and AI-powered account valuation.",
  ogImage: "/assets/social-market-preview.jpg",
  ogUrl: "https://yourwebsite.com",
  twitterCard: "summary_large_image",
  twitterTitle:
    "Social Market – Securely Buy & Sell Social Media Pages & Accounts",
  twitterDescription:
    "Buy and sell social media accounts & pages with AI-driven price estimates and secure payments. The #1 marketplace for digital assets trading.",
  twitterImage: "/assets/social-market-preview.jpg",
};
