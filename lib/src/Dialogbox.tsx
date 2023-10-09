import * as React from 'react';
import * as classNames from 'classnames';
import Button from './Button';
import { IDialogboxProps } from './Dialogbox.d';
import './dialogbox.less';
import store from './store/DialogboxStore';

const { validFunction } = store

class Dialogbox extends React.Component<IDialogboxProps, any> {

    constructor(props) {
        super(props);
        this.init(props);
    }

    dialogboxId;

    isEmbedded = false; // 是否是内嵌在组件中的

    dom; // 对话框最外层元素 dom

    init(props) {

        const { width, height, marginTop, marginLeft } = this.computerLayout(props);

        const { draggable = true, title } = props;

        const dialogboxId = store.registerDialogbox(props);

        this.dialogboxId = dialogboxId;

        this.state = {
            width,
            height,
            toRight: 0, // 向右的偏移量
            toBottom: 0, // 向下的偏移量
            isExtend: false,
            draggable,//是否可拖拽
            zIndex: dialogboxId, // 控制层级    
            marginTop, //让表单初始时保持居中
            marginLeft, //让表单初始时保持居中
            historyWidth: width,
            historyHeight: height,
            title: title,
            transition: 'none',
            historyToBottom: 0,
            historyToRight: 0
        }
    }

    computerLayout(props) {
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

        //保证宽高不小于最小值
        return {
            height: height < 120 ? 120 : height,
            width: width < 120 ? 120 : width,
            marginTop: 0 - 0.5 * height,
            marginLeft: 0 - 0.5 * width,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if (visible !== '' && visible !== null) {
            if (visible === false) {
                this.afterClose()
            } else {
                store.changeDialogboxVisible(this.dialogboxId, true);
                if (this.props.fullScreen) {
                    this.handleExtend(true)
                }
            }
        }
    }

    componentWillUnmount() {
        this.afterClose();
        store.unRegisterDialogbox(this.dialogboxId);
    }

    afterClose() {
        if (this.props.afterClose) {
            validFunction(this.afterClose)
        }
        this.handleExtend(null, false)
        store.changeDialogboxVisible(this.dialogboxId, false);
    }

    onOk = () => {
        validFunction(this.props.onOk)
    }

    onCancel = () => {
        validFunction(this.props.onCancel)
    }

    // 用于判断是否允许控制
    controllable = () => {
        let focusItem = store.getFocusItem();
        if (!focusItem) {
            return true
        }
        let curIsModal = this.props.isModal;
        let foucsItemIsModal = focusItem.isModal;
        if ((focusItem.dialogboxId !== this.state.zIndex) && (foucsItemIsModal || curIsModal)) {
            return false // 如果被聚焦的dialogbox是个模态框，或当前选中的dialogbox是个模态框则无法操作其它模态框
        }
        return true
    }

    isfocus() {
        return store.focusZIndex === this.state.zIndex;
    }

    dragMove = (e) => {
        if (!this.controllable()) return

        //当鼠标按下时触发
        e.stopPropagation();
        let pointLeft = e.clientX; //获取此时鼠标距离屏幕左侧的距离
        let pointTop = e.clientY; //获取此时鼠标距离屏幕顶部的距离

        //此刻的右和下方向的偏移量
        let right = this.state.toRight;
        let bottom = this.state.toBottom;

        //当鼠标按下后拖动时触发

        const onmousemove = (event) => {
            if (validFunction(this.props.beforeDragMove, event)) {
                return
            }

            //避免拖动过程中文本被选中
            window.getSelection ? window.getSelection()?.removeAllRanges() : (document as any).selection.empty();

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

        const onmouseup = (event) => {
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
                extendMaskDOMX.classList.add('mask-out-right')
                this.handleExtend('right');
            }

            document.removeEventListener('mousemove', onmousemove);
            document.removeEventListener('mouseup', onmouseup);

            validFunction(this.props.afterDragMove, event)
        }

        document.addEventListener('mousemove', onmousemove);
        document.addEventListener('mouseup', onmouseup);
    }

    dragScale = (e, x?, y?) => {
        if (!x && !y) return;

        if (!this.controllable()) return;

        e.stopPropagation();

        let { width, toRight: right, } = this.state;
        let pointLeft = e.clientX //获取此时鼠标距离屏幕左侧的距离
        let left = this.dom.offsetLeft + right; //对话框到左边的距离
        let pointDirectionX, pointDirectionY; //点击的是对话框上下左右

        if (x) {
            if (pointLeft - left <= 20 && pointLeft >= left) {
                pointDirectionX = 'left';
            } else if (width + left - pointLeft <= 20) {
                pointDirectionX = 'right';
            } else {
                return;
            }
        }

        let { height, toBottom: bottom, } = this.state;
        let pointTop = e.clientY //获取此时鼠标距离屏幕顶部的距离
        let top = this.dom.offsetTop + bottom; //对话框到顶部的距离

        if (y) {
            if (pointTop - top <= 20 && pointTop >= top) {
                pointDirectionY = 'top';
            } else if (height + top - pointTop <= 20) {
                pointDirectionY = 'bottom';
            } else {
                return;
            }
        }

        const onmousemove = (event) => {
            window.getSelection ? window.getSelection().removeAllRanges() : (document as any).selection.empty();
            let toRight = right, newWidth = width, toBottom = bottom, newHeight = height;

            if (x) {
                if (pointDirectionX === 'left') {
                    toRight = event.clientX - pointLeft + right;
                    newWidth = width + pointLeft - event.clientX;
                    newWidth = newWidth < 200 ? 200 : newWidth;
                } else {
                    toRight = right;
                    newWidth = width + event.clientX - pointLeft;
                    newWidth = newWidth < 200 ? 200 : newWidth;
                }
            }

            if (y) {
                if (pointDirectionY === 'top') {
                    toBottom = event.clientY - pointTop + bottom;
                    newHeight = height + pointTop - event.clientY;
                    newHeight = newHeight < 120 ? 120 : newHeight;
                } else {
                    toBottom = bottom;
                    newHeight = height + event.clientY - pointTop;
                    newHeight = newHeight < 120 ? 120 : newHeight;
                }
            }

            this.setState({
                toRight,
                width: newWidth,
                toBottom,
                height: newHeight,
            })
        }

        const onmouseup = () => {
            document.removeEventListener('mousemove', onmousemove);
            document.removeEventListener('mouseup', onmouseup);
        }

        document.addEventListener('mousemove', onmousemove);
        document.addEventListener('mouseup', onmouseup);
    }

    /* 全屏/还原 */
    handleExtend(direction?, value?) {
        if (!this.controllable()) return
        let { clientWidth, clientHeight } = document.body;
        let marginTop, marginLeft, toRight, toBottom;
        let { draggable, isExtend, historyToBottom, historyToRight, height, width, historyWidth, historyHeight } = this.state;
        if (value === false && !isExtend) return;
        if (!isExtend || value) {
            historyWidth = width;
            historyHeight = height;
            width = clientWidth;
            height = clientHeight;
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
        } else {
            //从全屏状态恢复为原来的状态
            draggable = this.props.draggable === false ? false : true;
            width = historyWidth;
            height = historyHeight;
            toRight = historyToRight;
            toBottom = historyToBottom;
            marginTop = 0 - 0.5 * height;
            marginLeft = 0 - 0.5 * width;
        }

        const callback = () => {
            this.setState({
                historyWidth: this.state.width,
                historyHeight: this.state.height,
                marginTop,
                marginLeft,
                toRight,
                toBottom,
                draggable,
                historyToBottom: this.state.toBottom,
                historyToRight: this.state.toRight,
                isExtend: !isExtend,
                width,
                height,
                transition: '0.4s'
            })
            setTimeout(() => this.setState({
                transition: 'none'
            }), 400)
        }

        if(value === true) {
            setTimeout(()=>{
                callback()
            },500)
        } else {
            callback()
        }
    }

    //聚焦
    handleFocus = () => {
        if (this.props.isModal) return;
        const { dialogboxList } = store;
        const focusZIndex = store.focusZIndex;
        if (dialogboxList.length > 1 && this.state.zIndex < focusZIndex) {
            let newZIdx = store.promoteZIndex(this.dialogboxId);
            this.setState({
                zIndex: newZIdx,
            })
        }
    }

    componentDidMount() {
        const { byOpen, fullScreen } = this.props;
        // 如果是通过open方法打开，需要单独判断是否初始全屏
        if (byOpen && fullScreen) {
            this.handleExtend(null, true)
        }

        // 注册点击阴影触发onCancel事件
        this.isEmbedded = !!!document.getElementById('dialogbox-wrapper-' + this.dialogboxId)
        if (!this.isEmbedded) {
            document.getElementById('dialogbox-root').addEventListener('click', this.handleMaskClick)
        } else {
            document.querySelector('.dialogbox-mask').addEventListener('click', this.handleMaskClick)
        }
    }

    // 当阴影点击时触发的事件
    handleMaskClick = (e) => {

        const { maskClosable, beforeMaskClick, afterMaskClick } = this.props;

        // 此处接收一个钩子作为参数，若存在返回值且返回值为 true 则跳过后续操作
        if (validFunction(beforeMaskClick, e)) {
            return
        }

        const dialogboxList = store.dialogboxList;

        if (!maskClosable) {
            return
        }

        if (e.srcElement !== document.querySelector('#dialogbox-root') && e.srcElement !== document.querySelector('.dialogbox-mask')) {
            return
        }

        if (!this.isEmbedded) {
            if (dialogboxList[dialogboxList.length - 1].dialogboxId != this.dialogboxId) {
                return
            }
        }

        this.onCancel();

        validFunction(afterMaskClick, e)
    }

    headerRender() {
        const { header = true, headerStyle, title } = this.props;
        const { draggable } = this.state;

        return header && <div className='dialogbox-header' style={headerStyle}>
            <div className='dialogbox-title'/* 对话框拖动事件 */
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
        </div>
    }

    footerRender = () => {
        const { footer, okText, cancelText, footerStyle } = this.props;

        if (typeof footer == 'string' || React.isValidElement(footer)) {
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
                style={footerStyle}
                className='dialogbox-footer'
            >
                <div className='dialogbox-footer-btnList'>
                    <Button
                        dialogboxType={'windows'}
                        className='dialogbox-footer-btn cancel-btn'
                        onClick={this.onCancel}>
                        {cancelText || '取消'}
                    </Button>

                    <Button
                        dialogboxType={'windows'}
                        btnType='primary'
                        className='dialogbox-footer-btn ok-btn'
                        onClick={this.onOk}>
                        {okText || '确认'}
                    </Button>
                </div>
            </div>
        )
    }

    angleRender() {
        return ['right-bottom', 'right-top', 'left-bottom', 'left-top'].map(item => {
            return <div key={item} className={classNames('draggableAngle', item)} onMouseDown={(e) => this.dragScale(e, true, true)}></div>
        })
    }

    sideRender() {
        return ['right', 'top', 'bottom', 'left'].map(item => {
            return <div key={item} className={classNames('draggableSide', item)} onMouseDown={(e) => {
                item === 'top' || item === 'bottom' ? this.dragScale(e, false, true) : this.dragScale(e, true, false)
            }}></div>
        })
    }

    btnListRender() {
        return <div className='dialogbox-header-btnList'>
            <div
                className={'dialogbox-header-btn btn-extend'}
                onClick={
                    () => this.handleExtend()
                }
            >
                <i className='dialogbox-icon dialogbox-icon-extend' ></i>
            </div>

            <div
                className='dialogbox-header-btn btn-close'
                onClick={
                    (e) => {
                        if (!this.controllable()) {
                            e.preventDefault()
                        } else {
                            this.onCancel()
                        }
                    }
                }>
                <i className='dialogbox-icon dialogbox-icon-close'></i>
            </div>
        </div>
    }

    render() {
        const { className: propsClassName, visible } = this.props;
        let { isExtend, draggable, toRight, toBottom, transition, width, height, zIndex, marginTop, marginLeft } = this.state;
        const className = classNames('dialogbox', 'dialogbox-animation-in',
            { 'dialogbox-extendStatus': isExtend, [propsClassName]: propsClassName },
            { 'dialogbox-uncontrolable': !this.controllable() },
            { 'dialogbox-foucs': this.isfocus() }
        )

        let transformProps = {
            transform: ''
        }
        if (toRight || toBottom) {
            transformProps = {
                transform: 'translate(' + (toRight || 0) + 'px,' + (toBottom || 0) + 'px)'
            }
        }

        return (
            <div
                ref={(dialogbox) => this.dom = dialogbox}
                id={'dialogbox-' + this.dialogboxId}
                className={className}
                onClick={() => { this.handleFocus() }}
                onMouseDown={e => {
                    if (!this.controllable()) {
                        e.preventDefault()
                    }
                }}
                style={{
                    display: visible ? 'flex' : 'none',
                    width: width + 'px',
                    height: height + 'px',
                    zIndex: zIndex,
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                    transition,
                    ...transformProps,
                }}>
                {
                    this.angleRender()
                }
                {
                    this.sideRender()
                }
                {
                    this.headerRender()
                }
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