import React from 'react';
import './Header.css';

interface HeaderProps {
  username?: string;
  avatar?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  username = 'shreeramk', 
  avatar = 'https://avatars.githubusercontent.com/u/19864447?v=4',
  activeTab, 
  onTabChange 
}) => {
  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    e.preventDefault();
    onTabChange(tab);
  };

  return (
    <header className="github-header">
      {/* Main header bar */}
      <div className="header-main">
        <div className="header-container">
          {/* Left Section: Hamburger + Logo + Username */}
          <div className="header-left">
            <button className="menu-btn" aria-label="Toggle navigation">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
              </svg>
            </button>
            
            <a href="/" className="github-logo" aria-label="GitHub">
              <svg height="32" viewBox="0 0 16 16" width="32">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </a>

            <span className="username-text">{username}</span>
          </div>

          {/* Right Section: Search + Icons */}
          <div className="header-right">
            <div className="search-bar">
              <svg className="search-icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.5 4.5 0 1 0-8.997.002A4.5 4.5 0 0 0 11.5 7Z"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Type / to search" 
                className="search-input"
              />
              <span className="search-shortcut">/</span>
            </div>

            {/* Copilot Icon */}
            <button className="icon-btn" aria-label="GitHub Copilot" title="GitHub Copilot">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <path d="M7.99 0C3.56 0 0 3.612 0 8.061c0 3.359 2.108 6.212 5.033 7.231.078.024.136.003.175-.041a.187.187 0 0 0 .058-.135c0-.068-.003-.607-.003-1.166-2.056.353-2.548-.495-2.709-.949-.091-.233-.486-.95-.832-1.142-.284-.154-.69-.533-.01-.543.639-.01 1.096.59 1.248.836.73 1.232 1.896.884 2.362.671.072-.53.283-.885.515-1.088-1.805-.206-3.69-.905-3.69-4.016 0-.884.314-1.614.832-2.184-.083-.206-.362-1.042.078-2.168 0 0 .678-.216 2.227.833a7.55 7.55 0 0 1 2.029-.275c.688 0 1.38.093 2.029.275 1.548-1.059 2.227-.833 2.227-.833.44 1.126.162 1.962.079 2.168.518.57.832 1.29.832 2.184 0 3.121-1.895 3.81-3.7 4.016.294.255.548.745.548 1.506 0 1.089-.01 1.963-.01 2.232 0 .052.02.105.058.136.04.044.097.064.175.04C13.892 14.273 16 11.411 16 8.061 16 3.612 12.44 0 7.99 0Z"></path>
              </svg>
            </button>

            {/* Pull Request Icon */}
            <button className="icon-btn" aria-label="Pull requests" title="Pull requests">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
              </svg>
            </button>

            {/* Inbox Icon with notification dot */}
            <button className="icon-btn inbox-btn" aria-label="Inbox" title="Inbox">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <path d="M2.8 2.06A1.75 1.75 0 0 1 4.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-4.5c0-.101.02-.202.06-.295Zm1.61.44a.25.25 0 0 0-.23.152L1.887 8H4.75a.75.75 0 0 1 .6.3L6.625 10h2.75l1.275-1.7a.75.75 0 0 1 .6-.3h2.863L11.82 2.652a.25.25 0 0 0-.23-.152Zm10.09 7h-2.875l-1.275 1.7a.75.75 0 0 1-.6.3h-3.5a.75.75 0 0 1-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Z"></path>
              </svg>
              <span className="notification-dot"></span>
            </button>

            {/* Profile Picture */}
            <button className="user-menu" aria-label="User menu">
              <img 
                src={avatar}
                alt="User avatar" 
                className="user-avatar"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="profile-nav-container">
        <div className="profile-nav">
          <a 
            href="#" 
            className={`profile-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={(e) => handleTabClick(e, 'overview')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"></path>
            </svg>
            Overview
          </a>
          <a 
            href="#" 
            className={`profile-nav-link ${activeTab === 'repositories' ? 'active' : ''}`}
            onClick={(e) => handleTabClick(e, 'repositories')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            Repositories
            <span className="nav-badge">31</span>
          </a>
          <a 
            href="#" 
            className={`profile-nav-link ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={(e) => handleTabClick(e, 'projects')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-8.25.75a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0ZM8 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 3Z"></path>
            </svg>
            Projects
          </a>
          <a 
            href="#" 
            className={`profile-nav-link ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={(e) => handleTabClick(e, 'packages')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z"></path>
            </svg>
            Packages
            <span className="nav-badge">5</span>
          </a>
          <a 
            href="#" 
            className={`profile-nav-link ${activeTab === 'stars' ? 'active' : ''}`}
            onClick={(e) => handleTabClick(e, 'stars')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
            </svg>
            Stars
            <span className="nav-badge">6</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

