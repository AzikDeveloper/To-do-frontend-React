import PropTypes from 'prop-types'
const Button = ({title, color, text, onClick}) => {
    return (
        <button title={title} type='button' onClick={onClick} style={{backgroundColor: color}} className='btn'>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}
export default Button
