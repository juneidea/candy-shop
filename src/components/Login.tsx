import React, {useState} from 'react';

const Login: React.FunctionComponent<{handleSubmit: (evt: any) => void}> = ({handleSubmit}) => {
  const [guest, setGuest] = useState(true)
  const [warning, setWarning] = useState(' != candy')

  return (
    <div className="outline">
      <div className="sign-in-outline">
        <form className="sign-in" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" required={true} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" placeholder={guest ? 'candy' : ''} required={true} onChange={(e) => {
              if (guest && (e.target.value !== 'candy')) {
                const pw = '*'.repeat(e.target.value.length)
                setWarning(`${pw} != candy`)
              } else setWarning('***** = candy')
            }} />
            <small>{guest ? warning !== ' != candy' ? warning : '* use candy to pass as a guest' : '* admin password'}</small>
            <div className="radio" >
              <input id="guest" name="user-type" type="radio" className="radio-button" value='guest' checked={guest} onChange={() => setGuest(!guest)} />
              <label htmlFor="guest">Guest</label>
              <input id="admin" name="user-type" type="radio" className="radio-button" value='admin' checked={!guest} onChange={() => setGuest(!guest)}/>
              <label htmlFor="admin">Admin</label>
            </div>
          </div>
          <div className="sign-in-submit">
            <button type="submit" disabled={guest && warning !== '***** = candy'} >Submit</button>
          </div>
        </form>
        <div className="oauth">
          <a href="/auth/google">Login with Google</a>
        </div>  
      </div>
    </div>
  );
};

export default Login