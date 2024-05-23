import { useEffect, useState } from 'react';
import './styles/Form.css';


const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [staff, setStaff] = useState('');
    const [bio, setBio] = useState('');

    const [signup, setSignup] = useState(false);

    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};

        if (!name.length > 0) errors.name = 'Please enter your Name';
        if (!email.includes('@')) errors.email = 'Please provide a valid Email';
        // const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const phonePattern = /^(\+?\d{1,4}?[-.\s]?\(?(?:0|[1-9]{1})\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}[\s]*(?:ext|x|ext.)?\s*\d{1,5}?)$/;
        if (!phonePattern.test(phoneNumber)) errors.phoneNumber = 'Phone number must be 10 digits';

        setValidationErrors(() => errors);
    }, [name, email]);

    const handleNameChange = (event) => {
        setName(() => event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(() => event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        // const value = event.target.value;
        // if (value !== '' && !isNaN(value)) {
        //     setPhoneNumber(() => parseInt(event.target.value));
        //     console.log(typeof parseInt(event.target.value))
        //     console.log(typeof event.target.value)
        // }

        setPhoneNumber(() => event.target.value);
        console.log(event.target.value);
        console.log(typeof event.target.value, '[jjjii', phoneNumber);
    }

    const handlePhoneTypeChange = (event) => {
        setPhoneType(() => event.target.value);
    }

    const handleStaffChange = (event) => {
        setStaff(() => event.target.value);
    }

    const handleBioChange = (event) => {
        setBio(() => event.target.value);
    }

    const handleSignupChange = (event) => {
        setSignup(() => event.target.checked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setHasSubmitted(() => true);
        if (Object.keys(validationErrors).length) {
            return alert(`The following errors were found:
      
        ${validationErrors.name ? "* " + validationErrors.name : ""}
        ${validationErrors.email ? "* " + validationErrors.email : ""}
        ${validationErrors.phoneNumber ? "* " + validationErrors.phoneNumber : ""} `);
        }

        const contactUsInformation = {
            name, email, phoneNumber, phoneType, staff, bio, submittedOn: new Date()
        }

        console.log(contactUsInformation);

        setName('');
        setEmail('');
        setPhoneNumber('');
        setPhoneType('')
        setStaff('');
        setBio('');
        setSignup(false);
        setValidationErrors({});
        setHasSubmitted(false);
    }

    return (
        <section className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div>
                        <label htmlFor="name">Name</label>
                        <div className='error'>
                            {hasSubmitted && validationErrors.name && `* ${validationErrors.name} `}
                        </div>
                    </div>
                    <input type="text" name="name" id="name" value={name} onChange={handleNameChange} required />
                </div>


                <div className="form-group">
                    <div>
                        <label htmlFor="email">Email</label>
                        <span className='error'>
                            {hasSubmitted && validationErrors.email && `* ${validationErrors.email}`}
                        </span>
                    </div>
                    <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} required />
                </div>

                <div className="form-group">
                    <div>
                        <label htmlFor="phone">Phone Number</label>
                        <span className='error'>
                            {hasSubmitted && validationErrors.phoneNumber && `* ${validationErrors.phoneNumber} `}
                        </span>
                    </div>
                    <input type="text" name="phone" id="phone" value={phoneNumber} onChange={handlePhoneNumberChange} required />
                </div>


                <div className="form-group">
                    <div>
                        <label htmlFor="phoneType">Phone Type</label>
                        <div className='error'>
                            {hasSubmitted && validationErrors.phoneType && `* ${validationErrors.phoneType} `}
                        </div>
                    </div>
                    <select name="phoneType" id="phoneType" defaultValue={phoneType} onChange={handlePhoneTypeChange}>
                        <option value="" disabled>Select a phone type</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </div>

                <div className='error'>
                    {hasSubmitted && validationErrors.staff && `* ${validationErrors.staff} `}
                </div>
                <div className="form-group">
                    <label>Staff</label>
                    <div>
                        <input type="radio" id="instructor" name="staff" value="instructor" onChange={handleStaffChange} checked={staff === 'instructor'} />
                        <label htmlFor="instructor">Instructor</label>
                    </div>
                    <div>
                        <input type="radio" id="student" name="staff" value="student" onChange={handleStaffChange} checked={staff === 'student'} />
                        <label htmlFor="student">Student</label>
                    </div>
                </div>

                <div className='error'>
                    {hasSubmitted && validationErrors.bio && `* ${validationErrors.bio} `}
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" value={bio} onChange={handleBioChange}></textarea>
                </div>

                <div className='error'>
                    {hasSubmitted && validationErrors.signup && `* ${validationErrors.signup} `}
                </div>
                <div className="form-group">
                    <label htmlFor="signup">Sign up for email notifications</label>
                    <input type="checkbox" name="signup" id="signup" onChange={handleSignupChange} checked={signup} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default Form;
