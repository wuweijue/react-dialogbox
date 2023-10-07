import { Button, Form, Input, InputNumber, Radio, Switch } from 'antd';
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './options.less';
import { open, hideDialogbox } from '../../lib/src';

type OptionsType = {
    footer?: string | null | boolean;
    [key: string]: any
}

const Options = (props) => {
    const [state, setState] = useState<OptionsType>({
        title: 'react-dialogbox',
        mask: true,
        maskClosable: false,
        width: 400,
        height: 200,
        fullScreen: false,
        header: true,
        footerNum: 1,
        footerContent: '',
        draggable: true,
        okText: '',
        cancelText: '',
        footer: null,
        children: '对话框内容',
    })

    const { title, footerNum, footerContent, mask, maskClosable, width, height, header, draggable, okText, cancelText, children, fullScreen } = state;

    const handleEditorChange = (newValue, e) => {
        try {
            let code = JSON.parse(newValue);
            setState({ ...state, ...code })
        } catch (error) {

        }
    }

    return <div className="options">
        <div className="top">
            <Button type='primary'
                onClick={() => {
                    const { dialogboxId } = open({
                        onCancel() {
                            hideDialogbox(dialogboxId)
                        },
                        isModal: true,
                        title,
                        mask,
                        maskClosable,
                        width,
                        height,
                        fullScreen,
                        header,
                        footer: footerNum === 2 ? false : (footerNum === 1 ? true : footerContent),
                        draggable,
                        children
                    })
                }}
            >点击出现对话框</Button>
        </div>

        <div className="bottom">
            <div className='form-wrapper'>
                <h3 className='form-title'>属性面板</h3>
                <Form labelAlign='left'>
                    <Form.Item label="对话框标题 (title)">
                        <Input value={title} onChange={(e) => { setState({ ...state, ...{ title: e.target.value } }) }} />
                    </Form.Item>

                    <Form.Item label="遮罩层阴影 (mask)">
                        <Switch checked={mask} onChange={(checked) => { setState({ ...state, ...{ mask: checked } }) }} />
                    </Form.Item>

                    <Form.Item label="点击阴影关闭 (maskClosable)">
                        <Switch checked={maskClosable} onChange={() => {
                            let newMask = mask;
                            if (!maskClosable) {
                                newMask = true
                            }
                            setState({
                                ...state, ...{
                                    mask: newMask,
                                    maskClosable: !maskClosable
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item label="设置宽度 (width)" tooltip='取值区间：[ 200px, 浏览器可视宽度 ]，超出最值部分自动调整，支持百分比'>
                        <InputNumber value={width} onChange={(value) => {
                            setState({ ...state, ...{ width: Number(value) } })
                        }} />
                    </Form.Item>

                    <Form.Item label="设置高度 (height)" tooltip='取值区间：[ 120px, 浏览器可视高度 ]，超出最值部分自动调整，支持百分比'>
                        <InputNumber value={height} onChange={(value) => {
                            setState({ ...state, ...{ height: Number(value) } })
                        }} />
                    </Form.Item>

                    <Form.Item label="初始全屏 (fullScreen)">
                        <Switch checked={fullScreen} onChange={(checked) => {
                            setState({ ...state, ...{ fullScreen: checked } })
                        }} />
                    </Form.Item>

                    <Form.Item label="是否可拖拽 (draggable)">
                        <Switch checked={draggable} onChange={(checked) => {
                            setState({ ...state, ...{ draggable: checked } })
                        }} />
                    </Form.Item>

                    <Form.Item label="是否展示头部 (header)">
                        <Switch checked={header} onChange={(checked) => {
                            setState({ ...state, ...{ header: checked } })
                        }} />
                    </Form.Item>

                    <Form.Item label="对话框内容 (children)">
                        <Input value={children} onChange={(e) => {
                            setState({ ...state, ...{ children: e.target.value } })
                        }} />
                    </Form.Item>

                    <Form.Item label="是否展示底部 (footer)" tooltip='当值为布尔类型时，true 为显示默认的内容，false 为隐藏'>
                        <Radio.Group value={footerNum} onChange={(e => {
                            setState({ ...state, ...{ footerNum: e.target.value, footer: e.target.value === 2 ? false : (e.target.value === 1 ? null : footerContent) } })
                        })}>
                            <Radio value={1} > 显示默认底栏</Radio>
                            <Radio value={2} > 不显示底栏</Radio>
                            <Radio value={3} > 自定义底栏显示内容</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="自定义底部内容 (footer)" tooltip='当值为字符串或者 jsx 类型时，值即是显示的内容'>
                        <Input disabled={footerNum !== 3} value={footerContent} onChange={(e) => {
                            setState({ ...state, ...{ footerContent: e.target.value, footer: footerContent } })
                        }} />
                    </Form.Item>

                    <Form.Item label="自定义确认按钮内容 (okText)">
                        <Input placeholder={'确认'} value={okText} onChange={(e) => {
                            setState({ ...state, ...{ okText: e.target.value } })
                        }} />
                    </Form.Item>

                    <Form.Item label="自定义取消按钮内容 (cancelText)">
                        <Input placeholder={'取消'} value={cancelText} onChange={(e) => {
                            setState({ ...state, ...{ cancelText: e.target.value } })
                        }} />
                    </Form.Item>

                </Form>
            </div >
            <div className='code-wrapper'>
                <h3>源码编辑</h3>
                <MonacoEditor
                    width="600"
                    height='512'
                    language="json"
                    theme={props.theme === 'dark' ? "vs-dark" : 'vs'}
                    options={{
                        autoIndent: 'brackets',//自动布局
                        automaticLayout: true,
                        tabSize: 4,
                        minimap: {
                            enabled: false // 不要小地图
                        },
                    }}
                    onChange={handleEditorChange}
                    value={formatJson(JSON.stringify(state))}
                // editorDidMount={editorDidMountHandle}
                />
            </div>
        </div >
    </div >
}

export default Options

function formatJson(json, options?) {
    let reg,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        delete json.footerNum;
        delete json.footerContent;
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    }
    );
    return formatted;
};