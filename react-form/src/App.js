import { useState } from 'react';
import * as yup from 'yup';
import './App.css';

function App() {
  const validationSchema = yup.object().shape({
    name: yup.string().required('please include a name'),
    email: yup
      .string()
      .email('Please inlcude a valid email')
      .required('email address is required'),
    password: yup.string().required('password is required'),
    terms: yup.boolean().oneOf([true], 'Please agree to our terms!'),
  });

  const [validated, setvalidated] = useState(false);

  const [form, setForm] = useState({
    name: '',
    password: '',
    email: '',
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    password: '',
    email: '',
    terms: false,
  });

  const validation = (e) => {
    let value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    yup
      .reach(validationSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: '',
        }).catch((err) => {
          console.log(err);
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0],
          });
        });
      });
  };

  const handleChanges = (e) => {
    let value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const formSubmit = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={formSubmit}>
          <input
            type={'text'}
            name={'name'}
            placeholder={'Name'}
            value={form.name}
            onChange={handleChanges}
          />
          <input
            type={'password'}
            name={'password'}
            placeholder={'Password'}
            value={form.password}
            onChange={handleChanges}
          />
          <input
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            value={form.email}
            onChange={handleChanges}
          />
          <label htmlFor={'terms'}>Agree to terms</label>
          <input
            id={'terms'}
            type="checkbox"
            name={'terms'}
            checked={form.terms}
            onChange={handleChanges}
          />
          <button disabled={!validated} type={'submit'}>
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
