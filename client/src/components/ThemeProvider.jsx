
import { useSelector } from "react-redux"
import PropTypes from 'prop-types';


export default function ThemeProvider({ children }) {
    const { theme } = useSelector(state => state.theme);

    
    return (
        <div className={` ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="bg-white text-gray-700 dark:text-gray-100 dark:bg-[rgb(16,23,42)] h-full">
                {children}
            </div>

        </div>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
