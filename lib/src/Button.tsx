import * as React from 'react';
import * as classNames  from 'classnames';
import './button.less';

declare type IButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';

declare type IDialogboxStyle = 'windows' | 'macos';

interface IExtendButtonProps {
    btnType?: IButtonType,
    dialogboxType?: IDialogboxStyle
}

type IButtonProps = IExtendButtonProps & React.ButtonHTMLAttributes<HTMLElement>;

class Button extends React.Component<IButtonProps> {
    render() {
        const { disabled = false, onClick, className = '', dialogboxType, children, btnType, ...otherProps } = this.props;
        return <button
            className={classNames('dialogbox-button', className, btnType, { [dialogboxType + '-btn']: dialogboxType })}
            onClick={onClick}
            disabled={disabled}
            {...otherProps}
        >
            <span>{children}</span>
        </button>
    }
}

export default Button;