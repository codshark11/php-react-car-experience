import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/auth';
import {register} from '../../api/auth';
import useInputValue from '../../components/input-value';
import GuestNav from '../../components/guest-nav';

function Join () {
  let history = useHistory();
  let { setCurrentUser, setToken } = useAuth();
  let email = useInputValue('email');
  let name = useInputValue('name');
  let password = useInputValue('password');
  let passwordConfirmation = useInputValue('password_confirmation');

  const handleSubmit = e => {
    e.preventDefault();

    register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    }).then(({user, token}) => {
      setCurrentUser(user);
      setToken(token);
      history.push('/home');
    }).catch(error => {
      error.json().then(({errors}) => {
        ;[email, name, password].forEach(({parseServerError}) => parseServerError(errors));
      });
    });
  };

  return (

    <><GuestNav />
    <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-black">

          <div className="p-8 flex flex-col items-center">
              <div className="text-6xl leading-loose text-white font-bungee font-bold">
                AJ’s Experience
              </div>
          </div>

          <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 bg-black">
              <form onSubmit={handleSubmit}
                  method="POST"
              >
                  <div className="mb-4 mt-2">
                      <label className="block text-white text-2xl mb-1 font-bold text-center font-inter" htmlFor="username">
                          Join
                      </label>
                  </div>

                  <div className="mb-4">
                      <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="email"
                          className={`bg-black appearance-none border-b-2 border-gray-200 border-opacity-25 rounded w-full py-1 px-3${email.error ? 'border-red-500' : ''}`}
                          required
                          {...email.bind} />
                        <span className="input-icon">
                            <FontAwesomeIcon icon={['far', 'user']} />
                        </span>
                      {email.error && <p className="text-500 text-xs pt-2">{email.error}</p>}
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
                      <input
                          type="password"
                          id="password"
                          name="password"
                          className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100  ${password.error ? 'border-red-500' : ''}`}
                          minLength={6}
                          required
                          {...password.bind} />

                      {password.error && <p className="text-red-500 text-xs pt-2">{password.error}</p>}
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
                      <input
                          type="password"
                          id="password-confirmation"
                          name="password_confirmation"
                          className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${password.error ? 'border-red-500' : ''}`}
                          required
                          {...passwordConfirmation.bind} />
                  </div>

                  <div className="mb-4">
                      <button className="border rounded p-2 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">
                          Register
                      </button>
                  </div>
              </form>
          </div>
      </div></>
  );
}

export default Join;
