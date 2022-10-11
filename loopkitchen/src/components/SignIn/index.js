// import { useNavigate } from 'react-router-dom';
// import { config } from  '../../App';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './styles.css';

const schema = yup.object().shape({
    username: yup.string().required('Username is requried').min(4, 'username must be at least 4 characters'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login = ({ setLoggedIn }) => {

    const navigate = useNavigate();
    const [records, setRecords] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    // const loginUser = async (data) => {

    //     try {
    //         const response = await axios.post(`${config.baseUrl}/login`, data);
    //         console.log(response);
    //         localStorage.setItem('token', response.data.token);
    //         setLoggedIn(true);
    //         toast.success('Login successful');
    //         navigate('/');
    //     }
    //     catch (error) {
    //         toast.error('Login failed');
    //         console.log(error);
    //     }
    // }

    
    const submitForm = (data) => {
        console.log(data);

        const storedCred = records.filter(record => record.fields.username === data.username && record.fields.password === data.password);

        // loginUser(data);
        if(storedCred.length > 0) {
            toast.success('User logged in successfully');
            setLoggedIn(data.username);
            localStorage.setItem('loggedIn', data.username);
            navigate('/');
            // window.location.reload();
        }
        else {
            toast.error('credenitals didnt match');
        }

    }

    const fetchData = async () => {
        try {
            const res = await axios(`https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view`, {
                headers: {
                    Authorization: 'Bearer keyfXgn8PL6pB3x32'
                }
            })
            setRecords(res.data.records);
            console.log(res.data.records);
        } catch (err) {
            toast.error('Could fetch stored login credentials!!');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         setLoggedIn(true);
    //         toast.info('You are already logged in');
    //         navigate('/');
    //     }
    // }, [setLoggedIn, navigate]);
    

    return (
        <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <label>Username:</label>
                <input 
                    placeholder="Enter username"
                    {...register('username')}
                />
                {errors.username && <div className="error">{errors.username.message}</div>}
                <label>Password:</label>
                <input 
                    type="password" 
                    placeholder="Enter password"
                    {...register('password')}
                />
                {errors.password && <div className="error">{errors.password.message}</div>}
                <button>Login</button>
                {/* <Link to='/register'> */}
                    <div className='navigate'>Don't have an account ? Register</div>
                {/* </Link> */}
            </form>
        </div>      
    );
}

export default Login;