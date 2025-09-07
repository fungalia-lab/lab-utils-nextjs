declare global {
  interface Window {
    SwaggerUIBundle: {
      (config: {
        url: string;
        dom_id: string;
        deepLinking: boolean;
        presets: any[];
        plugins: any[];
        layout: string;
        docExpansion: string;
        defaultModelsExpandDepth: number;
        defaultModelExpandDepth: number;
        displayRequestDuration: boolean;
        tryItOutEnabled: boolean;
        supportedSubmitMethods: string[];
        onComplete?: () => void;
      }): void;
      presets: {
        apis: any;
        standalone: any;
      };
      plugins: {
        DownloadUrl: any;
      };
    };
  }
}

export {};
