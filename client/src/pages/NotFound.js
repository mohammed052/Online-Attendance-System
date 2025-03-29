import {Link} from 'react-router-dom'

const NotFound = () => {
    return ( 
        <div>
            <h2> SORRY</h2>
            <p> Page Not Found</p>

            <Link to="/teacher" ><p>Go to home page</p></Link>
        </div>
     );
}
 
export default NotFound;