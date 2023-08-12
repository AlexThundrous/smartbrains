import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            showConfirmPassword: false,
            Email: '',
            Password: '',
            ConfirmPassword: '',
            Name: '',
            passwordMatch: true,
        };
    }

    onConfirmPasswordChange(event) {
        this.setState({
            ConfirmPassword: event.target.value,
            passwordMatch: true,
        });
    }

    onEmailChange(event) {
        this.setState({ Email: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ Password: event.target.value });
    }

    onNameChange(event) {
        this.setState({ Name: event.target.value });
    }

    onSubmitSignIn = (e) => {
        e.preventDefault();
        if (this.state.Password !== this.state.ConfirmPassword) {
            this.setState({ passwordMatch: false });
            return;
        }
        fetch('http://localhost:3002/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.Password,
                name: this.state.Name
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    toggleShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword,
        }));
    };

    toggleShowConfirmPassword = () => {
        this.setState(prevState => ({
            showConfirmPassword: !prevState.showConfirmPassword,
        }));
    };

    render() {
        const { onRouteChange } = this.props;
        const { showPassword, showConfirmPassword, Email, Password, Name } = this.state;
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        const isFormValid = Email.trim() !== '' && Password.trim().length >= 3 && Name.trim() !== '';

        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={this.onSubmitSignIn}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={this.onNameChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="relative mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={this.onPasswordChange}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-900 focus:outline-none"
                                    onClick={this.toggleShowPassword}>
                                    {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                        <path d="M 42.470703 3.9863281 A 1.50015 1.50015 0 0 0 41.439453 4.4394531 L 28.025391 17.853516 C 28.02058 17.85139 28.016533 17.847821 28.011719 17.845703 L 14.845703 31.009766 C 14.848052 31.015107 14.851157 31.020054 14.853516 31.025391 L 4.4394531 41.439453 A 1.50015 1.50015 0 1 0 6.5605469 43.560547 L 16.513672 33.607422 C 18.345732 35.683816 21.01901 37 24 37 C 29.514 37 34 32.514 34 27 C 34 24.019566 32.683637 21.345974 30.607422 19.513672 L 35.052734 15.068359 C 39.90447 17.90912 43.668811 22.496845 45.050781 27.869141 C 45.220781 28.549141 45.83 29 46.5 29 C 46.62 29 46.749141 28.989219 46.869141 28.949219 C 47.679141 28.749219 48.159219 27.930859 47.949219 27.130859 C 46.409379 21.128251 42.461227 16.073087 37.277344 12.84375 L 43.560547 6.5605469 A 1.50015 1.50015 0 0 0 42.470703 3.9863281 z M 23.990234 9 C 12.820234 9 2.7507813 16.620859 0.05078125 27.130859 C -0.15921875 27.930859 0.32085937 28.749219 1.1308594 28.949219 C 1.9308594 29.159219 2.7492187 28.679141 2.9492188 27.869141 C 5.2792187 18.819141 14.330234 12 23.990234 12 C 25.700234 12 27.389531 12.209141 29.019531 12.619141 L 31.480469 10.160156 C 29.090469 9.4001562 26.570234 9 23.990234 9 z M 24 17 C 18.486 17 14 21.486 14 27 C 14 27.197 14.017297 27.390938 14.029297 27.585938 L 24.585938 17.029297 C 24.390937 17.017297 24.197 17 24 17 z M 25.632812 24.488281 C 26.454417 25.023417 27 25.946264 27 27 C 27 28.657 25.657 30 24 30 C 22.946264 30 22.023417 29.454417 21.488281 28.632812 L 25.632812 24.488281 z"></path>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                        <path d="M 23.986328 9 C 12.666705 9 2.6928719 16.845918 0.046875 27.126953 A 1.5002454 1.5002454 0 0 0 2.953125 27.873047 C 5.2331281 19.014082 14.065951 12 23.986328 12 C 33.906705 12 42.767507 19.01655 45.046875 27.873047 A 1.5002454 1.5002454 0 0 0 47.953125 27.126953 C 45.306493 16.84345 35.305951 9 23.986328 9 z M 24.001953 17 C 18.681885 17 14.337891 21.343999 14.337891 26.664062 C 14.337891 31.984127 18.681885 36.330078 24.001953 36.330078 C 29.322021 36.330078 33.667969 31.984126 33.667969 26.664062 C 33.667969 21.343999 29.322021 17 24.001953 17 z"></path>
                                    </svg>}
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="relative mt-2">
                                <input
                                    id="confirm password"
                                    name="password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="confirm-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={this.onConfirmPasswordChange}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-900 focus:outline-none"
                                    onClick={this.toggleShowConfirmPassword}>
                                    {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                        <path d="M 42.470703 3.9863281 A 1.50015 1.50015 0 0 0 41.439453 4.4394531 L 28.025391 17.853516 C 28.02058 17.85139 28.016533 17.847821 28.011719 17.845703 L 14.845703 31.009766 C 14.848052 31.015107 14.851157 31.020054 14.853516 31.025391 L 4.4394531 41.439453 A 1.50015 1.50015 0 1 0 6.5605469 43.560547 L 16.513672 33.607422 C 18.345732 35.683816 21.01901 37 24 37 C 29.514 37 34 32.514 34 27 C 34 24.019566 32.683637 21.345974 30.607422 19.513672 L 35.052734 15.068359 C 39.90447 17.90912 43.668811 22.496845 45.050781 27.869141 C 45.220781 28.549141 45.83 29 46.5 29 C 46.62 29 46.749141 28.989219 46.869141 28.949219 C 47.679141 28.749219 48.159219 27.930859 47.949219 27.130859 C 46.409379 21.128251 42.461227 16.073087 37.277344 12.84375 L 43.560547 6.5605469 A 1.50015 1.50015 0 0 0 42.470703 3.9863281 z M 23.990234 9 C 12.820234 9 2.7507813 16.620859 0.05078125 27.130859 C -0.15921875 27.930859 0.32085937 28.749219 1.1308594 28.949219 C 1.9308594 29.159219 2.7492187 28.679141 2.9492188 27.869141 C 5.2792187 18.819141 14.330234 12 23.990234 12 C 25.700234 12 27.389531 12.209141 29.019531 12.619141 L 31.480469 10.160156 C 29.090469 9.4001562 26.570234 9 23.990234 9 z M 24 17 C 18.486 17 14 21.486 14 27 C 14 27.197 14.017297 27.390938 14.029297 27.585938 L 24.585938 17.029297 C 24.390937 17.017297 24.197 17 24 17 z M 25.632812 24.488281 C 26.454417 25.023417 27 25.946264 27 27 C 27 28.657 25.657 30 24 30 C 22.946264 30 22.023417 29.454417 21.488281 28.632812 L 25.632812 24.488281 z"></path>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                        <path d="M 23.986328 9 C 12.666705 9 2.6928719 16.845918 0.046875 27.126953 A 1.5002454 1.5002454 0 0 0 2.953125 27.873047 C 5.2331281 19.014082 14.065951 12 23.986328 12 C 33.906705 12 42.767507 19.01655 45.046875 27.873047 A 1.5002454 1.5002454 0 0 0 47.953125 27.126953 C 45.306493 16.84345 35.305951 9 23.986328 9 z M 24.001953 17 C 18.681885 17 14.337891 21.343999 14.337891 26.664062 C 14.337891 31.984127 18.681885 36.330078 24.001953 36.330078 C 29.322021 36.330078 33.667969 31.984126 33.667969 26.664062 C 33.667969 21.343999 29.322021 17 24.001953 17 z"></path>
                                    </svg>}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isFormValid ? 'hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'cursor-not-allowed opacity-50'
                                    }`}
                                onClick={this.onSubmitSignIn}
                                disabled={!isFormValid}
                            >
                                Register
                            </button>
                        </div>

                        <div>
                            {this.state.passwordMatch === false && (
                                <p className="text-red-700 text-l mt-2 text-center font-semibold">Passwords do not match.</p>
                            )}
                        </div>

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => onRouteChange('signin')}>
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Register;