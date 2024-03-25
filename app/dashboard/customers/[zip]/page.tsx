async function getData(zip: String) {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY; // Access from environment variables
  const zipCode = zip;

  const res = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?Levels=country&key=${apiKey}&address=${zipCode}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Page({ params }) {
  const { zip } = params;
  const data = await getData(zip)
  // const jsonString = JSON.stringify(data);
  return (
    <div>
      <h1>Officials Information</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Party</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Links</th>
            <th>Social Media</th>
          </tr>
        </thead>
        <tbody>
          {data.officials.map((official, index) => (
            <tr key={index}>
              <td>{official.name}</td>
              <td>{data.offices.find(office => office.officialIndices.includes(index))?.name}</td>
              <td>{official.party}</td>
              <td>{official.address?.map(addr => `${addr.line1}, ${addr.city}, ${addr.state} ${addr.zip}`).join(' ')}</td>
              <td>{official.phones?.join(', ')}</td>
              <td>{official.urls?.map(url => <a href={url} target="_blank" rel="noopener noreferrer">Link</a>).reduce((prev, curr) => [prev, ', ', curr])}</td>
              <td>{official.channels?.map(channel => `${channel.type}: ${channel.id}`).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// export default MyPage;
  