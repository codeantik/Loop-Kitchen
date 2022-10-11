import './styles.css';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {

    const navigate = useNavigate();

    const menuItems = [
        {
            key: '/',
            label: 'Home',
        },
        {
            key: '/bookmarks',
            label: 'Bookmarks'
        },
        {
            key: '/details',
            label: 'Details'
        },
        {
            key: '/analytics',
            label:'Analytics'
        }
    ]

    const handleMenuItemClick = (menuItem) => {
        console.log('menuitem clicked');
        navigate(menuItem.key)
    }
    
    return (
        <Menu 
            items={menuItems} 
            onClick={handleMenuItemClick} 
            style={
                { 
                    fontWeight: '500', 
                    fontSize: '16px', 
                    textAlign: 'left',
                    padding: '10px',
                    margin: '10px 5px 10px 20px',
                }
            } 
        />
    )
}

export default SideMenu;