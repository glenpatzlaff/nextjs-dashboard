// pages/voting-info.js
import React from 'react';

export async function getServerSideProps(context) {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY; // Access from environment variables

  // Replace with desired address or parameters for the API call
  const url = `https://www.googleapis.com/civicinfo/v2/voterInfo?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  // Handle errors or empty data response

  return {
    props: {
      votingInfo: data,
    },
  };
}

const VotingInfo = ({ votingInfo }) => {
  // Access and display fetched data here
  return (
    <div>
      <h1>Your Voting Information</h1>
      {/* Display relevant details from votingInfo object */}
    </div>
  );
};

export default VotingInfo;
