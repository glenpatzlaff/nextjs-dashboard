async function getData(zip: String) {
    const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
    const zipCode = zip;
    const res = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?Levels=country&key=${apiKey}&address=${zipCode}`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
  }
  
  type PageParams = {
    params: {
      zip: string;
    };
  };
  
  export default async function Page({ params }: PageParams) {
    const { zip } = params;
    const data = await getData(zip);
  
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
                <td>
                  {official.address && (
                    <ul>
                      {official.address.map((addr, addrIndex) => (
                        <li key={addrIndex}>
                          {`${addr.line1}, ${addr.city}, ${addr.state} ${addr.zip}`}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>{official.phones?.join(', ')}</td>
                <td>
                  {official.urls && (
                    <ul>
                      {official.urls.map((url, urlIndex) => (
                        <li key={urlIndex}>
                          <a href={url} target="_blank" rel="noopener noreferrer">Link</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>
                  {official.channels && (
                    <ul>
                      {official.channels.map((channel, channelIndex) => (
                        <li key={channelIndex}>
                          {`${channel.type}: ${channel.id}`}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }