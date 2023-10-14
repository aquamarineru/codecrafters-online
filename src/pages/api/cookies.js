import Cookies from 'cookies';

// Optionally define keys to sign cookie values
// to prevent client tampering
const keys = ['codecrafters', 'online'];

const handleCookies = async(req, res) => {
    //Create cookies object
    const cookies = new Cookies(req, res, { keys });

    //Get a cookie
    const lastVisit = cookies.get('lastVisit', { signed: true });

    //Set cookie
    cookies.set('lastVisit', new Date().toISOString(), {
        httpOnly: true, // true by default
        secure: true, // true by default
        sameSite: 'strict', // strict by default
    });
    if (!lastVisit) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send('Welcome, first time visitor!');
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.');
      }
}
export default handleCookies;
/* export default async(res, req) => {
    const cookies = new Cookies(req, res, { keys });
    
    // Set a cookie
    cookies.set('name', 'value', {
        httpOnly: true, // true by default
        secure: true, // true by default
        sameSite: 'strict', // strict by default
    });
    
    // Get a cookie
    cookies.get('name', { signed: true });
    
    // Get all cookies
    cookies.getAll({ signed: true });
    
    // Remove a cookie
    cookies.set('name', null, {
        httpOnly: true,
        secure: true,
    });
    
    // Remove all cookies
    cookies.set('name', null, {
        httpOnly: true,
        secure: true,
    });
} */