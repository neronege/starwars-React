import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import { gql } from '@apollo/client';

const GET_ALL_DATA = gql`
  query AllPeople {
    allPeople {
      people {
        name
        birthYear
        eyeColor
        gender
      }
    }
  }
`;

// Mock data for GET_ALL_DATA query
const mocks = [
  {
    request: {
      query: GET_ALL_DATA,
    },
    result: {
      data: {
        allPeople: {
          people: [
            { name: 'Luke Skywalker', birthYear: '19BBY', eyeColor: 'blue', gender: 'male' },
            { name: 'Darth Vader', birthYear: '41.9BBY', eyeColor: 'yellow', gender: 'male' },
          ],
        },
      },
    },
  },
];

test('renders people data', async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
  });

  await waitFor(() => {
    // Check if the names of the people are rendered
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
