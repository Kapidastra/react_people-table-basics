import React from 'react';
import { Person } from '../../types';

interface Props {
  person?: Person;
  name: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!name) {
    return <>-</>;
  }

  if (person) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.location.hash = `#/people/${person.slug}`;
    };

    return (
      <a
        href={`#/people/${person.slug}`}
        onClick={handleClick}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </a>
    );
  }

  return <>{name}</>;
};
