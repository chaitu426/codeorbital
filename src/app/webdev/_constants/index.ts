export const LANGUAGE_CONFIG = {
    html: {
      monacoLanguage: "html",
      defaultCode: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>",
    },
    css: {
      monacoLanguage: "css",
      defaultCode: "body {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n  margin: 0;\n  padding: 0;\n}",
    },
    js: {
      monacoLanguage: "javascript",
      defaultCode: "console.log('Hello, World!');",
    },
  };
  
  export const defineMonacoThemes = (monaco: any) => {
    monaco.editor.defineTheme("vs-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [{ background: "1e1e1e" }],
      colors: {
        "editor.background": "#1e1e1e",
      },
    });
  };
  