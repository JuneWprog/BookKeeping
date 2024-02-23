import {createBrowserRouter} from 'react-router-dom';
import Layout from '../routes/Layout';
import Year from '../routes/Year';
import Month from '../routes/Month';
import NewNote from '../routes/NewNote';

const router = createBrowserRouter([
    {path:'/',
    element:<Layout />,
    children:[
        {path:'year',
        element:<Year/>
        },
        {index:true,
        element:<Month/>
        }
    ]
    },
    {
    path:'/new-bill',
    element: <NewNote/>
    },
    { path:'*',
    element:<h1> 404 Not Found</h1>
    } 
]);
export default router;
