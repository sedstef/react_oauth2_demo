import logo from './logo.svg';
import './App.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {useEffect, useState} from "react";
import axios from 'axios';

function App() {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const [greeting, setGreeting] = useState();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));

                fetchToken(user);

                async function fetchToken(user){
                    console.log('fetch oauth2.googleapis.com/tokeninfo');
                    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${user.access_token}`)
                    console.log(response.json());

                }

            }
        },
        [user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    function fetchGreeting() {
        console.log(user);

        //const API_BASEURL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
        const API_BASEURL = 'http://localhost:8080'
        fetch(`${API_BASEURL}/api/v1/hello`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                setGreeting(data.greeting);
            })
            .catch((error) => console.log('ERROR in get greeting: ' + error));
    }


    return (
        <div className="App">
            <header className="App-header">
                {profile ? (
                    <div>
                        <img src={profile.picture} alt="user image" />
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br />
                        <br />
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )}

                <button onClick={fetchGreeting}>Greeting</button>

                <h1>{greeting}</h1>

                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
