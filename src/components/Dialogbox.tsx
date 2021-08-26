import * as React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { IDialogboxProps } from './Dialogbox.d';
import './dialogbox.less';

class Dialogbox extends React.Component<IDialogboxProps, any> {

    constructor(props) {
        super(props);
        this.init(props);
    }

    isEmbedded = false;

    init(props) {
        let width = 400, height = 180;
        const { clientWidth, clientHeight } = document.body;

        //将宽高由百分比或者带px单位的string转换为number
        if (props.width && typeof props.width === 'number') {
            if (props.width > clientWidth) {
                //宽度限制为屏幕最大宽度
                width = clientWidth;
            } else {
                width = props.width;
            }

        } else if (props.width && typeof props.width === 'string' && props.width.includes('px')) {
            if (parseInt(props.width) > clientWidth) {
                width = clientWidth;
            } else {
                //去除string末尾的px
                width = parseInt(props.width);
            }
        } else if (props.width && typeof props.width === 'string' && props.width.includes('%')) {
            if (parseInt(props.width) > 100) {
                width = clientWidth;
            } else {
                width = clientWidth * parseInt(props.width) / 100;
            }

        }

        if (props.height && typeof props.height === 'number') {
            if (props.height > clientHeight) {
                height = clientHeight;
            } else {
                height = props.height;
            }
        } else if (props.height && typeof props.height === 'string' && props.height.includes('px')) {
            if (parseInt(props.height) > clientHeight) {
                height = clientHeight;
            } else {
                //去除string末尾的px
                height = parseInt(props.height);
            }

        } else if (props.height && typeof props.height === 'string' && props.height.includes('%')) {
            if (parseInt(props.height) > 100) {
                height = clientHeight;
            } else {
                height = clientHeight * parseInt(props.height) / 100;
            }
        }

        //设置最小初始宽高
        if (height < 120) {
            height = 120;
        }
        if (width < 200) {
            width = 200;
        }

        const that = this;

        const store = this.props.store;

        let { mask = true, visible, draggable = true, title, zIndex: customZIndex } = props;

        let zIndex = store.registerDialogbox(that, mask, visible);

        this.state = {
            width: width,
            height: height,
            toRight: 0, // 向右的偏移量
            toBottom: 0, // 向下的偏移量
            isExtend: false,
            draggable: draggable,//是否可拖拽
            dialogboxId: zIndex, // 初始值，用于定位
            zIndex: zIndex, // 控制层级    
            marginTop: 0 - 0.5 * height, //让表单初始时保持居中
            marginLeft: 0 - 0.5 * width, //让表单初始时保持居中
            historyWidth: width,
            historyHeight: height,
            title: title,
            transition: 'none'
        }
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if (visible !== '' && visible !== null) {
            if (visible === false) {
                this.afterClose();
            } else {
                this.props.store.changeDialogboxVisible(this.state.dialogboxId, true);
            }
        }
    }

    componentWillUnmount() {
        this.afterClose();
        this.props.store.unRegisterDialogbox(this.state.dialogboxId);
    }

    afterClose() {
        if (this.props.afterClose) {
            this.props.afterClose();
        }
        this.props.store.changeDialogboxVisible(this.state.dialogboxId, false);
    }

    onOk() {
        if (this.props.onOk) {
            this.props.onOk();
        }
    }

    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    dragMove = (e) => {
        //当鼠标按下时触发
        e.stopPropagation();
        let pointLeft = e.clientX; //获取此时鼠标距离屏幕左侧的距离
        let pointTop = e.clientY; //获取此时鼠标距离屏幕顶部的距离

        //此刻的右和下方向的偏移量
        let right = this.state.toRight;
        let bottom = this.state.toBottom;

        //当鼠标按下后拖动时触发
        document.onmousemove = (event) => {
            //避免拖动过程中文本被选中
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();

            let curCLientX = (event.clientX > 10 ? (event.clientX < document.body.clientWidth - 10 ? event.clientX : document.body.clientWidth - 10) : 10);

            let curCLientY = (event.clientY > 10 ? (event.clientY < document.body.clientHeight - 10 ? event.clientY : document.body.clientHeight - 10) : 10);

            let toRight = curCLientX - pointLeft + right;

            let toBottom = curCLientY - pointTop + bottom;
            const extendMaskDOMX = document.querySelector('.dialogbox-extend-mask-x');
            const extendMaskDOMY = document.querySelector('.dialogbox-extend-mask-y');
            if (event.clientX < 10) {
                if (!extendMaskDOMX.className.includes('dialogbox-extend-mask-in-x')) {
                    extendMaskDOMX.className = ' dialogbox-extend-mask-x mask-in-left'
                }
            }
            else if (event.clientX > document.body.clientWidth - 10) {
                if (!extendMaskDOMX.className.includes('dialogbox-extend-mask-in-x')) {
                    extendMaskDOMX.className = ' dialogbox-extend-mask-x mask-in-right'
                }
            } else if (event.clientY < 0) {
                if (!extendMaskDOMY.className.includes('dialogbox-extend-mask-in-y')) {
                    extendMaskDOMY.className = ' dialogbox-extend-mask-y mask-in-top'
                }
            }
            else if (event.clientY > document.body.clientHeight) {
                if (!extendMaskDOMY.className.includes('dialogbox-extend-mask-in-y')) {
                    extendMaskDOMY.className = ' dialogbox-extend-mask-y mask-in-bottom'
                }
            }
            else {
                if (extendMaskDOMX.className.includes('mask-in-left')) {
                    extendMaskDOMX.className = 'dialogbox-extend-mask-x'
                }
                if (extendMaskDOMX.className.includes('mask-in-right')) {
                    extendMaskDOMX.className = 'dialogbox-extend-mask-x mask-out-right'
                }
                if (extendMaskDOMY.className.includes('mask-in-top')) {
                    extendMaskDOMY.className = 'dialogbox-extend-mask-y mask-out-top'
                }
                if (extendMaskDOMY.className.includes('mask-in-bottom')) {
                    extendMaskDOMY.className = 'dialogbox-extend-mask-y mask-out-bottom'
                }
            }

            this.setState({
                toRight: toRight,
                toBottom: toBottom,
            })
        }

        document.onmouseup = (event) => {
            const extendMaskDOMX = document.querySelector('.dialogbox-extend-mask-x');
            const extendMaskDOMY = document.querySelector('.dialogbox-extend-mask-y');
            extendMaskDOMX.className = 'dialogbox-extend-mask-x';
            extendMaskDOMY.className = 'dialogbox-extend-mask-y';
            //鼠标松开后清除移动事件
            if (event.clientY < 0 || event.clientY > document.body.clientHeight) {
                this.handleExtend();
            }

            if (event.clientX < 10) {
                this.handleExtend('left');
            }
            if (event.clientX > document.body.clientWidth - 10) {
                this.handleExtend('right');
            }
            document.onmousemove = null;
        }
    }

    dragScaleX(e) {

        //当鼠标按下时触发
        e.stopPropagation();

        let { width, toRight: right, } = this.state;
        let pointLeft = e.clientX //获取此时鼠标距离屏幕左侧的距离
        let left = this.dialogbox.offsetLeft + right; //弹框到左边的距离
        let pointDirection; //点击的是弹框左侧 或是 右侧

        if (pointLeft - left <= 20 && pointLeft >= left) {
            pointDirection = 'left';
        } else if (width + left - pointLeft <= 20) {
            pointDirection = 'right';
        } else {
            return false;
        }

        //当鼠标按下后拖动时触发
        document.onmousemove = (event) => {
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();
            let toRight, newWidth;
            if (pointDirection === 'left') {
                toRight = event.clientX - pointLeft + right;
                newWidth = width + pointLeft - event.clientX;
                newWidth = newWidth < 200 ? 200 : newWidth;
            } else {
                toRight = right;
                newWidth = width + event.clientX - pointLeft;
                newWidth = newWidth < 200 ? 200 : newWidth;
            }

            this.setState({
                toRight,
                width: newWidth,
            })
        }

        document.onmouseup = () => {
            document.onmousemove = null;
        }
    }

    dialogbox;//dom

    dragScaleY(e) {

        //当鼠标按下时触发
        e.stopPropagation();

        let { height, toBottom: bottom, } = this.state;
        let pointTop = e.clientY //获取此时鼠标距离屏幕顶部的距离
        let top = this.dialogbox.offsetTop + bottom; //弹框到顶部的距离
        let pointDirection; //点击的是弹框上侧 或是 下侧

        if (pointTop - top <= 20 && pointTop >= top) {
            pointDirection = 'top';
        } else if (height + top - pointTop <= 20) {
            pointDirection = 'bottom';
        } else {
            return false;
        }

        //当鼠标按下后拖动时触发
        document.onmousemove = (event) => {
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();
            let toBottom, newHeight;
            if (pointDirection === 'top') {
                toBottom = event.clientY - pointTop + bottom;
                newHeight = height + pointTop - event.clientY;
                newHeight = newHeight < 120 ? 120 : newHeight;
            } else {
                toBottom = bottom;
                newHeight = height + event.clientY - pointTop;
                newHeight = newHeight < 120 ? 120 : newHeight;
            }

            this.setState({
                toBottom,
                height: newHeight,
            })
        }

        document.onmouseup = () => {

            document.onmousemove = null;
        }
    }

    dragScale(e) {
        e.stopPropagation();
        let { width, toRight: right, } = this.state;
        let pointLeft = e.clientX //获取此时鼠标距离屏幕左侧的距离
        let left = this.dialogbox.offsetLeft + right; //弹框到左边的距离
        let pointDirectionX, pointDirectionY; //点击的是弹框上下左右

        if (pointLeft - left <= 20 && pointLeft >= left) {
            pointDirectionX = 'left';
        } else if (width + left - pointLeft <= 20) {
            pointDirectionX = 'right';
        } else {
            return false;
        }

        let { height, toBottom: bottom, } = this.state;
        let pointTop = e.clientY //获取此时鼠标距离屏幕顶部的距离
        let top = this.dialogbox.offsetTop + bottom; //弹框到顶部的距离

        if (pointTop - top <= 20 && pointTop >= top) {
            pointDirectionY = 'top';
        } else if (height + top - pointTop <= 20) {
            pointDirectionY = 'bottom';
        } else {
            return false;
        }

        document.onmousemove = (event) => {
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();
            let toRight, newWidth, toBottom, newHeight;

            if (pointDirectionX === 'left') {
                toRight = event.clientX - pointLeft + right;
                newWidth = width + pointLeft - event.clientX;
                newWidth = newWidth < 200 ? 200 : newWidth;
            } else {
                toRight = right;
                newWidth = width + event.clientX - pointLeft;
                newWidth = newWidth < 200 ? 200 : newWidth;
            }

            if (pointDirectionY === 'top') {
                toBottom = event.clientY - pointTop + bottom;
                newHeight = height + pointTop - event.clientY;
                newHeight = newHeight < 120 ? 120 : newHeight;
            } else {
                toBottom = bottom;
                newHeight = height + event.clientY - pointTop;
                newHeight = newHeight < 120 ? 120 : newHeight;
            }

            this.setState({
                toRight,
                width: newWidth,
                toBottom,
                height: newHeight,
            })
        }

        document.onmouseup = () => {
            document.onmousemove = null;
        }

    }

    /* 全屏/还原 */
    handleExtend(direction?) {

        let { clientWidth: width, clientHeight: height } = document.body;
        let marginTop, marginLeft;
        let { draggable, historyWidth, historyHeight, isExtend, toRight } = this.state;
        if (!isExtend) {
            marginTop = 0;
            marginLeft = 0;
            toRight = 0;
            draggable = false;
            if (direction === 'left') {
                width *= 0.5;
            }
            else if (direction === 'right') {
                width *= 0.5;
                toRight = width;
            }
            else {
                marginTop = 0;
                marginLeft = 0;
                //若当前不是全屏状态则全屏后禁止拖拽

            }

        } else {
            //从全屏状态恢复为原来的状态
            draggable = this.props.draggable === false ? false : true;
            width = historyWidth;
            height = historyHeight;
            marginTop = 0 - historyHeight / 2;
            marginLeft = 0 - historyWidth / 2;
            toRight = 0;
        }
        this.setState({
            historyWidth: this.state.width,
            historyHeight: this.state.height,
            toRight,
            toBottom: 0,
            draggable,
            marginTop,
            marginLeft,
            isExtend: !isExtend,
            width,
            height,
            transition: '0.5s'
        })

        setTimeout(() => {
            this.setState({
                transition: 'none',
            })
        }, 500)
    }

    //聚焦
    handleFocus = () => {
        if (this.props.isModal) return;
        if (this.isEmbedded) return;
        const store = this.props.store;
        const { dialogboxList } = store;

        const maxZIndex = store.maxZIndex;
        if (dialogboxList.length > 1 && this.state.zIndex < maxZIndex) {
            let newZIdx = store.promoteZIndex(this.state.dialogboxId);
            this.setState({
                zIndex: newZIdx,
            })
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.isEmbedded = !!!document.getElementById('dialogbox-wrapper-' + this.state.dialogboxId)
            if (!this.isEmbedded) {
                document.getElementById('dialogbox-root').addEventListener('click', this.handleMaskClick)
            } else {
                document.querySelector('.dialogbox-mask').addEventListener('click', (e) => {
                    this.handleMaskClick(e)
                })
            }
        })
    }

    handleMaskClick = (e) => {
        const { maskClosable, store } = this.props;
        const dialogboxList = store.dialogboxList;

        if (!maskClosable) {
            return
        }

        if (e.toElement !== document.querySelector('#dialogbox-root') && e.toElement !== document.querySelector('.dialogbox-mask')) {
            return
        }

        if (!this.isEmbedded) {
            if (dialogboxList[dialogboxList.length - 1].dialogboxId != this.state.dialogboxId) {
                return
            }
        }

        this.onCancel();
    }

    footerRender = () => {
        const { footer, okText, cancelText } = this.props;
        const { draggable = true } = this.state;

        if (Object.prototype.toString.call(footer) === '[object Object]' && (footer as JSX.Element).type) {
            /* 如果是一个react组件 */
            return <div className='dialogbox-footer-wrapper'>
                {footer}
            </div>
        }

        if (footer === false) {
            return null
        }

        return (
            <div
                className='dialogbox-footer'
                onMouseDown={(e) => {
                    /* 触发高度缩放事件 */
                    draggable && this.dragScaleY(e)
                }}>

                <div className='dialogbox-footer-btnList'>

                    <Button dialogboxType={this.props.dialogboxStyle} className='dialogbox-footer-btn cancel-btn' onClick={
                        () => this.onCancel()
                    }>
                        {cancelText || '取消'}
                    </Button>

                    <Button dialogboxType={this.props.dialogboxStyle} btnType='primary' className='dialogbox-footer-btn ok-btn' onClick={
                        () => this.onOk()
                    }>
                        {okText || '确认'}
                    </Button>
                </div>
            </div>
        )
    }

    draggableAngleRender() {
        return ['right-bottom', 'right-top', 'left-bottom', 'left-top'].map(item => {
            return <div key={item} className={classNames('draggableAngle', item)} onMouseDown={(e) => this.dragScale(e)}></div>
        })
    }

    draggableSideRender() {
        return ['right', 'top', 'bottom', 'left'].map(item => {
            return <div key={item} className={classNames('draggableSide', item)} onMouseDown={(e) => {
                item === 'top' || item === 'bottom' ? this.dragScaleY(e) : this.dragScaleX(e)
            }}></div>
        })
    }

    btnListRender() {
        return <div className='dialogbox-header-btnList'>
            {this.props.dialogboxStyle != 'macos' ? <>
                <div
                    className={classNames('dialogbox-header-btn btn-extend')}
                    onClick={
                        () => this.handleExtend()
                    }
                >
                    <i className='dialogbox-icon dialogbox-icon-extend' ></i>
                </div>

                <div
                    className='dialogbox-header-btn btn-close'
                    onClick={
                        () => this.onCancel()
                    }>
                    <i className='dialogbox-icon dialogbox-icon-close' ></i>
                </div>
            </>
                :
                <>
                    <div
                        className={classNames('dialogbox-header-btn macos-style btn-extend')}
                        onClick={
                            () => this.handleExtend()
                        }
                    >
                        <i className='dialogbox-icon dialogbox-icon-extend' >
                            <span className='dialogbox-icon-extend-rectangle'>
                                <span className='dialogbox-icon-extend-shadow'>
                                </span>
                            </span>
                            <span className='dialogbox-icon-extend-rectangle'>
                                <span className='dialogbox-icon-extend-shadow'>
                                </span>
                            </span>
                        </i>
                    </div>

                    <div
                        className='dialogbox-header-btn macos-style btn-close'
                        onClick={
                            () => this.onCancel()
                        }>
                        <i className='dialogbox-icon dialogbox-icon-close' ></i>
                        <i className='dialogbox-icon dialogbox-icon-extend' ></i>
                    </div>
                </>
            }
        </div>
    }

    render() {
        const { className: propsClassName, title, closable = true, bodyStyle, dialogboxStyle = 'windows', visible, header=true } = this.props;
        let { isExtend, draggable, dialogboxId, toRight, toBottom, transition, width, height, zIndex, marginTop, marginLeft } = this.state;
        const className = classNames('dialogbox', 'dialogbox-animation-in',
            { 'dialogbox-extendStatus': isExtend, [propsClassName]: propsClassName },
            { [dialogboxStyle]: dialogboxStyle }
        )
        let transformProps = {}
        if (toRight || toBottom) {
            transformProps = {
                transform: 'translate(' + toRight + 'px,' + toBottom + 'px)'
            }
        }

        return (
            <div
                ref={(dialogbox) => this.dialogbox = dialogbox}
                id={'dialogbox-' + dialogboxId}
                className={className}
                onClick={() => { this.handleFocus() }}

                style={{
                    ...bodyStyle,
                    display: visible ? 'flex' : 'none',
                    width: width + 'px',
                    height: height + 'px',
                    zIndex: zIndex,
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                    transition: transition,
                    ...transformProps
                }}>

                {this.draggableAngleRender()}
                {this.draggableSideRender()}

                {header && <div className='dialogbox-header'>

                    <div className='dialogbox-title'/* 弹窗拖动事件 */
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            this.handleFocus();
                            this.handleExtend();
                        }}
                        onMouseDown={(e) => {
                            this.handleFocus()
                            draggable && this.dragMove(e)
                        }}>
                        <span className='dialogbox-title-content'
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}>{title}</span>
                    </div>

                    {/* 右上角功能图标 */}
                    {this.btnListRender()}
                </div>}

                <div
                    className='dialogbox-body dialogbox-scroll'
                >
                    {/* 内容 */}
                    <div className='dialogbox-content'>
                        {this.props.children}
                    </div>
                </div>

                {   /* footer部分 */
                    this.footerRender()
                }
            </div>
        )
    }
}

export default Dialogbox;