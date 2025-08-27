import React, { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink/PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    null,
  );

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const slug = window.location.hash.replace('#/people/', '');

      setSelectedPersonSlug(slug || null);
    };

    handleHashChange(); // одразу після завантаження
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div data-cy="app">
      <div className="block">
        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={
                      person.slug === selectedPersonSlug
                        ? 'has-background-warning'
                        : ''
                    }
                  >
                    <td>
                      <PersonLink person={person} name={person.name} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonLink
                        person={person.mother}
                        name={person.motherName}
                      />
                    </td>
                    <td>
                      <PersonLink
                        person={person.father}
                        name={person.fatherName}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
