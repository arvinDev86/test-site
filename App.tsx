import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import AdminHubPage from './AdminPage'; // AdminPage.tsx is now the Hub
import AutoTranslatePage from './AutoTranslatePage';
import EditorPage from './EditorPage';
import AutoTranslateAdminPage from './AutoTranslateAdminPage';
import EditorAdminPage from './EditorAdminPage';


// A simple router component to switch between pages.
const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    // This handles browser back/forward navigation.
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    // This handles link clicks to navigate without page reloads
    const handleLinkClick = (e: MouseEvent) => {
        let target = e.target as HTMLElement;
        // Find the closest anchor tag
        while (target && target.tagName !== 'A') {
            target = target.parentElement as HTMLElement;
        }

        if (target && target.tagName === 'A' && (target as HTMLAnchorElement).href && (target as HTMLAnchorElement).origin === window.location.origin) {
            e.preventDefault();
            const newRoute = new URL((target as HTMLAnchorElement).href).pathname;
            if (newRoute !== route) {
                window.history.pushState({}, '', newRoute);
                setRoute(newRoute);
            }
        }
    };

    window.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('click', handleLinkClick);
    };
  }, [route]);

  // Dynamically set the favicon from localStorage
  useEffect(() => {
    const faviconUrl = localStorage.getItem('site_favicon');
    if (faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, []);

  // Render the component based on the current route.
  switch (route) {
    case '/admin':
      return <AdminHubPage />;
    case '/admin/autotranslate':
        return <AutoTranslateAdminPage />;
    case '/admin/editor':
        return <EditorAdminPage />;
    case '/autotranslate':
      return <AutoTranslatePage />;
    case '/editor':
      return <EditorPage />;
    default:
      return <HomePage />;
  }
};

export default App;