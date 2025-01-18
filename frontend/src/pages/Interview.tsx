import { useState } from 'react';
import axios from 'axios';

const Interview = () => {
    const [command, setCommand] = useState('');
    const [data, setData] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            console.log("Command:", command);
            const response = await axios.put('http://localhost:3001/interview', { command });
            console.log('Response:', response.data);
            setData(response.data.message);
        } catch (error) {
            console.error('Error:', error);
        }
        setCommand('');
    };

    return (
        <div>
            <h1>Interview</h1>
            <input 
                type="text" 
                value={command} 
                onChange={handleInputChange} 
                placeholder="Enter command" 
            />
            <button onClick={handleSubmit}>Send Command</button>
            <p>{data}</p>
        </div>
    );
}

export default Interview;