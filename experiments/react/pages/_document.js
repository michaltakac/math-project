import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
          <meta name="author" content="Michal Takáč" />

          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"
          />

          <link
            rel="stylesheet"
            href="http://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
          />
          <link rel="stylesheet" href="/static/lib/mathbox-0.0.5.css" />

          <script src="/static/lib/mathbox-bundle-0.0.5.js" />
          <script src="/static/lib/math.min.js" />
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
