import React from 'react';
import { Repository } from '../../../types/repository.types';
import RepositoryCard from './RepositoryCard';
import './PopularRepositories.css';

interface PopularRepositoriesProps {
  repositories: Repository[];
}

const PopularRepositories: React.FC<PopularRepositoriesProps> = ({ repositories }) => {
  return (
    <section className="popular-repositories">
      <div className="section-header">
        <h2 className="section-title">Popular repositories</h2>
        <a href="#" className="customize-link">Customize your pins</a>
      </div>
      <div className="repositories-grid">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>
    </section>
  );
};

export default PopularRepositories;

