import "../styles/main.scss";
import Head from "next/head";
import Header from "@/blocks/header";
import Footer from "@/blocks/footer";
import Drawer from "@/blocks/drawer";
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import EdgeDamping from "@/helpers/edgeDamping";
import { useRouter } from "next/router";

import { ChakraProvider } from "@chakra-ui/react";

//& Default App Entry Point
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  //$ Run on Page Load
  useEffect(() => {
    const view = document.querySelector(".home"); //` Declare View Reference to be Jellyfied
    const settings = {
      damping: 0.075,
      renderByPixels: true,
    }; //` Options
    Scrollbar.use(EdgeDamping); //` EDGE DAMPING VENDOR PLUGIN
    view && Scrollbar.init(view, settings);
  }, [router]);

  return (
    <>
      {/* //& Head & Meta Tags */}
      <Head>
        {/* //$ Website Title and Description */}
        <title>Bus Karo - Online Bus Services</title>
        {/* //$ Functional and SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=3,user-scalable=yes" />
        <meta name="msapplication-TileColor" content="#000" />
        <meta name="theme-color" content="#000" />
        <meta name="keywords" content="put,keywords,here,30,word,limit" />
        <meta
          name="description"
          content="put description here, this much word limit dont exceed by even one word, this much word limit dont exceed by even one word, , this much word limit dont exceed by ..."
        />
        {/* //$ Open Graph (Social Media Share) Meta Tags */}
        <meta property="og:title" content="Bus Karo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icons/logo/logo-512x512.png" />
        <meta
          property="og:description"
          content="put description here, this much word limit dont exceed by even one word, this much word limit dont exceed by even one word, , this much word limit dont exceed by ..."
        />
        <meta property="og:url" content="www.<domainhere>.com" />
        <meta property="og:site_name" content="Bus Karo" />
        {/* //$ Included Links (Favicon, Manifest, Fonts, Apple Touch) */}
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/logo/logo-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/logo/logo-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icons/logo/logo-72x72.png" sizes="72x72"></link>
        <link rel="apple-touch-icon" href="/icons/logo/logo-114x114.png" sizes="114x114"></link>
        <link rel="preload" href="/static/fonts/Gilroy-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/static/fonts/Gilroy-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/static/fonts/Gilroy-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="" />
      </Head>

      {/* //& Site Code */}
      <ChakraProvider>
        {/* //$ Dashboard */}
        <Drawer />
        {/* //$ Header */}
        <Header />
        {/* //$ Footer */}
        <Footer />
        {/* //$ App Entry Point */}
        <div id="view-main">
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </>
  );
}
