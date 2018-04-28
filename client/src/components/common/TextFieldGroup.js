import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  info,
  value,
  error,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input type={type}
            className={classnames('form-control form-control-lg', {
              'is-invalid': error
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled} />
          {error && (<div className="invalid-feedback">{error}</div>)}
          {info && <small className="form-text text-muted">{info}</small>}
    </div>
  )
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
}
TextFieldGroup.defaultProps = {
  type: 'text'
}
export default TextFieldGroup;
