import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const buttonStyle = {
    width: '10%',
    height: '50px',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: 500,
    color: 'rgb(165, 165, 165)',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: 45,
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease 0s',
    cursor: 'pointer',
    outline: 'none',
}
export const StyledButtonTrue = withStyles({
    root: {
        ...buttonStyle,
        "&:hover": {
            backgroundColor: "#e55fff !important",
            boxShadow: "0px 15px 20px #e55fff",
            color: "white"
        }
    },

})(Button);
export const StyledButtonFalse = withStyles({
    root: {
        ...buttonStyle,
        "&:hover": {
            backgroundColor: "#2858fb !important",
            boxShadow: "0px 15px 20px #2858fb",
            color: "white"
        }
    },
})(Button);
