import React from 'react';
import "./Sidebar.css"
import SidebarRow from './SidebarRow';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from './StateProvider';
import Header from "./Header";
import { ExitToApp } from '@material-ui/icons';
import { auth, provider} from "./firebase";
import firebase from 'firebase';



function Sidebar() {

    const handleLogout = (event) => {
        localStorage.clear();
        window.location.reload();
        console.log("you're logged out of app");
    }; 

    const [{user}, dispatch] = useStateValue();

    return (
        <div className="sidebar sidebarHide">
            <SidebarRow 
                src={user.photoURL}
                title={user.displayName}
            />
            
            <SidebarRow
                Icon={LocalHospitalIcon}
                title="COVID-19 Center"
            />
            <SidebarRow 
               Icon={EmojiFlagsIcon}
               title="Pages"                
            />
            <SidebarRow 
                Icon={PeopleIcon}
                title="Friends"
            />
            <SidebarRow 
                Icon={ChatIcon}
                title="Chat"
            />
            <SidebarRow 
                Icon={StorefrontIcon}
                title="Market Place"
            />
            <SidebarRow 
                Icon={VideoLibraryIcon}
                title="Videos"
            />

            <div  onClick={handleLogout}>
            <SidebarRow 
            Icon={ExitToApp}
            title="Logout"
             />
            </div>
        
            <SidebarRow 
                Icon={ExpandMoreIcon}
                title="More"
                
            />

            <hr className="sidebar__seprator"/>
            

        </div>
    )
}

export default Sidebar;
