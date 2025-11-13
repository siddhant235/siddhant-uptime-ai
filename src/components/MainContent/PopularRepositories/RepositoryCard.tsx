import React from 'react';
import { Repository } from '../../../types/repository.types';
import './RepositoryCard.css';

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <div className="repository-card">
      <div className="repo-header">
        <a href={repository.url} className="repo-name">
          <svg className="repo-icon" viewBox="0 0 16 16" width="16" height="16">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
          </svg>
          {repository.name}
        </a>
        <span className="visibility-badge">{repository.visibility}</span>
      </div>

      {repository.forkedFrom && (
        <div className="forked-from">
          Forked from{' '}
          <a href={repository.forkedFrom.url}>
            {repository.forkedFrom.owner}/{repository.forkedFrom.repo}
          </a>
        </div>
      )}

      <p className="repo-description">{repository.description}</p>

      <div className="repo-footer">
        <div className="repo-meta">
          <span className="language">
            <span 
              className="language-color" 
              style={{ backgroundColor: repository.language.color }}
            ></span>
            {repository.language.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;

