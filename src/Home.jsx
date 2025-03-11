// Home.jsx
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {baseUrl} from "./config"; // Import axios for making requests
// ... other imports

function Home() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl); // Replace with your backend endpoint
                setData(response.data);
            } catch (err) {
                setError(err.message); // Or err.response.data for more detailed backend error
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>; // Or a nicer loading indicator
    }

    // Render your data
    return (
        <div>
            {/* Example: Display data in a list */}
            <ul>
                {Array.isArray(data) ? (
                    data.map(item => <li key={item.id}>{item.name}</li>) // Adjust based on your data structure
                ) : (
                    <pre>{JSON.stringify(data, null, 2)}</pre> // For non-array data display as JSON
                )}
            </ul>
        </div>
    );
}


// ... rest of the App component

export default Home;
