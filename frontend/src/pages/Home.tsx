import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const Home = () => {
    const [data, setData] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<string> = await axios.get('http://localhost:3001/');
                console.log(response.data);
                setData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);
    
    return (
        <div>
        <h1>Home</h1>
        <p>{data}</p>
        </div>
    )
}

export default Home;